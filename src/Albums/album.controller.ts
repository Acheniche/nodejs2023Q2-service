import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./interface/album.interface";
import { CreateAlbumDTO } from "./dto/CreateAlbum.dto";
import { UpdateAlbumDTO } from "./dto/UpdateAlbum.dto";

@Controller('album')

export class AlbumController {
    constructor(private readonly albumServices: AlbumService) {}

    @Get()
    getAlbums(): Album[] {
      return this.albumServices.getAlbums();
    }

    @Post()
    createAlbum(@Body() album: CreateAlbumDTO): Album {
      return this.albumServices.createAlbum(album);
    }

    @Get(':id')
    getAlbum(@Param('id') id: string): Album {
      return this.albumServices.getAlbum(id);
    }

    @Delete(':id')
    @HttpCode(204)
    deletealbum(@Param('id') id: string): void {
      return this.albumServices.deleteAlbum(id);
    }

    @Put(':id')
    updateAlbum(@Param('id') id: string, @Body() album: UpdateAlbumDTO): Album {
      return this.albumServices.updateAlbum(id, album);
    }
}