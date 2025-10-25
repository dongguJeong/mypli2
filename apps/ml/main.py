# apps/ml/main.py (FastAPI)
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DownloadReq(BaseModel):
    videoId: str

@app.post("/download")
def download_audio(req: DownloadReq):
    # yt_dlp로 audio 추출, 파일 경로 반환
    return {"audioPath": f"/data/{req.videoId}.mp3"}

class MatchReq(BaseModel):
    audioPath: str

@app.post("/match")
def match(req: MatchReq):
    # ACRCloud/AudD 등 제공자 호출 → best match
    # 데모 반환
    return {"artist": "IU", "title": "Blueming", "isrc": "KRA381900123", "mbid": "..."}

class MetadataReq(BaseModel):
    isrc: str | None = None
    mbid: str | None = None
    title: str
    artist: str

@app.post("/metadata")
def metadata(req: MetadataReq):
    # MusicBrainz/Spotify 조회 → 장르/앨범/커버/길이/외부ID
    return {"genre": "K-Pop", "album": "Love Poem", "coverUrl": "...", "durationSec": 219, "externalIds": {"spotify": "..."}}

class AnalyzeReq(BaseModel):
    audioPath: str

@app.post("/analyze")
def analyze(req: AnalyzeReq):
    # librosa/essentia 등으로 bpm/key/features 산출
    return {"bpm": 120, "key": "E", "features": {"mfcc_mean": [..]}}

