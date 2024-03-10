import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
