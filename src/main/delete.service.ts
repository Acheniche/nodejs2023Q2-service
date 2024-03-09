import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AlbumService } from "src/Albums/album.service";
import { ArtistService } from "src/Artists/artist.service";
import { FavoriteService } from "src/Favorites/favorite.service";
import { TrackService } from "src/Tracks/track.service";

@Injectable()

export class DeleteService {
    constructor(
        private readonly albumService: AlbumService,
        private readonly trackService: TrackService,
        private readonly artistService: ArtistService,
        private readonly favsService: FavoriteService,
      ) {}

      @OnEvent('delete.album')
      deleteAlbum(id: string): void {
        this.trackService.deleteId('album', id);
        this.favsService.deleteId('album', id);
      }

      @OnEvent('delete.track')
      deleteTrack(id: string): void {
        this.favsService.deleteId('track', id);
      }

      @OnEvent('delete.artist')
      deleteArtist(id: string): void {
        this.trackService.deleteId('artist', id);
        this.favsService.deleteId('artist', id);
        this.albumService.deleteId('artist', id);
      }
}