import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './interface/favorites.interface';
import { ArtistService } from 'src/Artists/artist.service';
import { AlbumService } from 'src/Albums/album.service';
import { TrackService } from 'src/Tracks/track.service';
import { Artist } from 'src/Artists/interface/artist.interface';
import { Album } from 'src/Albums/interface/album.interface';
import { Track } from 'src/Tracks/interface/track.interface';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  favorites: Favorites = {
    artistIds: [],
    albumIds: [],
    trackIds: [],
  };

  getFavorites(): FavoritesResponse {
    const { artistIds, albumIds, trackIds } = this.favorites;
    const artists = this.artistService.findByIds(artistIds);
    const albums = this.albumService.findByIds(albumIds);
    const tracks = this.trackService.findByIds(trackIds);
    return { artists, albums, tracks };
  }

  deleteFavorite(type: string, id: string): void {
    switch (type) {
      case 'artist':
        this.favorites.artistIds = this.favorites.artistIds.filter(
          (artistId) => artistId !== id,
        );
        break;
      case 'album':
        this.favorites.albumIds = this.favorites.albumIds.filter(
          (albumId) => albumId !== id,
        );
        break;
      case 'track':
        this.favorites.trackIds = this.favorites.trackIds.filter(
          (trackId) => trackId !== id,
        );
        break;
      default:
        throw new Error('Unknown type');
    }
  }

  addFavorite(type: string, id: string): Artist | Album | Track {
    switch (type) {
      case 'artist':
        const artist = this.artistService
          .getArtists()
          .find((artist) => artist.id === id);
        if (!artist) {
          throw new UnprocessableEntityException('Artist not found');
        }
        this.favorites.artistIds.push(id);
        return artist;
      case 'album':
        const album = this.albumService
          .getAlbums()
          .find((album) => album.id === id);
        if (!album) {
          throw new UnprocessableEntityException('Artist not found');
        }
        this.favorites.albumIds.push(id);
        return album;
      case 'track':
        const track = this.trackService
          .getTracks()
          .find((track) => track.id === id);
        if (!track) {
          throw new UnprocessableEntityException('Artist not found');
        }
        this.favorites.trackIds.push(id);
        return track;
      default:
        throw new Error('Unknown type');
    }
  }

  deleteId(type: string, id: string) {
    this.favorites[type + 'Ids'] = this.favorites[type + 'Ids'].filter(
      (itemId) => itemId !== id,
    );
  }
}
