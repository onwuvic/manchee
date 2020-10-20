import { IsNotEmpty } from "class-validator";

export class ID {
    @IsNotEmpty()
    readonly id: number | string;
}