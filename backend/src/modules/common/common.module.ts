import { Module } from '@nestjs/common';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { JwtService } from './jsonwebtoken/jwt.service';
import { JwtModule } from './jsonwebtoken/jwt.module';

const providers = [JwtService, BcryptService];
@Module({
  imports: [BcryptModule, JwtModule],
  providers,
  exports: providers,
})
export class CommonModule {}
