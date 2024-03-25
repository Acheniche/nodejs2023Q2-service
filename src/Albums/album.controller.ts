import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entity/album.entity';
import { CreateAlbumDTO } from './dto/CreateAlbum.dto';
import { UpdateAlbumDTO } from './dto/UpdateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumServices: AlbumService) {}

  @Get()
  getAlbums(): Promise<Album[]> {
    return this.albumServices.getAlbums();
  }

  @Post()
  createAlbum(@Body() album: CreateAlbumDTO): Promise<Album> {
    return this.albumServices.createAlbum(album);
  }

  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumServices.getAlbum(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deletealbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumServices.deleteAlbum(id);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() album: UpdateAlbumDTO,
  ): Promise<Album> {
    return this.albumServices.updateAlbum(id, album);
  }
}
