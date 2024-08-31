import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareRecord } from '../shares.entity';
import { ShareInputDto } from '../dto/shares.dto';
import { YoutubeService } from 'src/adapters/youtube/youtube.service';
import { IIamUser, IPagination } from 'src/shared/types';
import { getPaginationHeaders } from 'src/shared/pagination.helpers';
import { WebsocketGateway } from 'src/adapters/websocket/websocket.gateway';
import _ from 'lodash';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(ShareRecord)
    private readonly shareRepository: Repository<ShareRecord>,
    private readonly youtubeService: YoutubeService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async filterShares(pagination: IPagination) {
    const [shares, count] = await this.shareRepository.findAndCount({
      skip: pagination.offset,
      take: pagination.pageSize,
      relations: {
        user: true,
      },
    });

    return {
      items: shares,
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
      sharedBy: {
        userId: user.userId,
        name: user.name,
      },
    });

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
}
