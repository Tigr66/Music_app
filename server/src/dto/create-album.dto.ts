import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAlbumDto {
    @IsString({ message: "Title must be a string" })
    @MinLength(1, {
        message: "Title must not be empty",
    })
    title!: string;

    @IsString({ message: "Artist ID must be a string" })
    @MinLength(1, {
        message: "Artist ID must not be empty",
    })
    artistId!: string;

    @IsOptional()
    @IsDateString(
        {},
        {
            message: "publishedAt must be a valid ISO date string",
        },
    )
    publishedAt?: string;
}
