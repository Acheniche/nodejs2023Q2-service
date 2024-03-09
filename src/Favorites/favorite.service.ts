import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Favorites, FavoritesResponse } from "./interface/favorites.interface";
import { ArtistService } from "src/Artists/artist.service";
import { AlbumService } from "src/Albums/album.service";
import { TrackService } from "src/Tracks/track.service";
import { validate as uuidValidate } from 'uuid';
import { Artist } from "src/Artists/interface/artist.interface";
import { Album } from "src/Albums/interface/album.interface";
import { Track } from "src/Tracks/interface/track.interface";

@Injectable()

export class FavoriteService {
    constructor(
        private readonly artistService: ArtistService,
        private readonly albumService: AlbumService,
        private readonly trackService: TrackService,
      ) {}
      
    favorites: Favorites = {
        artistsIDs: [],
        albumsIDs: [],
        tracksIDs: [],
      };

      getFavorites(): FavoritesResponse {
        const { artistsIDs, albumsIDs, tracksIDs } = this.favorites;
        const artists = this.artistService.findByIds(artistsIDs);
        const albums = this.albumService.findByIds(albumsIDs);
        const tracks = this.trackService.findByIds(tracksIDs);
        return { artists, albums, tracks };
      }

      deleteFavorite(type: string, id: string): void {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        switch (type) {
          case 'artist':
            this.favorites.artistsIDs = this.favorites.artistsIDs.filter(
              (artistId) => artistId !== id,
            );
            break;
          case 'album':
            this.favorites.albumsIDs = this.favorites.albumsIDs.filter(
              (albumId) => albumId !== id,
            );
            break;
          case 'track':
            this.favorites.tracksIDs = this.favorites.tracksIDs.filter(
              (trackId) => trackId !== id,
            );
            break;
          default:
            throw new Error('Unknown type');
        }
    }

    addFavorite(type: string, id: string): Artist | Album | Track {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        switch (type) {
          case 'artist':
            const artist = this.artistService
              .getArtists()
              .find((artist) => artist.id === id);
            if (!artist) {
                throw new UnprocessableEntityException('Artist not found');
            }
            this.favorites.artistsIDs.push(id);
            return artist;
          case 'album':
            const album = this.albumService
              .getAlbums()
              .find((album) => album.id === id);
            if (!album) {
                throw new UnprocessableEntityException('Artist not found');
            }
            this.favorites.albumsIDs.push(id);
            return album;
          case 'track':
            const track = this.trackService
              .getTracks()
              .find((track) => track.id === id);
            if (!track) {
                throw new UnprocessableEntityException('Artist not found');
            }
            this.favorites.tracksIDs.push(id);
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