import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlbumDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    grammy: boolean;

    @IsOptional()
    @IsNumber()
    year: number;

    @IsOptional()
    @IsString()
    artistId: string | null;
}