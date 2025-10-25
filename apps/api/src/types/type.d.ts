import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number; // 우리가 세션에 넣는 값
  }
}
