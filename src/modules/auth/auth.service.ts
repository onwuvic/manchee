import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SecurityService } from '../../core/services/security/security.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly securityService: SecurityService
    ) { }

    async validateUser(username: string, pass: string): Promise<User | null> {
        try {
          // find if user exist with this email
            const user = await this.userService.findOneByEmail(username);
            if (!user) {
                return null;
            }

            // find if user password match
            const match = await this.securityService.comparePassword(pass, user.password);
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
        // TODO::
        // check if the user is verify

        // generate token
        const token = await this.securityService.generateToken(user);

        // return user info and token
        return { user, token };

    }

    async create(user): Promise<User> {
        try {
            const newUser = await this.userService.create({ ...user }); 

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = newUser['dataValues'];
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error creating a user');
        }
    }
}
