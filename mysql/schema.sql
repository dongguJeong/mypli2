-- 사용자
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;


-- 플레이리스트
CREATE TABLE IF NOT EXISTS playlist (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    detail VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_playlist_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;


-- 플레이리스트에 포함된 곡
CREATE TABLE IF NOT EXISTS playlist_song (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    playlist_id INTEGER
    youtube_url VARCHAR(500)
    singer VARCHAR(500),
    song_thumbnail VARCHAR(500),
    order_index INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_playlist_song_playlist
        FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE,
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;


-- 좋아요
CREATE TABLE IF NOT EXISTS playlist_like (
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    playlist_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (playlist_id, user_id),
    CONSTRAINT fk_playlist_like_playlist
        FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE,
    CONSTRAINT fk_playlist_like_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;


-- 북마크
CREATE TABLE IF NOT EXISTS playlist_bookmark (
    playlist_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (playlist_id, user_id),
    CONSTRAINT fk_playlist_bookmark_playlist
        FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE,
    CONSTRAINT fk_playlist_bookmark_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci;
