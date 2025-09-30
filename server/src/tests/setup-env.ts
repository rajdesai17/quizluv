process.env.NODE_ENV = 'test';
// Use isolated test DB
if (!process.env.DB_PATH) {
  process.env.DB_PATH = './data/test.db';
}
// CORS origin irrelevant during tests but set to avoid surprises
if (!process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN = 'http://localhost:5173';
}


