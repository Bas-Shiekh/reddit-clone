import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/modules/auth/dto/Auth.dto';
import { encodePassword } from 'src/core/utils/bcrypt';
import { Users } from '../index.models';

@Injectable()
export class UserServices {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  createUser(userData: CreateUserDto): Promise<Users> {
    const hashedPassword = encodePassword(userData.password);
    return this.userRepository.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
    });
  }

  updateHashedRt(id: number, hashedRt: string): Promise<any> {
    return this.userRepository.update({ hashedRt }, { where: { id } });
  }

  async updateBio(userId: number, bio: string): Promise<any> {
    const userData = await this.getUserById(userId);
    return this.userRepository.update(
      { bio, ...userData },
      { where: { id: userId } },
    );
  }

  getUserById(id: number): Promise<Users> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  getUserByEmail(email: string): Promise<Users> {
    return this.emailCheck(email);
  }

  async getUsers() {
    return await this.userRepository.findAll({
      attributes: { exclude: ['password', 'hashedRt'] },
    });
  }

  logout(id: number) {
    return this.userRepository.update({ hashedRt: null }, { where: { id } });
  }

  emailCheck(email: string): Promise<Users> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
