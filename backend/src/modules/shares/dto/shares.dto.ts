import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { BaseDbResponseDto } from 'src/shared/common-DTOs';

export class ShareInputDto {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  youtubeUrl: string;
}

export class ShareUserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;
}

export class ShareReponseDto extends BaseDbResponseDto {
  @ApiProperty()
  youtubeId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: string;
}

export class ShareResponseWithUserDto extends ShareReponseDto {
  @ApiProperty()
  user: ShareUserResponseDto;
}
