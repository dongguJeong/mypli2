// apps/api/src/queues/workers/ingest.worker.ts
import { Worker } from 'bullmq';
import { SongsService } from '../../modules/songs/songs.service';

new Worker('ingest', async (job) => {
  const { playlistId, videoId } = job.data;
  // 1) 오디오 다운로드
  const audioPath = await fastApi('/download', { videoId });

  // 2) 노래 매칭(정답 artist/title/ISRC/MBID)
  const match = await fastApi('/match', { audioPath });
  // 3) 메타데이터(장르, 앨범, 이미지, duration, extIds)
  const meta = await fastApi('/metadata', {
    isrc: match.isrc,
    mbid: match.mbid,
    title: match.title,
    artist: match.artist,
  });

  // 4) 중복 확인 → Song upsert
  const song = await songsService.upsertFromMatchAndMeta({
    videoId,
    match,
    meta,
  });

  // 5) 분석(BPM/Key/Features)
  const analysis = await fastApi('/analyze', { audioPath });
  await songsService.attachAnalysis(song.id, analysis);

  // 6) 플레이리스트에 연결
  await playlistsService.addExistingSong(playlistId, song.id);
});
