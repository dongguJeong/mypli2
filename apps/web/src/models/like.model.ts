import type { Playlist } from "./playlist.model";

export interface Like extends Playlist {
  tags: string[];
}
