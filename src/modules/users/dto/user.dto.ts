import { IsNotEmpty, MinLength, IsEmail, IsEnum, Validate } from 'class-validator';
import { IsDate } from '../../../core/validation/custom-validations/isDate';
import { NotLessThanEighteen } from '../../../core/validation/custom-validations/notLessThanEighteen';

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;

    @IsDate('dateOfBirth', {
        message: 'Provide a valid date',
    })
    @Validate(NotLessThanEighteen)
    readonly dateOfBirth: Date;
}
