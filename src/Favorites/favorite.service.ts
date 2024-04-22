import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesResponse } from './interface/favorites.interface';
import { ArtistService } from 'src/Artists/artist.service';
import { AlbumService } from 'src/Albums/album.service';
import { TrackService } from 'src/Tracks/track.service';
import { Artist } from 'src/Artists/entity/artist.entity';
import { Album } from 'src/Albums/entity/album.entity';
import { Track } from 'src/Tracks/entity/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorites } from './entity/favorite.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const allFavorites = await this.favoritesRepository.find();
    const ids = {
      artistIds: [],
      albumIds: [],
      trackIds: [],
    };

    allFavorites.forEach((fav) => {
      if (fav.type === 'artist') {
        ids.artistIds.push(fav.typeId);
      }
      if (fav.type === 'album') {
        ids.albumIds.push(fav.typeId);
      }
      if (fav.type === 'track') {
        ids.trackIds.push(fav.typeId);
      }
    });

    const artists = await this.artistService.findByIds(ids.artistIds);
    const albums = await this.albumService.findByIds(ids.albumIds);
    const tracks = await this.trackService.findByIds(ids.trackIds);
    return { artists, albums, tracks };
  }

  async deleteFavorite(type: string, id: string) {
    switch (type) {
      case 'artist':
        return this.favoritesRepository.delete({ type: 'artist', typeId: id });
      case 'album':
        return this.favoritesRepository.delete({ type: 'album', typeId: id });
      case 'track':
        return this.favoritesRepository.delete({ type: 'track', typeId: id });
      default:
        throw new Error('Unknown type');
    }
  }

  async addFavorite(type: string, id: string): Promise<Artist | Album | Track> {
    switch (type) {
      case 'artist':
        const artist = (await this.artistService.getArtists()).find(
          (artist) => artist.id === id,
        );
        if (!artist) {
          throw new UnprocessableEntityException('Artist not found');
        }
        await this.favoritesRepository.save({
          type: 'artist',
          typeId: id,
        });
        return this.artistService.getArtist(id);
      case 'album':
        const album = (await this.albumService.getAlbums()).find(
          (album) => album.id === id,
        );
        if (!album) throw new UnprocessableEntityException('Album not found');
        await this.favoritesRepository.save({
          type: 'album',
          typeId: id,
        });
        return this.albumService.getAlbum(id);
      case 'track':
        const track = (await this.trackService.getTracks()).find(
          (track) => track.id === id,
        );
        if (!track) throw new UnprocessableEntityException('Track not found');
        await this.favoritesRepository.save({
          type: 'track',
          typeId: id,
        });
        return this.trackService.getTrack(id);
      default:
        throw new Error('Unknown type');
    }
  }
  @OnEvent('delete.track')
  deleteTrack(id: string) {
    this.favoritesRepository.delete({ type: 'track', typeId: id });
  }

  @OnEvent('delete.artist')
  deleteArtist(id: string) {
    this.favoritesRepository.delete({ type: 'artist', typeId: id });
  }

  @OnEvent('delete.album')
  deleteAlbum(id: string) {
    this.favoritesRepository.delete({ type: 'album', typeId: id });
  }
}
