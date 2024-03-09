import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Album } from "./interface/album.interface";
import { CreateAlbumDTO } from "./dto/CreateAlbum.dto";
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { NotFoundError } from "rxjs";
import { UpdateAlbumDTO } from "./dto/UpdateAlbum.dto";

@Injectable()

export class AlbumService {
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
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findAlbum = this.albums.find((album) =>
        album.id = id
        );
        if (!findAlbum) {
            throw new NotFoundException('Not Found');
        }
        return findAlbum;
    }

    deleteAlbum(id: string): void {
        if (!uuidValidate(id)) { 
            throw new BadRequestException('Not Valid');
        }
        const findedAlbum = this.albums.find((album) => 
        album.id === id
        );
        if (!findedAlbum) {
            throw new NotFoundException('Not Found');
        }
        this.albums = this.albums.filter((album) => 
        album.id !== id
        );
    }

    updateAlbum(id: string, dto: UpdateAlbumDTO): Album {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findedAlbum = this.albums.find((album) => 
        album.id === id
        );
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
}