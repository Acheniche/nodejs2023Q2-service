import { Album } from "src/Albums/interface/album.interface";
import { Artist } from "src/Artists/interface/artist.interface";
import { Track } from "src/Tracks/interface/track.interface";

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
    artistsIDs: string[]; // favorite artists ids
    albumsIDs: string[]; // favorite albums ids
    tracksIDs: string[]; // favorite tracks ids
}