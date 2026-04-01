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

    @Type(() => Number)
    @IsInt({ message: "AlbumId must be a number" })
    @IsPositive({ message: "AlbumId must be a positive number" })
    @Min(1, {
        message: "AlbumId must be greater than 0",
    })
    albumId!: number;
}
