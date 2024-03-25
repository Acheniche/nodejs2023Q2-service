import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entity/album.entity';
import { CreateAlbumDTO } from './dto/CreateAlbum.dto';
import { UpdateAlbumDTO } from './dto/UpdateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAlbums() {
    return this.albumRepository.find();
  }

  async createAlbum(albumDto: CreateAlbumDTO) {
    return this.albumRepository.save(albumDto);
  }

  async getAlbum(id: string) {
    const findAlbum = await this.albumRepository.findOneBy({ id });
    if (!findAlbum) {
      throw new NotFoundException('Not Found');
    }
    return findAlbum;
  }

  async deleteAlbum(id: string) {
    const findAlbum = await this.albumRepository.findOneBy({ id });
    if (!findAlbum) {
      throw new NotFoundException('Not Found');
    }
    this.eventEmitter.emit('delete.album', id);
    await this.albumRepository.delete(id);
  }

  async updateAlbum(id: string, dto: UpdateAlbumDTO) {
    const findedAlbum = await this.albumRepository.findOneBy({ id });
    if (!findedAlbum) {
      throw new NotFoundException('Not Found');
    }
    const updatedAlbum = {
      ...findedAlbum,
      ...dto,
    };
    this.albumRepository.update(id, updatedAlbum);
    return updatedAlbum;
  }

  async findByIds(ids: string[]) {
    return this.albumRepository.find({ where: { id: In(ids) } });
  }
}
