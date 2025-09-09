const { env } = process;

export default () => ({
  version: process.env.npm_package_version,
  mode: env.MODE || 'development',
  port: Number(env.PORT) || 3000,
  sentry: {
    dsn: env.SENTRY_DSN
  },
  database: {
    default: {
      host: env.POSTGRES_HOST || 'localhost',
      port: Number(env.POSTGRES_PORT) || 5432,
      database: env.POSTGRES_DATABASE || 'back-end-r3-suprimentos',
      username: env.POSTGRES_USERNAME || 'postgres',
      password: env.POSTGRES_PASSWORD || 'postgres',
      timeout: Number(env.POSTGRES_TIMEOUT) || 5000
    },
    default2: {
      host: env.POSTGRES_HOST || 'localhost',
      port: Number(env.POSTGRES_PORT) || 5432,
      database: env.POSTGRES_DATABASE || 'back-end-r3-suprimentos',
      username: env.POSTGRES_USERNAME || 'postgres',
      password: env.POSTGRES_PASSWORD || 'postgres',
      timeout: Number(env.POSTGRES_TIMEOUT) || 5000
    }
  },
  jwt: {
    secret: env.JWT_SECRET || ''
  },
  winthor: {
    url: env.WINTHOR_URL || '',
    username: env.WINTHOR_USERNAME || '',
    password: env.WINTHOR_PASSWORD || '',
    timeout: env.WINTHOR_TIMEOUT || 5000
  }
});
