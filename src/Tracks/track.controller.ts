import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { TrackService } from "./track.service";
import { Track } from "./interface/track.interface";
import { CreateTrackDTO } from "./dto/CreateTrack.dto";
import { UpdateTrackDto } from "./dto/UpdateTrack.dto";

@Controller('track')

export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    getAlbums(): Track[] {
      return this.trackService.getTracks();
    }

    @Post()
    createTrack(@Body() track: CreateTrackDTO): Track {
      return this.trackService.createTrack(track);
    }

    @Get(':id')
    getTrack(@Param('id') id: string): Track {
      return this.trackService.getTrack(id);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteTrack(@Param('id') id: string): void {
      return this.trackService.deleteTrack(id);
    }

    @Put(':id')
    updateTrack(@Param('id') id: string, @Body() track: UpdateTrackDto): Track {
      return this.trackService.updateTrack(id, track);
    }
}