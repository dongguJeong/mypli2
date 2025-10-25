import { Injectable } from '@nestjs/common';
import { Queue, QueueOptions } from 'bullmq';

@Injectable()
export class PipelineQueue {
  private queue: Queue<{ playlistId: number; videoId: string }>;

  constructor() {
    const options: QueueOptions = {
      connection: { host: 'redis', port: 6379 },
    };

    this.queue = new Queue<{ playlistId: number; videoId: string }>(
      'ingest',
      options,
    );
  }

  enqueue(payload: { playlistId: number; videoId: string }) {
    return this.queue.add('ingest-youtube', payload, {
      attempts: 3,
      backoff: 10000,
    });
  }
}
