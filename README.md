# MyPli - 플레이리스트 공유 사이트

YouTube 플레이리스트를 만들고 공유하는 웹 애플리케이션입니다.

## 기술 스택

### 프론트엔드

- React + TypeScript
- React Query (데이터 페칭)
- Zustand (상태 관리)
- Tailwind CSS (스타일링)

### 백엔드

- NestJS
- TypeORM
- MySQL 8.0
- Redis (세션 스토어)

### 패키지 매니저

- pnpm

## 시작하기

### 1. 환경 변수 설정

```bash
cp .env.example .env
```

### 2. 데이터베이스 실행

```bash
# Docker Compose로 MySQL, Redis
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 상태 확인
docker-compose ps
```

### 3. 데이터베이스 접속 확인

**MySQL 직접 접속:**

```bash
docker exec -it mypli_mysql mysql -u mypli_user -p
# 비밀번호: .env 파일의 MYSQL_PASSWORD
```

**phpMyAdmin 접속:**

- URL: http://localhost:8080
- 사용자: mypli_user
- 비밀번호: .env 파일의 MYSQL_PASSWORD

### 4. 데이터베이스 중지

```bash
# 컨테이너 중지
docker-compose stop

# 컨테이너 중지 및 삭제
docker-compose down

# 컨테이너, 볼륨, 네트워크 모두 삭제 (데이터 초기화)
docker-compose down -v
```

## Docker Compose 서비스

### MySQL (포트: 3306)

- 메인 데이터베이스
- 초기 스키마 자동 생성
- 데이터는 Docker 볼륨에 영구 저장

### Redis (포트: 6379)

- 세션 스토어
- 캐싱

### phpMyAdmin (포트: 8080)

- 데이터베이스 관리 도구
- 개발 환경에서만 사용

## 데이터베이스 스키마

### 주요 테이블

- `users`: 사용자 정보
- `songs`: YouTube 비디오 정보 (메타데이터만)
- `playlists`: 플레이리스트
- `playlist_songs`: 플레이리스트-노래 연결
- `playlist_likes`: 플레이리스트 좋아요
- `playlist_bookmarks`: 플레이리스트 북마크
- `sessions`: 세션 관리

### 주요 기능

- ✅ 사용자 인증 (세션 기반)
- ✅ 플레이리스트 생성/수정/삭제
- ✅ YouTube 비디오 추가
- ✅ 좋아요/북마크
- ✅ 공개/비공개 설정

상세 스키마는 `docker/mysql/init/01-simple-schema.sql` 참고

## 개발 계획

- [ ] Phase 1: 프로젝트 초기 설정
- [x] Phase 2: MySQL 데이터베이스 설정
- [ ] Phase 3: 백엔드 기반 구축
- [ ] Phase 4: 프론트엔드 기반 구축
- [ ] Phase 5: 핵심 기능 개발
- [ ] Phase 6: UI/UX 개선
- [ ] Phase 7: 테스트 및 최적화
- [ ] Phase 8: 배포

## 문제 해결

### MySQL 연결 실패

```bash
# 컨테이너 로그 확인
docker-compose logs mysql

# 컨테이너 재시작
docker-compose restart mysql
```

### 포트 충돌

`.env` 파일에서 포트 번호를 변경하세요:

- `MYSQL_PORT`
- `REDIS_PORT`
- `PHPMYADMIN_PORT`

## 라이선스

MIT
