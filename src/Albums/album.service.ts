import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './interface/album.interface';
import { CreateAlbumDTO } from './dto/CreateAlbum.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDTO } from './dto/UpdateAlbum.dto';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class AlbumService {
  constructor(private eventEmitter: EventEmitter2) {}

  albums: Album[] = [];

  getAlbums(): Album[] {
    return this.albums;
  }

  createAlbum(dto: CreateAlbumDTO): Album {
    const album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(album);
    return album;
  }

  getAlbum(id: string): Album {
    const findAlbum = this.albums.find((album) => (album.id = id));
    if (!findAlbum) {
      throw new NotFoundException('Not Found');
    }
    return findAlbum;
  }

  deleteAlbum(id: string): void {
    const findAlbum = this.albums.find((album) => album.id === id);
    if (!findAlbum) {
      throw new NotFoundException('Not Found');
    }
    this.albums = this.albums.filter((album) => album.id !== id);
    this.eventEmitter.emit('delete.album', id);
  }

  updateAlbum(id: string, dto: UpdateAlbumDTO): Album {
    const findedAlbum = this.albums.find((album) => album.id === id);
    if (!findedAlbum) {
      throw new NotFoundException('Not Found');
    }
    const updatedAlbum = {
      ...findedAlbum,
      ...dto,
    };
    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return updatedAlbum;
  }

  deleteId(type: string, id: string) {
    this.albums = this.albums.map((album) => {
      if (album[type + 'Id'] === id) {
        return { ...album, [type + 'Id']: null };
      }
      return album;
    });
  }

  findByIds(ids: string[]): Album[] {
    return this.albums.filter((album) => ids.includes(album.id));
  }
}
