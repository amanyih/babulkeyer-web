import { Injectable, ForbiddenException } from '@nestjs/common';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(authDto: createUserDto) {
    try {
      const user = await this.userService.addNewUser(authDto);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async login(loginData) {
    console.log('login data', loginData);
    const { userName, password } = loginData;
    const user = await this.userService.findUserByUserName(userName);

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new ForbiddenException('Access Denied');
    }

    const token = this.getToken(userName, user._id);

    return token;
  }

  async getToken(username: string, id: string) {
    const payload = { username, sub: id };
    const token = await this.jwtService.sign(payload, {
      secret: 'SECRET',
      expiresIn: 3600 * 24 * 7, // for 7 days
    });

    return { access_token: token };
  }
  async logout() {}
}
