import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDbResponseDto } from 'src/shared/common-DTOs';

export class UserLoginInputDto {
  @ApiProperty()
  @MaxLength(254)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  password: string;
}

export class CreateUserInputDto {
  @ApiProperty()
  @IsString()
  @MaxLength(90)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(254)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  password: string;
}

export class UserResponseDto extends BaseDbResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}
