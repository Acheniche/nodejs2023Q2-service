import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDTO } from './dto/CreateArtist.dto';
import { UpdateArtistDTO } from './dto/UpdateArtist.dto';
import { Artist } from './entity/artist.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getArtists() {
    return this.artistRepository.find();
  }

  async createArtist(artistDto: CreateArtistDTO) {
    return this.artistRepository.save(artistDto);
  }

  async getArtist(id: string) {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    return findedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    this.eventEmitter.emit('delete.artist', id);
    await this.artistRepository.delete(id);
  }

  async updateArtist(id: string, artistDto: UpdateArtistDTO) {
    const findedArtist = await this.artistRepository.findOneBy({ id });
    if (!findedArtist) throw new NotFoundException('Not Found');
    const updatedArtist = {
      ...findedArtist,
      ...artistDto,
    };
    await this.artistRepository.update(id, updatedArtist);
    return updatedArtist;
  }

  async findByIds(ids: string[]): Promise<Artist[]> {
    return this.artistRepository.find({ where: { id: In(ids) } });
  }
}
