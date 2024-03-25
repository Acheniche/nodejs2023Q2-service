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
import { Artist } from './interface/artist.interface';
import { CreateArtistDTO } from './dto/CreateArtist.dto';
import { UpdateArtistDTO } from './dto/UpdateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServices: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistServices.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id', new ParseUUIDPipe()) id: string): Artist {
    return this.artistServices.getArtist(id);
  }

  @Post()
  createArtist(@Body() Dto: CreateArtistDTO): Artist {
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
  ): Artist {
    return this.artistServices.updateArtist(id, Dto);
  }
}
