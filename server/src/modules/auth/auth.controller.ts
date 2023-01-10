import {
  Body,
  Controller,
  Post,
  UseFilters,
  Inject,
  Get,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthServices } from './auth.service';
import { CreateUserDto, FindUserDto } from './dto/Auth.dto';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServices: AuthServices,
  ) {}

  @Public()
  @UseFilters(HttpExceptionFilter)
  @Post('register')
  async register(
    @Res() response: Response,
    @Body() signUpData: CreateUserDto,
  ): Promise<Response> {
    const { accessToken, refreshToken } = await this.authServices.createUser(
      signUpData,
    );
    return response
      .cookie('token', refreshToken, { httpOnly: true })
      .json({ accessToken });
  }

  @Public()
  // @UseFilters(HttpExceptionFilter)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginData: FindUserDto,
  ): Promise<any> {
    const { accessToken, refreshToken } = await this.authServices.getUser(
      loginData,
    );
    response.cookie('token', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Res({ passthrough: true }) response: Response,
    @GetCurrentUserId() userId: number,
  ) {
    response.clearCookie('token');
    return this.authServices.logout(userId);
  }

  @UseGuards(RtGuard)
  @UseFilters(HttpExceptionFilter)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  authUser(@GetCurrentUserId() userId: number) {
    return this.authServices.getAuthUser(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Res() response: Response,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ): Promise<Response> {
    const { accessToken, refreshToken: refToken } =
      await this.authServices.refreshToken(userId, refreshToken);
    return response
      .cookie('token', refToken, { httpOnly: true })
      .json({ accessToken });
  }
}
