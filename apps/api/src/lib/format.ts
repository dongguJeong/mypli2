export function formatIsoDurationToSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return 0;

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatYoutubeTitle(title: string) {
  const cleaned = title
    .replace(/\[가사\s*\|\s*Lyrics\]/gi, '')
    .replace(/\(Color Coded Lyrics\)/gi, '')
    .replace(/\(Official.*?\)/gi, '')
    .replace(/\(MV\)/gi, '')
    .replace(/\[MV\]/gi, '')
    .replace(/Official Video/gi, '')
    .replace(/Audio/gi, '')
    .trim();

  let match = cleaned.match(/^(.+?)\s*\((.+?)\)\s*[-–—]\s*(.+)$/);

  if (match) {
    return {
      artist: match[2].trim(),
      title: match[3].trim(),
    };
  }

  // 패턴 2: "아티스트 (한글) '제목'"
  match = cleaned.match(/^(.+?)\s*\((.+?)\)\s*[''](.+?)['']?$/);
  if (match) {
    return {
      artist: match[2].trim(),
      title: match[3].trim(),
    };
  }

  // 패턴 3: "아티스트 - 제목"
  match = cleaned.match(/^(.+?)\s*[-–—]\s*(.+)$/);
  if (match) {
    return {
      artist: match[1].trim(),
      title: match[2].trim(),
    };
  }

  // 패턴 4: "아티스트 '제목'"
  match = cleaned.match(/^(.+?)\s*[''""](.+?)[''""]$/);
  if (match) {
    return {
      artist: match[1].trim(),
      title: match[2].trim(),
    };
  }

  // 파싱 실패
  return {
    artist: 'Unknown Artist',
    title: cleaned,
    confidence: 'low',
  };
}
