import { Type } from "class-transformer";
import {
    IsDateString,
    IsInt,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from "class-validator";

export class CreateAlbumDto {
    @IsString({ message: "Title must be a string" })
    @MinLength(1, {
        message: "Title must not be empty",
    })
    title!: string;

    @Type(() => Number)
    @IsInt({ message: "artistId must be a number" })
    @IsPositive({ message: "artistId must be a positive number" })
    @Min(1, {
        message: "artistId must be greater than 0",
    })
    artistId!: number;

    @IsDateString(
        {},
        {
            message: "publishedAt must be a valid ISO date string",
        },
    )
    publishedAt!: string;
}
