import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/CreateArtist.dto';
import { UpdateArtistDTO } from './dto/UpdateArtist.dto';
import { Artist } from './entity/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServices: ArtistService) {}

  @Get()
  getArtists(): Promise<Artist[]> {
    return this.artistServices.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistServices.getArtist(id);
  }

  @Post()
  createArtist(@Body() Dto: CreateArtistDTO): Promise<Artist> {
    return this.artistServices.createArtist(Dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistServices.deleteArtist(id);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() Dto: UpdateArtistDTO,
  ): Promise<Artist> {
    return this.artistServices.updateArtist(id, Dto);
  }
}
