import { Module } from '@nestjs/common';
import { AlbumModule } from './Albums/album.module';
import { ArtistModule } from './Artists/artist.module';
import { favoriteModule } from './Favorites/favorite.module';
import { TrackModule } from './Tracks/track.module';
import { UserModule } from './Users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),AlbumModule, ArtistModule, favoriteModule, TrackModule, UserModule],
})

export class AppModule {}
