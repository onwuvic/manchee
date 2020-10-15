import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) 
        private userRepository: typeof User,
        private sequelize: Sequelize,
        private profilesService: ProfilesService
    ) {}

    async create(user: UserDto): Promise<User> {
        // start a transaction
        const transaction = await this.sequelize.transaction();
        try {
            // create a user
            const createdUser = await this.userRepository.create<User>(user, { transaction });
            // once user is created get the user Id
            // create a profile with user id
            // find the user with id and eager load the profile

            // profile migration, profile entity, profile service
            await transaction.commit();
            return createdUser; 
        } catch (error) {
            await transaction.rollback();
            throw new InternalServerErrorException('Error creating user account. Try again later');
        }  
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.scope('withPassword').findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

    async deleteById(id: number): Promise<string> {
        await this.userRepository.destroy({ where: { id }});
        return 'Deleted Successfully';
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
