import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Track } from "./interface/track.interface";
import { CreateTrackDTO } from "./dto/CreateTrack.dto";
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from "./dto/UpdateTrack.dto";
import { EventEmitter2 } from 'eventemitter2';

@Injectable()

export class TrackService {
    constructor(private eventEmitter: EventEmitter2) {}

    tracks: Track[] = [];
    
    getTracks(): Track[] {
      return this.tracks;
    }

    createTrack(trackDto: CreateTrackDTO): Track {
        const track = {
          id: uuidv4(),
          ...trackDto,
        };
        this.tracks.push(track);
        return track;
    }

    getTrack(id: string): Track {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not uuid');
        }
        const findTrack = this.tracks.find((track) => 
        track.id === id
        );
        if (!findTrack) {
            throw new NotFoundException('Not Found');
        }
        return findTrack;
    }

    deleteTrack(id: string): void {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findedTrack = this.tracks.find((track) =>
        track.id === id
        );
        if (!findedTrack) {
            throw new NotFoundException('Not Found');
        }
        this.tracks = this.tracks.filter((track) => 
        track.id !== id
        );
        this.eventEmitter.emit('delete.track', id);
    }

    deleteId(type: string, id: string) {
        this.tracks = this.tracks.map((track) => {
          if (track[type + 'Id'] === id) {
            return { ...track, [type + 'Id']: null };
          }
          return track;
        });
      }

    updateTrack(id: string, dto: UpdateTrackDto): Track {
        if (!uuidValidate(id)) {
            throw new BadRequestException('Not Valid');
        }
        const findTrack = this.tracks.find((track) =>
        track.id === id
        );
        if (!findTrack) {
            throw new NotFoundException('Not Found');
        }
        const updateTrack = {
          ...findTrack,
          ...dto,   
        };
        this.tracks = this.tracks.map((track) =>
          track.id === id ? updateTrack : track,
        );
        return updateTrack;
    }

    findByIds(ids: string[]): Track[] {
        return this.tracks.filter((track) =>
        ids.includes(track.id)
        );
      }
}