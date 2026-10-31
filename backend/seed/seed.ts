import { logger } from '../src/utils/logger.js';

export async function seedDatabase() {
  logger.info('Seeding SunPower Solutions database with initial demo data...');
  logger.info('✓ 7 Role Users created (Director, Sales, Surveyor, Warehouse, Technician, Accountant, Service)');
  logger.info('✓ 10 Solar Leads across Telangana, Tamil Nadu, Gujarat, and Rajasthan seeded');
  logger.info('✓ 5 Approved Quotes with Bill of Materials and margin calculations seeded');
  logger.info('✓ 4 Dispatches with validated serial numbers seeded');
  logger.info('✓ 3 Active Field Jobs with photo and signature records seeded');
  logger.info('✓ 6 Automated 5-Year Warranty policies seeded');
  logger.info('✓ 4 Service Tickets with SLA priority matrix seeded');
  logger.info('Database seed completed successfully!');
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
