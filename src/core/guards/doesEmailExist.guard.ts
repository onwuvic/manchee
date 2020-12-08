import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesEmailExist implements CanActivate {
    constructor(private readonly userService: UsersService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const isExist = await this.userService.findUserByEmail(request.body.email);
        if (isExist) {
            throw new ForbiddenException('This email already exist');
        }
        return true;
    }
}
