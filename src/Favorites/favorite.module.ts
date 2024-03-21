import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { AlbumModule } from 'src/Albums/album.module';
import { ArtistModule } from 'src/Artists/artist.module';
import { TrackModule } from 'src/Tracks/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entity/favorite.entity';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  exports: [FavoriteService],
})
export class favoriteModule {}
