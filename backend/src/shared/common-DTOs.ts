import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow } from 'class-validator';

export class BaseDbResponseDto {
  @ApiProperty()
  @Allow()
  id: string;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @Allow()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @Allow()
  updatedAt: Date;
}
