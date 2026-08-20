import { Type } from "class-transformer";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateTrackDto {
    @IsString({ message: "Title must be a string" })
    @MinLength(1, {
        message: "Title must not be empty",
    })
    title!: string;

    @Type(() => Number)
    @IsInt({ message: "Duration must be a number (seconds)" })
    @IsPositive({ message: "Duration must be a positive number" })
    @Min(1, {
        message: "Duration must be greater than 0",
    })
    duration!: number;

    @IsString({ message: "Album ID must be a string" })
    @MinLength(1, {
        message: "Album ID must not be empty",
    })
    albumId!: string;

    @IsString({ message: "Youtube URL must be a string" })
    @MinLength(1, {
        message: "Youtube URL must not be empty",
    })
    youtubeUrl!: string;
}
