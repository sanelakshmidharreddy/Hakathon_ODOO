import { seedDatabase } from '../backend/seed/seed.js';

console.log('--- SunPower Solutions Global Database Seeder ---');
seedDatabase()
  .then(() => {
    console.log('✓ Seeding complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
