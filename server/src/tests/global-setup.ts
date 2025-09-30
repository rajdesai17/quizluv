import { execSync } from 'child_process';

export default async function globalSetup() {
  process.env.NODE_ENV = 'test';
  if (!process.env.DB_PATH) process.env.DB_PATH = './data/test.db';
  try {
    execSync('node ./node_modules/ts-node/dist/bin.js src/scripts/migrate.ts', { stdio: 'inherit' });
    execSync('node ./node_modules/ts-node/dist/bin.js src/scripts/seed.ts', { stdio: 'inherit' });
  } catch (e) {
    // Let tests fail with context if migration/seed fails
    throw e;
  }
}


