import { logger } from '../utils/logger.js';

export async function sendDailyExecutiveDigest() {
  logger.info('Preparing daily executive analytics digest for Directors...');
  return {
    sent: true,
    recipients: ['director@sunpower.in'],
    deliveredAt: new Date().toISOString(),
  };
}
