import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ID } from 'core/validation/validation.dto';

import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('sends')
  async sendRequest(@Body() body: ID, @Request() req): Promise<any> {
    return await this.friendService.sendRequest(req.user.id, body.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllFriends(@Request() req): Promise<any> {
    return await this.friendService.allFriends(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('pending/sents')
  async pendingFriendRequestSent(@Request() req): Promise<any> {
    return await this.friendService.pendingFriendRequestSent(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('pending/receives')
  async pendingFriendRequestReceived(@Request() req): Promise<any> {
    return await this.friendService.pendingFriendRequestReceived(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('accepts')
  async acceptRequest(@Body() body: ID, @Request() req) {
    return await this.friendService.acceptRequest(req.user.id, body.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getAllFriendsById(@Param('id') id: string): Promise<any> {
    return await this.friendService.allFriends(id);
  }

  // async rejectRequest() {

  // }
}
