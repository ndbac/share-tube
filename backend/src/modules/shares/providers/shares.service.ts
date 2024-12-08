import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareInputDto } from '../dto/shares.dto';
import { YoutubeService } from 'src/adapters/youtube/youtube.service';
import { IIamUser, IPagination } from 'src/shared/types';
import { getPaginationHeaders } from 'src/shared/pagination.helpers';
import { WebsocketGateway } from 'src/adapters/websocket/websocket.gateway';
import _ from 'lodash';
import { UserRecord } from 'src/modules/users/user.entity';
import { ShareRepository } from '../shares.repository';
import { UserRepository } from 'src/modules/users/user.repository';
import { Not } from 'typeorm';
import { NodemailerService } from 'src/adapters/node-mailer/node-mailer.provider';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(ShareRepository)
    private readonly shareRepository: ShareRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly youtubeService: YoutubeService,
    private readonly websocketGateway: WebsocketGateway,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async filterShares(pagination: IPagination) {
    const [shares, count] = await this.shareRepository.findAndCount({
      skip: pagination.offset,
      take: pagination.pageSize,
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      items: shares.map((share) => ({
        ...share,
        user: this.maskUserSensitiveData(share.user),
      })),
      headers: getPaginationHeaders(pagination, count),
    };
  }

  async newShare(user: IIamUser, payload: ShareInputDto) {
    const youtubeMetadata = await this.crawlYoutubeMetadata(payload.youtubeUrl);

    const existed = await this.shareRepository.existsBy({
      userId: user.userId,
      youtubeId: youtubeMetadata.youtubeId,
    });

    if (existed) {
      throw new BadRequestException(
        'This video has already been shared, please share a new one',
      );
    }

    const share = await this.shareRepository.save({
      userId: user.userId,
      title: youtubeMetadata.title,
      description: youtubeMetadata.description,
      youtubeId: youtubeMetadata.youtubeId,
    });

    this.websocketGateway.sendVideoSharedEvent({
      id: share.id,
      title: share.title,
      description: share.description,
      youtubeId: share.userId,
      createdAt: share.createdAt.toISOString(),
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    });

    const listUsers = await this.userRepository.find({
      where: {
        id: Not(user.userId),
      },
    });

    await Promise.all(
      listUsers.map((user) => {
        try {
          this.nodemailerService.sendEmail(
            user.email,
            'New video shared',
            `Hi ${user.name},\n\n${user.name} has shared a new video with you. Please visit the link below to watch it:\n\n${payload.youtubeUrl}\n\nBest regards,\nVideo sharing team`,
          );
        } catch (error) {
          console.error(
            `Failed to send email notification to user: ${user.email}`,
          );
        }
      }),
    );

    return share;
  }

  private async crawlYoutubeMetadata(url: string) {
    const youtubeId = this.extractYoutubeVideoIdFromUrl(url);
    const metadata = await this.youtubeService.getVideoMetadata(youtubeId);
    if (_.isEmpty(metadata.items)) {
      throw new BadRequestException(
        `Could not find video metadata for URL: ${url}`,
      );
    }

    return {
      youtubeId: youtubeId,
      title: metadata.items[0].snippet.title,
      description: metadata.items[0].snippet.description,
    };
  }

  private extractYoutubeVideoIdFromUrl(url: string): string {
    const youtubeIdExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = youtubeIdExp.exec(url);

    if (!match) {
      throw new BadRequestException(
        `Failed to parse Youtube ID from URL: ${url}`,
      );
    }

    return match[1];
  }

  private maskUserSensitiveData(user: UserRecord) {
    return _.omit(user, ['refreshToken', 'password', 'createdAt', 'updatedAt']);
  }
}
