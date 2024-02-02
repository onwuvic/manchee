import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { RESETLINKEXPIRES } from 'core/constants';
import { User } from 'modules/users/entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { SecurityService } from 'core/services/security/security.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('mailSending') private mailQueue: Queue,
    private readonly userService: UsersService,
    private readonly securityService: SecurityService,
  ) {}

  // Todo: add return types
  async validateUser(username: string, pass: string): Promise<any | null> {
    try {
      // find if user exist with this email
      const user = await this.userService.findUserByEmail(username);
      if (!user) {
        return null;
      }

      // find if user password match
      const match = await this.securityService.comparePassword(
        pass,
        user.password,
      );
      if (!match) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user['dataValues'];
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error login user');
    }
  }

  async login(user: User): Promise<any> {
    // check if the user is verify
    if (!user.isVerify) {
      throw new ForbiddenException('Please verify your account');
    }

    // generate token
    const token = await this.securityService.generateToken(user);

    // return user info and token
    return { user, token };
  }

  async create(user): Promise<User> {
    try {
      const verifyToken = this.securityService.generateRandomToken();

      const newUser = await this.userService.create({ verifyToken, ...user });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser['dataValues'];

      const url = `${process.env.FRONTEND_URL}/auth/verify/${verifyToken}`;

      await this.mailQueue.add('verification-mail', {
        email: result.email,
        firstName: result.firstName,
        url,
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error creating a user');
    }
  }

  async verify(verifyToken): Promise<any> {
    // find user by verifyToken
    const user = await this.userService.findUserByVerifyToken(verifyToken);

    // if user does not exist return user is already verify
    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    try {
      // update user. set veifyToken to null and isVerify to true
      await user.update({ isVerify: true, verifyToken: null });

      return 'Thank you, account verified. You can login now';
    } catch (error) {
      throw new InternalServerErrorException('Error verifying user');
    }
  }

  async sendResetPassword(email) {
    // find user by email
    const user = await this.userService.findUserByEmail(email);
    // if user doesn't exist throw 404
    if (!user) {
      throw new BadRequestException('Email address is not registered');
    }

    try {
      // generate token
      const resetToken = this.securityService.generateRandomToken();
      // generate expire time
      const resetExpires = Date.now() + RESETLINKEXPIRES;

      // Update user
      await user.update({
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      });

      // send user email
      const url = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

      await this.mailQueue.add('reset-password', {
        email: user.email,
        firstName: user.firstName,
        url,
      });

      // return success message and status code
      return 'A password reset link has been sent to your email';
    } catch (error) {
      throw new InternalServerErrorException(
        'Error attempting to reset password. Try again later',
      );
    }
  }

  async resetPassword(token, password) {
    // find the user with the token
    const user = await this.userService.findUserByToken(token);
    // if no user throw error
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    // check if the token has expires
    if (user.resetPasswordExpires < Date.now()) {
      throw new BadRequestException('Token has expired');
    }

    try {
      // hash the new user password
      const hashPass = await this.securityService.hashPassword(password);

      // update the user with
      // new password, reset token to null, expires to null
      await user.update({
        password: hashPass,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });

      // return success message and status code
      return 'Password has been successfully updated';
    } catch (error) {
      throw new InternalServerErrorException(
        'Error resetting password. Try again later',
      );
    }
  }
}
