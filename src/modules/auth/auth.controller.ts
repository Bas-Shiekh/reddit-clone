import {
  Body,
  Controller,
  Post,
  UseFilters,
  Inject,
  Get,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthServices } from './auth.service';
import { CreateUserDto, FindUserDto } from './dto/Auth.dto';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { ITokens } from './interfaces';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServices: AuthServices,
  ) {}

  @Public()
  @UseFilters(HttpExceptionFilter)
  @Post('register')
  register(@Body() signUpData: CreateUserDto): Promise<ITokens> {
    return this.authServices.createUser(signUpData);
  }

  @Public()
  @UseFilters(HttpExceptionFilter)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: FindUserDto): Promise<ITokens> {
    return this.authServices.getUser(loginData);
  }

  @UseGuards(AtGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return this.authServices.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ): Promise<ITokens> {
    return this.authServices.refreshToken(userId, refreshToken);
  }
}
