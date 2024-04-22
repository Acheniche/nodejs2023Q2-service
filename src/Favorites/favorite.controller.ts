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
import { Artist } from 'src/Artists/entity/artist.entity';
import { Album } from 'src/Albums/entity/album.entity';
import { Track } from 'src/Tracks/entity/track.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favsService: FavoriteService) {}

  @Get()
  getFavorites(): Promise<FavoritesResponse> {
    return this.favsService.getFavorites();
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  async deleteFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.favsService.deleteFavorite(type, id);
  }

  @Post('/:type/:id')
  addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist | Album | Track> {
    return this.favsService.addFavorite(type, id);
  }
}
