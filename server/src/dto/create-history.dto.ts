import { Type } from "class-transformer";
import { IsInt, IsPositive, Min } from "class-validator";

export class CreateHistoryDto {
    @Type(() => Number)
    @IsInt({ message: "TrackId must be a number" })
    @IsPositive({ message: "TrackId must be a positive number" })
    @Min(1, {
        message: "TrackId must be greater than 0",
    })
    trackId!: number;
}
