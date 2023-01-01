import { Controller, Put, Body, Get } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/modules/auth/common/decorators';
import { BioDto } from './dto/index.dto';
import { UserServices } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userServices: UserServices) {}

  @Public()
  @Get()
  getAllUsers() {
    return this.userServices.getUsers();
  }

  @Put('bio')
  updateUserBio(@Body() bioDto: BioDto, @GetCurrentUserId() userId: number) {
    return this.userServices.updateBio(userId, bioDto.bio);
  }
}
