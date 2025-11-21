import { Controller } from '@nestjs/common';
import axios from 'axios';

@Controller('search')
export class searchController {
  constructor() {}

  async searchYoutube(q: string) {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&videoEmbeddable=true&maxResult=10`,
    );

    return res;
  }
}
