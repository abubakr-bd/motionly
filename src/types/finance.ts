export type InvoiceStatus = 
  | "DRAFT" 
  | "SENT" 
  | "VIEWED" 
  | "PARTIALLY_PAID" 
  | "PAID" 
  | "OVERDUE" 
  | "REJECTED"
  | "CANCELLED" 
  | "ARCHIVED";

export type PaymentMethod = 
  | "Bank Transfer" 
  | "bKash" 
  | "Cash" 
  | "Card" 
  | "Other";

export type SyncStatus = "SYNCED" | "PENDING" | "FAILED";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  taxVatInfo?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SavedService {
  id: string;
  name: string;
  description: string;
  defaultRate: number;
  unit: string; // e.g. "Day", "Video", "Hour", "Project", "Item"
  category: string;
  active: boolean;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  serviceId?: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  discount: number; // percentage or fixed amount, default 0
  amount: number; // calculated: (quantity * rate) - discount
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  paymentDate: string; // ISO date format YYYY-MM-DD
  note?: string;
  createdBy: string;
  createdAt: string;
  syncStatus?: SyncStatus;
}

export interface InvoiceBranding {
  logoUrl?: string;
  logoEnabled: boolean;
  watermarkUrl?: string;
  watermarkText?: string;
  watermarkEnabled: boolean;
  watermarkOpacity: number; // 0.05 to 0.5
  watermarkPosition: "center" | "top-right" | "bottom-right";
  signatureUrl?: string;
  signatureEnabled: boolean;
  signatoryName?: string;
  signatoryRole?: string;
}

export interface FinanceCompanyInfo {
  companyName: string;
  companyAddress: string;
  email: string;
  phone: string;
  website: string;
  taxVatInfo?: string;
}

export interface FinanceBankInfo {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName: string;
  routingNumber: string;
  bkashNumber?: string;
  otherInstructions?: string;
}

export interface FinanceNumberingSettings {
  prefix: string; // e.g. "#" or "INV-"
  startingNumber: number; // e.g. 121
  numberPadding: number; // e.g. 5 for #00121
}

export interface FinanceSettings {
  id: string;
  company: FinanceCompanyInfo;
  bank: FinanceBankInfo;
  numbering: FinanceNumberingSettings;
  branding: InvoiceBranding;
  defaultTerms: string;
  defaultPaymentTerms: string; // e.g. "Due on Receipt", "Net 15", "Net 30"
  googleSheets: {
    enabled: boolean;
    spreadsheetId: string;
    webhookUrl: string; // Webhook / Google Apps Script endpoint URL
    autoSync: boolean;
    lastSyncedAt?: string;
    lastError?: string;
  };
  emailTemplate: {
    subject: string;
    body: string;
  };
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  invoiceId: string;
  action: 
    | "CREATED" 
    | "EDITED" 
    | "SENT" 
    | "VIEWED_BY_CLIENT" 
    | "PAYMENT_RECORDED" 
    | "STATUS_CHANGED" 
    | "DUPLICATED" 
    | "ARCHIVED" 
    | "SHEETS_SYNCED";
  details: string;
  userEmail: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "#00121"
  clientId: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientTaxVatInfo?: string;
  
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  paymentTerms: string;
  poNumber?: string;
  project?: string;
  currency: string; // default "BDT"

  items: InvoiceItem[];
  
  subtotal: number;
  discount: number; // overall fixed discount
  taxPercent: number; // tax rate %
  taxAmount: number;
  advanceAmount: number; // advance payment received up front
  total: number; // Subtotal - discount + taxAmount
  amountPaid: number; // sum of payments recorded
  balanceDue: number; // total - amountPaid
  
  status: InvoiceStatus;
  publicToken: string;
  
  brandingOverride?: InvoiceBranding;
  bankInfoOverride?: FinanceBankInfo;
  termsOverride?: string;
  notes?: string;

  googleSheetSyncStatus: SyncStatus;
  lastSyncedAt?: string;
  syncError?: string;

  firstViewedAt?: string;
  lastViewedAt?: string;

  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
