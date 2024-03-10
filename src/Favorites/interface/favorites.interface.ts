import { Album } from 'src/Albums/interface/album.interface';
import { Artist } from 'src/Artists/interface/artist.interface';
import { Track } from 'src/Tracks/interface/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artistIds: string[]; // favorite artists ids
  albumIds: string[]; // favorite albums ids
  trackIds: string[]; // favorite tracks ids
}
