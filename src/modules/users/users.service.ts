import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    public async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    public async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.scope('withPassword').findOne<User>({ where: { email } });
    }

    public async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }
}
