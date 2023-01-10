import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '../index.models';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { UserServices } from '../users/user.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthServices,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserServices,
    },
    AtStrategy,
    RtStrategy,
  ],
  exports: [SequelizeModule],
})
export class AuthModule {}
