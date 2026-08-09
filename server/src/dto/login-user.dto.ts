import { IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsString({ message: "Username must be a string" })
    @MinLength(1, {
        message: "Username must not be empty",
    })
    username!: string;

    @IsString({ message: "Password must be a string" })
    @MinLength(1, {
        message: "Password must not be empty",
    })
    password!: string;
}
