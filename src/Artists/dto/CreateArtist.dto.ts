import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
