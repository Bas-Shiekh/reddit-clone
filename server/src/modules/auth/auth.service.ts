import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { UserServices } from 'src/modules/users/user.service';
import { CreateUserDto, FindUserDto } from './dto/Auth.dto';
import { comparePassword, encodePassword } from '../../core/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ITokens } from './interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthServices {
  constructor(
    @Inject('USER_SERVICE') private readonly userServices: UserServices,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // create new user method for signup route
  async createUser(signUpData: CreateUserDto): Promise<ITokens> {
    const isEmailExist = await this.userServices.emailCheck(signUpData.email);

    if (isEmailExist)
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);

    const userData = await this.userServices.createUser(signUpData);
    const tokens = await this.getToken(
      userData.id,
      userData.email,
      userData.username,
    );
    const hashedRt = this.hashToken(tokens.refreshToken);
    await this.userServices.updateHashedRt(userData.id, hashedRt);

    return tokens;
  }

  async getAuthUser(userId: number) {
    const userData = await this.userServices.getUserById(userId);
    return {
      id: userData.id,
      username: userData.username,
      userImg: userData.userImg,
      bio: userData.bio,
      email: userData.email,
      gender: userData.gender,
    };
  }

  // get user method for login route
  async getUser(loginData: FindUserDto): Promise<ITokens> {
    const userData = await this.userServices.emailCheck(loginData.email);

    if (!userData) throw new ForbiddenException('Invalid username or password');

    const isValidPassword = comparePassword(
      loginData.password,
      userData.password,
    );

    if (!isValidPassword)
      throw new ForbiddenException('Invalid username or password');
    const tokens = await this.getToken(
      userData.id,
      userData.email,
      userData.username,
    );
    const hashedRt = this.hashToken(tokens.refreshToken);
    await this.userServices.updateHashedRt(userData.id, hashedRt);
    return tokens;
  }

  // logout function for logout route
  async logout(userId: number) {
    const isLoggedOut = await this.userServices.logout(userId);
    if (isLoggedOut) return { message: 'logged out successfully' };
    throw new InternalServerErrorException();
  }

  // refreshToken function for refresh route
  async refreshToken(id: number, rt: string): Promise<ITokens> {
    const userData = await this.userServices.getUserById(id);
    if (!userData || !userData.hashedRt)
      throw new ForbiddenException('access denied');

    const isRtMatched = comparePassword(rt, userData.hashedRt);
    if (!isRtMatched) throw new ForbiddenException('access denied');

    const tokens = await this.getToken(
      userData.id,
      userData.email,
      userData.username,
    );
    const hashedRt = this.hashToken(tokens.refreshToken);
    await this.userServices.updateHashedRt(userData.id, hashedRt);
    return tokens;
  }

  // hash token function
  hashToken(refreshToken: string) {
    return encodePassword(refreshToken);
  }

  // generate refreshToken and accessToken function
  async getToken(
    userId: number,
    email: string,
    username: string,
  ): Promise<ITokens> {
    const [rt, at] = await Promise.all([
      this.jwtService.signAsync(
        { id: userId, email, username },
        {
          secret: this.configService.get('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
      this.jwtService.signAsync(
        { id: userId, email, username },
        {
          secret: this.configService.get('AT_SECRET'),
          expiresIn: 60 * 5,
        },
      ),
    ]);

    return { refreshToken: rt, accessToken: at };
  }
}
