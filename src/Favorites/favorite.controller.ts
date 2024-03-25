import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoritesResponse } from './interface/favorites.interface';
import { Artist } from 'src/Artists/interface/artist.interface';
import { Album } from 'src/Albums/interface/album.interface';
import { Track } from 'src/Tracks/interface/track.interface';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favsService: FavoriteService) {}

  @Get()
  getFavorites(): FavoritesResponse {
    return this.favsService.getFavorites();
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  deleteFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): void {
    this.favsService.deleteFavorite(type, id);
  }

  @Post('/:type/:id')
  addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Artist | Album | Track {
    return this.favsService.addFavorite(type, id);
  }
}
