import { describe, it } from 'node:test';
import assert from 'node:assert';
import { leadService } from '../src/services/lead.service.js';
import { quoteService } from '../src/services/quote.service.js';
import { analyticsService } from '../src/services/analytics.service.js';
import { solarDataService } from '../src/services/solar-data.service.js';

describe('SunPower Solutions Backend API Suite', () => {
  it('should fetch all active leads', async () => {
    const leads = await leadService.getAll();
    assert.ok(Array.isArray(leads));
    assert.ok(leads.length > 0);
  });

  it('should create a new lead with valid properties', async () => {
    const lead = await leadService.create({
      customerName: 'Test Customer',
      phone: '+91 99999 88888',
      city: 'Hyderabad',
      state: 'Telangana',
      status: 'new',
      systemCapacityKw: 5,
      solarScore: 90,
      monthlyBill: 4000,
    });
    assert.strictEqual(lead.customerName, 'Test Customer');
    assert.ok(lead.id.startsWith('lead-'));
  });

  it('should fetch quotes with non-negative totals', async () => {
    const quotes = await quoteService.getAll();
    assert.ok(Array.isArray(quotes));
    for (const q of quotes) {
      assert.ok(q.totalAmount > 0);
      assert.ok(Number.isFinite(q.marginPercent));
    }
  });

  it('should return finite analytics numbers with zero NaNs', async () => {
    const analytics = await analyticsService.getSummary();
    assert.ok(Number.isFinite(analytics.monthlyRevenue));
    assert.ok(!Number.isNaN(analytics.monthlyRevenue));
    assert.ok(Number.isFinite(analytics.grossMargin));
    assert.ok(!Number.isNaN(analytics.grossMargin));
    assert.ok(Number.isFinite(analytics.warehouseValue));
    assert.ok(!Number.isNaN(analytics.warehouseValue));
  });

  it('should return NASA POWER verified solar data for cities', async () => {
    const jodhpur = await solarDataService.getByCity('jodhpur');
    assert.strictEqual(jodhpur.city, 'Jodhpur');
    assert.ok(jodhpur.annualAverageGhiKwhM2Day >= 5.0);
  });
});
