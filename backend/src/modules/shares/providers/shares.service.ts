import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareRecord } from '../shares.entity';
import { ShareInputDto } from '../dto/shares.dto';
import { YoutubeService } from 'src/adapters/youtube/youtube.service';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(ShareRecord)
    private readonly shareRepository: Repository<ShareRecord>,
    private readonly youtubeService: YoutubeService,
  ) {}

  async newShare(userId: string, payload: ShareInputDto) {
    const youtubeMetadata = await this.crawlYoutubeMetadata(payload.youtubeUrl);

    return this.shareRepository.save({
      userId,
      title: youtubeMetadata.title,
      description: youtubeMetadata.description,
    });
  }

  private async crawlYoutubeMetadata(url: string) {
    const youtubeId = this.extractYoutubeVideoIdFromUrl(url);
    const metadata = await this.youtubeService.getVideoMetadata(youtubeId);

    return {
      youtubeId: url,
      title: metadata.title,
      description: metadata.title,
    };
  }

  private extractYoutubeVideoIdFromUrl(url: string): string {
    return url;
  }
}
