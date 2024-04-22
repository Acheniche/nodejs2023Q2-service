import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './entity/track.entity';
import { CreateTrackDTO } from './dto/CreateTrack.dto';
import { UpdateTrackDto } from './dto/UpdateTrack.dto';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async createTrack(trackDto: CreateTrackDTO): Promise<Track> {
    return this.trackRepository.save(trackDto);
  }

  async getTrack(id: string): Promise<Track> {
    const findTrack = await this.trackRepository.findOneBy({ id });
    if (!findTrack) {
      throw new NotFoundException('Not Found');
    }
    return findTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    const findedTrack = await this.trackRepository.findOneBy({ id });
    if (!findedTrack) {
      throw new NotFoundException('Not Found');
    }
    this.eventEmitter.emit('delete.track', id);
    await this.trackRepository.delete(id);
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    const findTrack = await this.trackRepository.findOneBy({ id });
    if (!findTrack) {
      throw new NotFoundException('Not Found');
    }
    const updateTrack = {
      ...findTrack,
      ...dto,
    };
    await this.trackRepository.update(id, updateTrack);
    return updateTrack;
  }

  async findByIds(ids: string[]): Promise<Track[]> {
    return this.trackRepository.find({ where: { id: In(ids) } });
  }
}
