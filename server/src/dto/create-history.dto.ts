import { IsString, MinLength } from "class-validator";

export class CreateHistoryDto {
    @IsString({ message: "Track ID must be a string" })
    @MinLength(1, {
        message: "Track ID must not be empty",
    })
    trackId!: string;
}
