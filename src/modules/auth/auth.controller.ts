import { Body, Controller, Post, UseGuards, Request, Param, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VerifyToken } from '../../core/validation/validation.dto';
import { IsExist } from '../../core/guards/isExist.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(IsExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }

    @Get('verify/:verifyToken')
    async verify(@Param() params: VerifyToken) {
        return await this.authService.verify(params.verifyToken);
    }
}
