type ParsedTitleConfidence = 'high' | 'medium' | 'low';

interface ParsedTitle {
  artist: string;
  title: string;
  confidence: ParsedTitleConfidence;
}

const TRASH_PATTERNS: RegExp[] = [
  /\[가사\s*\|\s*Lyrics\]/gi,
  /\(Color Coded Lyrics?\)/gi,
  /\(Official.*?\)/gi,
  /\[Official.*?\]/gi,
  /\(MV\)/gi,
  /\[MV\]/gi,
  /\(M\/V\)/gi,
  /\[M\/V\]/gi,
  /\bOfficial Video\b/gi,
  /\bOfficial Music Video\b/gi,
  /\bAudio\b/gi,
  /\bLyric(s)? Video\b/gi,
  /\bLive\b/gi,
];

function cleanYoutubeTitle(raw: string): string {
  let cleaned = raw;
  for (const p of TRASH_PATTERNS) {
    cleaned = cleaned.replace(p, '');
  }

  // 연속 공백 정리
  return cleaned.replace(/\s+/g, ' ').trim();
}

export function formatYoutubeTitle(title: string): ParsedTitle {
  const cleaned = cleanYoutubeTitle(title);

  // 패턴 1: "[MV] IU(아이유) - 좋은 날 (Good Day)" 스타일
  // ex) "IU (아이유) - 좋은 날 (Good Day)"
  let match = cleaned.match(/^(.+?)\s*\((.+?)\)\s*[-–—]\s*(.+)$/);
  if (match) {
    return {
      artist: match[2].trim() || match[1].trim(),
      title: match[3].trim(),
      confidence: 'high',
    };
  }

  // 패턴 2: "아티스트 (한글/영문) '제목'" or "아티스트 (한글/영문) \"제목\""
  // ex) "BTS (방탄소년단) 'Dynamite'"
  match = cleaned.match(/^(.+?)\s*\((.+?)\)\s*['"](.+?)['"]$/);
  if (match) {
    return {
      artist: match[2].trim() || match[1].trim(),
      title: match[3].trim(),
      confidence: 'high',
    };
  }

  // 패턴 3: "아티스트 - 제목" / "Artist – Title"
  match = cleaned.match(/^(.+?)\s*[-–—]\s*(.+)$/);
  if (match) {
    return {
      artist: match[1].trim(),
      title: match[2].trim(),
      confidence: 'medium',
    };
  }

  // 패턴 4: "아티스트 '제목'" / "Artist \"Title\""
  match = cleaned.match(/^(.+?)\s*['"](.+?)['"]$/);
  if (match) {
    return {
      artist: match[1].trim(),
      title: match[2].trim(),
      confidence: 'medium',
    };
  }

  // 패턴 5: "제목 (가수)" 반대 케이스도 가끔 있음
  // ex) "좋은 날 (아이유)"
  match = cleaned.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    return {
      artist: match[2].trim(),
      title: match[1].trim(),
      confidence: 'low',
    };
  }

  return {
    artist: 'Unknown Artist',
    title: cleaned,
    confidence: 'low',
  };
}
