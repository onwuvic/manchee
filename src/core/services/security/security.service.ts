import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
    constructor(private readonly jwtService: JwtService) {}

    async hashPassword(password) {
      const hashPass = await bcrypt.hash(password, 10);
      return hashPass;
    }

    async generateToken(user) {
      const token = await this.jwtService.signAsync(user);
      return token;
    }

    async comparePassword(enteredPassword, dbPassword) {
      const match = await bcrypt.compare(enteredPassword, dbPassword);
      return match;
    }
}
