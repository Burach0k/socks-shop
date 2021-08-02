export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  telegram: {
    token: process.env.TG_BOT_TOKEN,
    charId: process.env.TG_CHAT_ID,
  },
  email: {
    login: process.env.EMAIL_NAME,
    password: process.env.EMAIL_PASS,
  },
  dataBaseUrl: process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/socks_shop',
};
