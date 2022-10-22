declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
}

export {}
