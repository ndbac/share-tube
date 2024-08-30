import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShareInputDto {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  youtubeUrl: string;
}
