import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './interface/artist.interface';
import { CreateArtistDTO } from './dto/CreateArtist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDTO } from './dto/UpdateArtist.dto';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class ArtistService {
  constructor(private eventEmitter: EventEmitter2) {}

  artists: Artist[] = [];

  getArtists(): Artist[] {
    return this.artists;
  }

  createArtist(Dto: CreateArtistDTO): Artist {
    const artist = {
      id: uuidv4(),
      ...Dto,
    };
    this.artists.push(artist);
    return artist;
  }

  getArtist(id: string): Artist {
    const SearchArtist = this.artists.find((artist) => artist.id === id);
    if (!SearchArtist) {
      throw new NotFoundException('Not Found');
    }
    return SearchArtist;
  }

  deleteArtist(id: string): void {
    const findArtist = this.artists.find((artist) => (artist.id = id));
    if (!findArtist) {
      throw new NotFoundException('Not Found');
    }
    this.artists = this.artists.filter((artist) => artist.id !== id);
    this.eventEmitter.emit('delete.artist', id);
  }

  updateArtist(id: string, Dto: UpdateArtistDTO): Artist {
    const findArtist = this.artists.find((artist) => artist.id === id);
    if (!findArtist) {
      throw new NotFoundException('Not Found');
    }
    const updateArtist = {
      ...findArtist,
      ...Dto,
    };
    this.artists = this.artists.map((artist) =>
      artist.id === id ? updateArtist : artist,
    );
    return updateArtist;
  }

  findByIds(ids: string[]): Artist[] {
    return this.artists.filter((artist) => ids.includes(artist.id));
  }
}
