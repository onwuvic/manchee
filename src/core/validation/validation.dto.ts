import { IsEmail, IsNotEmpty } from "class-validator";

export class ID {
    @IsNotEmpty()
    readonly id: number | string;
}

export class VerifyToken {
    @IsNotEmpty()
    readonly verifyToken: string;
}

export class IsEmailDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

export class Token {
    @IsNotEmpty()
    readonly token: string;
}

export class Password {
    @IsNotEmpty()
    readonly password: string;
}