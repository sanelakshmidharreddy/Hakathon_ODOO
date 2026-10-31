import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'sunpower-dev-secret-key-change-in-prod',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'https://hakathonodoo.vercel.app',
  corsOrigin: process.env.CORS_ORIGIN || 'https://hakathonodoo.vercel.app',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/sunpower',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || 'demo_key',
};
