import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
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
  @MinLength(6)
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
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class UserCredentialsResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}

export class UserResponseDto extends BaseDbResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  credentials: UserCredentialsResponseDto;
}
