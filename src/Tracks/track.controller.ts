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
import { TrackService } from './track.service';
import { Track } from './entity/track.entity';
import { CreateTrackDTO } from './dto/CreateTrack.dto';
import { UpdateTrackDto } from './dto/UpdateTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAlbums(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Post()
  createTrack(@Body() track: CreateTrackDTO): Promise<Track> {
    return this.trackService.createTrack(track);
  }

  @Get(':id')
  getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() track: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, track);
  }
}
