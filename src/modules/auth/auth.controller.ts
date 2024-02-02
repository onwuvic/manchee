import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  IsEmailDto,
  VerifyToken,
  Token,
  Password,
} from 'core/validation/validation.dto';
import { UserDto } from 'modules/users/dto/user.dto';
import { DoesEmailExist } from 'core/guards/doesEmailExist.guard';
import { DoesUsernameExist } from 'core/guards/doesUsernameExist.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesEmailExist)
  @UseGuards(DoesUsernameExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @Get('verify/:verifyToken')
  async verify(@Param() params: VerifyToken) {
    return await this.authService.verify(params.verifyToken);
  }

  @Put('forget/password')
  async sendResetPassword(@Body() body: IsEmailDto): Promise<any> {
    return await this.authService.sendResetPassword(body.email);
  }

  @Put('reset/password/:token')
  async resetPassword(
    @Param() params: Token,
    @Body() body: Password,
  ): Promise<any> {
    return await this.authService.resetPassword(params.token, body.password);
  }
}
