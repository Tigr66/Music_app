import { IsString, MinLength } from "class-validator";

export class CreateArtistDto {
    @IsString({ message: "Name must be a string" })
    @MinLength(1, {
        message: "Name must not be empty",
    })
    name!: string;

    @IsString({ message: "Info must be a string" })
    @MinLength(1, {
        message: "Info must not be empty",
    })
    info!: string;
}
