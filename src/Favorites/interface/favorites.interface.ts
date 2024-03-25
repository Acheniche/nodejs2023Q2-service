import { Album } from 'src/Albums/entity/album.entity';
import { Artist } from 'src/Artists/entity/artist.entity';
import { Track } from 'src/Tracks/entity/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
