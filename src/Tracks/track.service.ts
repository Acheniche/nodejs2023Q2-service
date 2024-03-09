import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Track } from "./interface/track.interface";
import { CreateTrackDTO } from "./dto/CreateTrack.dto";
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from "./dto/UpdateTrack.dto";

@Injectable()

export class TrackService {
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
}