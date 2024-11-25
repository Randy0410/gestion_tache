import { UserService } from 'src/users/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; password: string }) {
    const validatedUser = await this.validateUser(user.username, user.password);
    if (!validatedUser) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: validatedUser.username, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
