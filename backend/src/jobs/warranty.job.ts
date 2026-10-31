import { logger } from '../utils/logger.js';
import { warrantyService } from '../services/warranty.service.js';

export async function runWarrantyExpirationCheckJob() {
  logger.info('Running automated warranty expiration and inspection check job...');
  const warranties = await warrantyService.getAll();
  const now = new Date();
  let checked = 0;

  for (const w of warranties) {
    const expiry = new Date(w.expiryDate);
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 90 && diffDays > 0) {
      logger.info(`Warranty policy ${w.policyNumber} is expiring in ${diffDays} days. Flagging for annual maintenance.`);
      checked++;
    }
  }
  return { checked, timestamp: now.toISOString() };
}
