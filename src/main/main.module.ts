import { Module } from "@nestjs/common";
import { DeleteService } from "./delete.service";
import { AlbumModule } from "src/Albums/album.module";
import { TrackModule } from "src/Tracks/track.module";
import { ArtistModule } from "src/Artists/artist.module";
import { favoriteModule } from "src/Favorites/favorite.module";

@Module({
    exports: [DeleteService],
    imports: [AlbumModule, TrackModule, ArtistModule, favoriteModule],
    providers: [DeleteService],
})

export class MainModule {}