import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from 'modules/users/users.service';

import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend)
    private friendRepository: typeof Friend,
    private userService: UsersService,
  ) {}

  async sendRequest(authId, receiverId): Promise<any> {
    // user should not send request to themselves
    if (receiverId == authId) {
      throw new BadRequestException('Can not send request to yourself');
    }
    // if the relationship exist don't, send message already sent
    const request = await this.friendRepository.findOne({
      where: {
        [Op.or]: [
          { receiverId, senderId: authId },
          { receiverId: authId, senderId: receiverId },
        ],
      },
    });
    if (request) {
      throw new BadRequestException('Request already exist');
    }
    return await this.friendRepository.create({ receiverId, senderId: authId });
  }

  async allFriends(userId): Promise<any> {
    return await this.userService.findAllFriends(userId);
  }

  async pendingFriendRequestSent(authId): Promise<any> {
    return await this.userService.pendingFriendRequestSent(authId);
  }

  async pendingFriendRequestReceived(authId): Promise<any> {
    return await this.userService.pendingFriendRequestReceived(authId);
  }

  async acceptRequest(authId, senderId): Promise<any> {
    // find the friend request where auth user is the reciever and the sender is another user
    const request = await this.friendRepository.findOne({
      where: { receiverId: authId, senderId },
    });

    if (!request) {
      throw new BadRequestException('Request does not exist');
    }

    await request.update({ status: 'ACCEPTED' });
    return 'Friend request accepted';
  }

  // async rejectRequest() {

  // }
}
