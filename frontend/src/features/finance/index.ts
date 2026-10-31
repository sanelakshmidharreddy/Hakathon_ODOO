// Finance and invoice module
export interface SubsidyClaim {
  orderId: string;
  consumerNumber: string;
  discomApprovalDate: string;
  subsidyAmountInr: number;
  status: 'draft' | 'submitted' | 'approved' | 'disbursed';
}

export { Quotes as FinanceFeature } from '../../pages/Quotes';
