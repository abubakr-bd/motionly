import type { 
  Invoice, Payment, Client, SavedService, 
  FinanceSettings, ActivityLog, InvoiceStatus, SyncStatus 
} from "../../types/finance";
import { getDb } from "../firebaseLazy";
import { GoogleSheetsService } from "./googleSheetsService";

const DEFAULT_SETTINGS: FinanceSettings = {
  id: "default",
  company: {
    companyName: "Motionly Media",
    companyAddress: "Dhaka, Bangladesh",
    email: "finance@motionly.media",
    phone: "+880 01605049299",
    website: "https://motionly.media",
    taxVatInfo: ""
  },
  bank: {
    bankName: "UCB",
    accountName: "Nazmul Hossen Shuvo",
    accountNumber: "1583201001229020",
    branchName: "Katgor",
    routingNumber: "245154090",
    bkashNumber: "01948303128",
    otherInstructions: "Please include Invoice # in payment reference."
  },
  numbering: {
    prefix: "#",
    startingNumber: 121,
    numberPadding: 5
  },
  branding: {
    logoUrl: "/motionly_logo_brand.png",
    logoEnabled: true,
    watermarkUrl: "/motionly_logo_brand.png",
    watermarkText: "MOTIONLY MEDIA",
    watermarkEnabled: true,
    watermarkOpacity: 0.05,
    watermarkPosition: "center",
    signatureUrl: "/cfo_signature.png",
    signatureEnabled: true,
    signatoryName: "Nazmul Hossein Shuvo",
    signatoryRole: "Chief Finance Officer"
  },
  defaultTerms: "Payment is due according to the agreed payment terms. Project delivery timelines may vary depending on feedback and required revisions.",
  defaultPaymentTerms: "Due on Receipt",
  googleSheets: {
    enabled: true,
    spreadsheetId: "1ykMwwRRI9nZIEfL98lg1QYcUDz_vckTiLyaDOwXZ0zU",
    webhookUrl: "https://script.google.com/macros/s/AKfycbxnPYIXiFdBtZ3z3LSAqGrVY4oKpstOSMgdzEKBjTbsTj204YPqoZA2SwYgAr8iN6tLmQ/exec",
    autoSync: true
  },
  emailTemplate: {
    subject: "Invoice {invoice_number} from Motionly Media",
    body: "Dear {client_name},\n\nPlease find attached invoice {invoice_number} for {total_amount}.\n\nThank you for working with Motionly Media!"
  },
  updatedAt: new Date().toISOString()
};

export class FinanceService {
  // --- SETTINGS -------------------------------------------------------------
  public static async getSettings(): Promise<FinanceSettings> {
    try {
      const db = await getDb();
      const { doc, getDoc, setDoc } = await import("firebase/firestore");
      const snap = await getDoc(doc(db, "finance_settings", "default"));
      if (snap.exists()) {
        const data = snap.data() as FinanceSettings;
        if (data.company && data.company.taxVatInfo && data.company.taxVatInfo.includes("001234567-0101")) {
          data.company.taxVatInfo = "";
        }
        
        // Enforce official UCB Bank & CFO details
        data.bank = {
          bankName: "UCB",
          accountName: "Nazmul Hossen Shuvo",
          accountNumber: "1583201001229020",
          branchName: "Katgor",
          routingNumber: "245154090",
          bkashNumber: "01948303128",
          otherInstructions: data.bank?.otherInstructions || "Please include Invoice # in payment reference."
        };

        data.branding = {
          ...data.branding,
          logoUrl: "/motionly_logo_brand.png",
          watermarkUrl: "/motionly_logo_brand.png",
          signatoryName: "Nazmul Hossein Shuvo",
          signatoryRole: "Chief Finance Officer",
          signatureUrl: "/cfo_signature.png"
        };

        if (!data.googleSheets?.webhookUrl) {
          data.googleSheets = {
            enabled: data.googleSheets?.enabled ?? true,
            spreadsheetId: data.googleSheets?.spreadsheetId || "1ykMwwRRI9nZIEfL98lg1QYcUDz_vckTiLyaDOwXZ0zU",
            webhookUrl: "https://script.google.com/macros/s/AKfycbxnPYIXiFdBtZ3z3LSAqGrVY4oKpstOSMgdzEKBjTbsTj204YPqoZA2SwYgAr8iN6tLmQ/exec",
            autoSync: data.googleSheets?.autoSync ?? true
          };
        }
        if (data.googleSheets?.webhookUrl) {
          GoogleSheetsService.setWebhookUrl(data.googleSheets.webhookUrl);
        }

        // Auto persist corrected UCB details to Firestore
        setDoc(doc(db, "finance_settings", "default"), data, { merge: true }).catch(console.error);

        return { ...DEFAULT_SETTINGS, ...data };
      }
    } catch (err) {
      console.warn("Using default finance settings:", err);
    }
    return DEFAULT_SETTINGS;
  }

  public static async updateSettings(settings: Partial<FinanceSettings>): Promise<FinanceSettings> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const current = await this.getSettings();
    const updated: FinanceSettings = {
      ...current,
      ...settings,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, "finance_settings", "default"), updated, { merge: true });

    if (updated.googleSheets?.webhookUrl) {
      GoogleSheetsService.setWebhookUrl(updated.googleSheets.webhookUrl);
    }
    return updated;
  }

  // --- CLIENTS --------------------------------------------------------------
  public static async getClients(): Promise<Client[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "clients"), orderBy("name", "asc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    } catch (err) {
      console.error("Error fetching clients:", err);
      return [];
    }
  }

  public static async createClient(clientData: Omit<Client, "id" | "createdAt">): Promise<Client> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const id = `cli_${Date.now()}`;
    const newClient: Client = {
      ...clientData,
      id,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, "clients", id), newClient);

    // Auto sync to Google Sheets
    const settings = await this.getSettings();
    if (settings.googleSheets.autoSync) {
      GoogleSheetsService.syncClient(newClient, settings.googleSheets.webhookUrl).catch(console.error);
    }

    return newClient;
  }

  public static async updateClient(id: string, clientData: Partial<Client>): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "clients", id), {
      ...clientData,
      updatedAt: new Date().toISOString()
    });
  }

  // --- SAVED SERVICES -------------------------------------------------------
  public static async getServices(): Promise<SavedService[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "services"), orderBy("name", "asc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedService));
    } catch (err) {
      console.error("Error fetching services:", err);
      return [];
    }
  }

  public static async createService(serviceData: Omit<SavedService, "id" | "createdAt">): Promise<SavedService> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const id = `srv_${Date.now()}`;
    const newService: SavedService = {
      ...serviceData,
      id,
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, "services", id), newService);

    // Auto sync to Google Sheets
    const settings = await this.getSettings();
    if (settings.googleSheets.autoSync) {
      GoogleSheetsService.syncService(newService, settings.googleSheets.webhookUrl).catch(console.error);
    }

    return newService;
  }

  public static async updateService(id: string, serviceData: Partial<SavedService>): Promise<void> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "services", id), serviceData);
  }

  // --- INVOICE NUMBER GENERATION --------------------------------------------
  public static async generateInvoiceNumber(): Promise<string> {
    const settings = await this.getSettings();
    const { prefix, startingNumber, numberPadding } = settings.numbering;
    
    const invoices = await this.getInvoices();
    let highestNum = startingNumber - 1;

    for (const inv of invoices) {
      const match = inv.invoiceNumber.match(/\d+/);
      if (match) {
        const val = parseInt(match[0], 10);
        if (val > highestNum) highestNum = val;
      }
    }

    const nextNum = highestNum + 1;
    const numStr = String(nextNum).padStart(numberPadding, "0");
    return `${prefix}${numStr}`;
  }

  // --- INVOICES -------------------------------------------------------------
  public static async getInvoices(): Promise<Invoice[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      let list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));

      if (list.length === 0 || !list.some(inv => inv.invoiceNumber === "#00121")) {
        await this.seedSampleData("admin@motionly.media");
        const snap2 = await getDocs(q);
        list = snap2.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
      }

      return list;
    } catch (err) {
      console.error("Error fetching invoices:", err);
      return [];
    }
  }

  public static async getInvoiceById(id: string): Promise<Invoice | null> {
    try {
      const db = await getDb();
      const { doc, getDoc } = await import("firebase/firestore");
      const snap = await getDoc(doc(db, "invoices", id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Invoice;
      }
    } catch (err) {
      console.error("Error fetching invoice by ID:", err);
    }
    return null;
  }

  public static async getInvoiceByPublicToken(token: string): Promise<Invoice | null> {
    try {
      const db = await getDb();
      const { collection, query, where, getDocs } = await import("firebase/firestore");
      const q = query(collection(db, "invoices"), where("publicToken", "==", token));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as Invoice;
      }
    } catch (err) {
      console.error("Error fetching invoice by public token:", err);
    }
    return null;
  }

  /**
   * Save a new invoice with backend math calculation & auto Google Sheets sync
   */
  public static async createInvoice(
    invoiceData: Omit<Invoice, "id" | "publicToken" | "createdAt" | "updatedAt" | "googleSheetSyncStatus" | "createdBy">,
    userEmail: string
  ): Promise<Invoice> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");

    const id = `inv_${Date.now()}`;
    const publicToken = `pub_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const now = new Date().toISOString();

    // Recalculate all totals strictly on backend
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.amount || (item.quantity * item.rate) - (item.discount || 0)), 0);
    const advanceAmount = invoiceData.advanceAmount || 0;
    const taxAmount = (subtotal - (invoiceData.discount || 0)) * ((invoiceData.taxPercent || 0) / 100);
    const total = Math.max(0, subtotal - (invoiceData.discount || 0) + taxAmount);
    const amountPaid = invoiceData.amountPaid || 0;
    const balanceDue = Math.max(0, total - advanceAmount - amountPaid);

    const newInvoice: Invoice = {
      ...invoiceData,
      id,
      publicToken,
      subtotal,
      taxAmount,
      total,
      amountPaid,
      balanceDue,
      googleSheetSyncStatus: "PENDING",
      createdBy: userEmail,
      createdAt: now,
      updatedAt: now
    };

    await setDoc(doc(db, "invoices", id), newInvoice);

    await this.logActivity(id, "CREATED", `Invoice ${newInvoice.invoiceNumber} created`, userEmail);

    // Auto-sync to Google Sheets
    const settings = await this.getSettings();
    if (settings.googleSheets.autoSync) {
      const syncRes = await GoogleSheetsService.syncInvoice(newInvoice, settings.googleSheets.webhookUrl);
      await this.updateInvoiceSyncStatus(id, syncRes.status, syncRes.message);
      newInvoice.googleSheetSyncStatus = syncRes.status;
    }

    return newInvoice;
  }

  /**
   * Update an existing invoice
   */
  public static async updateInvoice(
    id: string,
    invoiceData: Partial<Invoice>,
    userEmail: string
  ): Promise<Invoice> {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    const existing = await this.getInvoiceById(id);
    if (!existing) throw new Error("Invoice not found");

    const items = invoiceData.items || existing.items;
    const subtotal = items.reduce((sum, item) => sum + (item.amount || (item.quantity * item.rate) - (item.discount || 0)), 0);
    const discount = invoiceData.discount !== undefined ? invoiceData.discount : existing.discount;
    const advanceAmount = invoiceData.advanceAmount !== undefined ? invoiceData.advanceAmount : (existing.advanceAmount || 0);
    const taxPercent = invoiceData.taxPercent !== undefined ? invoiceData.taxPercent : existing.taxPercent;
    const taxAmount = (subtotal - discount) * (taxPercent / 100);
    const total = Math.max(0, subtotal - discount + taxAmount);
    const amountPaid = invoiceData.amountPaid !== undefined ? invoiceData.amountPaid : existing.amountPaid;
    const balanceDue = Math.max(0, total - advanceAmount - amountPaid);

    let status = invoiceData.status || existing.status;
    if (status !== "CANCELLED" && status !== "ARCHIVED" && status !== "DRAFT") {
      if (balanceDue === 0 && subtotal > 0) status = "PAID";
      else if (amountPaid > 0 || advanceAmount > 0) status = "PARTIALLY_PAID";
    }

    const updated: Invoice = {
      ...existing,
      ...invoiceData,
      subtotal,
      taxAmount,
      total,
      amountPaid,
      balanceDue,
      status,
      googleSheetSyncStatus: "PENDING",
      updatedAt: new Date().toISOString()
    };

    await updateDoc(doc(db, "invoices", id), updated as any);
    await this.logActivity(id, "EDITED", `Invoice ${updated.invoiceNumber} updated`, userEmail);

    // Auto-sync to Google Sheets
    const settings = await this.getSettings();
    if (settings.googleSheets.autoSync) {
      const syncRes = await GoogleSheetsService.syncInvoice(updated, settings.googleSheets.webhookUrl);
      await this.updateInvoiceSyncStatus(id, syncRes.status, syncRes.message);
      updated.googleSheetSyncStatus = syncRes.status;
    }

    return updated;
  }

  /**
   * Duplicate an existing invoice into a new DRAFT invoice
   */
  public static async duplicateInvoice(id: string, userEmail: string): Promise<Invoice> {
    const existing = await this.getInvoiceById(id);
    if (!existing) throw new Error("Original invoice not found");

    const newInvoiceNumber = await this.generateInvoiceNumber();
    const today = new Date().toISOString().split("T")[0];

    const duplicatedData: Omit<Invoice, "id" | "publicToken" | "createdAt" | "updatedAt" | "googleSheetSyncStatus"> = {
      ...existing,
      invoiceNumber: newInvoiceNumber,
      issueDate: today,
      dueDate: today,
      amountPaid: 0,
      balanceDue: existing.total,
      status: "DRAFT"
    };

    const newInvoice = await this.createInvoice(duplicatedData, userEmail);
    await this.logActivity(id, "DUPLICATED", `Duplicated invoice ${existing.invoiceNumber} to ${newInvoiceNumber}`, userEmail);

    return newInvoice;
  }

  public static async archiveInvoice(id: string, userEmail: string): Promise<void> {
    await this.updateInvoice(id, { status: "ARCHIVED" }, userEmail);
    await this.logActivity(id, "ARCHIVED", `Invoice archived`, userEmail);
  }

  public static async deleteInvoice(id: string, userEmail: string): Promise<void> {
    const db = await getDb();
    const { doc, deleteDoc } = await import("firebase/firestore");
    const inv = await this.getInvoiceById(id);
    await deleteDoc(doc(db, "invoices", id));
    if (inv) {
      await this.logActivity(id, "EDITED", `Invoice ${inv.invoiceNumber} deleted`, userEmail);
    }
  }

  public static async updateInvoiceSyncStatus(id: string, status: SyncStatus, error?: string): Promise<void> {
    try {
      const db = await getDb();
      const { doc, updateDoc } = await import("firebase/firestore");
      await updateDoc(doc(db, "invoices", id), {
        googleSheetSyncStatus: status,
        lastSyncedAt: new Date().toISOString(),
        syncError: error || null
      });
    } catch (err) {
      console.error("Failed to update sync status:", err);
    }
  }

  /**
   * Record client view event for public invoice page
   */
  public static async recordClientView(invoiceId: string): Promise<void> {
    try {
      const invoice = await this.getInvoiceById(invoiceId);
      if (!invoice) return;

      const now = new Date().toISOString();
      const db = await getDb();
      const { doc, updateDoc } = await import("firebase/firestore");

      const updates: any = {
        lastViewedAt: now
      };

      if (!invoice.firstViewedAt) {
        updates.firstViewedAt = now;
      }

      if (invoice.status === "SENT") {
        updates.status = "VIEWED";
      }

      await updateDoc(doc(db, "invoices", invoiceId), updates);
      await this.logActivity(invoiceId, "VIEWED_BY_CLIENT", `Client viewed invoice online`, "Client");
    } catch (err) {
      console.error("Error recording client view:", err);
    }
  }

  // --- PAYMENTS -------------------------------------------------------------
  public static async getPayments(invoiceId?: string): Promise<Payment[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, where, orderBy } = await import("firebase/firestore");
      let q = query(collection(db, "payments"), orderBy("createdAt", "desc"));
      if (invoiceId) {
        q = query(collection(db, "payments"), where("invoiceId", "==", invoiceId), orderBy("createdAt", "desc"));
      }
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));
    } catch (err) {
      console.error("Error fetching payments:", err);
      return [];
    }
  }

  /**
   * Record a payment against an invoice
   */
  public static async recordPayment(
    paymentData: Omit<Payment, "id" | "createdAt" | "createdBy">,
    userEmail: string
  ): Promise<Payment> {
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");

    const invoice = await this.getInvoiceById(paymentData.invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    if (paymentData.amount <= 0) {
      throw new Error("Payment amount must be greater than zero");
    }

    const newAmountPaid = (invoice.amountPaid || 0) + paymentData.amount;
    if (newAmountPaid > invoice.total + 0.01) {
      throw new Error(`Payment amount (${paymentData.amount}) exceeds remaining balance (${invoice.balanceDue})`);
    }

    const paymentId = `pay_${Date.now()}`;
    const now = new Date().toISOString();

    const newPayment: Payment = {
      ...paymentData,
      id: paymentId,
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      createdBy: userEmail,
      createdAt: now,
      syncStatus: "PENDING"
    };

    await setDoc(doc(db, "payments", paymentId), newPayment);

    // Update invoice balance and status
    const newBalance = Math.max(0, invoice.total - newAmountPaid);
    let newStatus: InvoiceStatus = invoice.status;
    if (newBalance === 0) newStatus = "PAID";
    else if (newAmountPaid > 0) newStatus = "PARTIALLY_PAID";

    await this.updateInvoice(invoice.id, {
      amountPaid: newAmountPaid,
      balanceDue: newBalance,
      status: newStatus
    }, userEmail);

    await this.logActivity(
      invoice.id, 
      "PAYMENT_RECORDED", 
      `Recorded payment of BDT ${paymentData.amount.toLocaleString()} via ${paymentData.paymentMethod}`, 
      userEmail
    );

    // Sync to Google Sheets
    const settings = await this.getSettings();
    if (settings.googleSheets.autoSync) {
      GoogleSheetsService.syncPayment(newPayment, settings.googleSheets.webhookUrl).catch(console.error);
    }

    return newPayment;
  }

  // --- AUDIT LOGS -----------------------------------------------------------
  public static async logActivity(
    invoiceId: string, 
    action: ActivityLog["action"], 
    details: string, 
    userEmail: string
  ): Promise<void> {
    try {
      const db = await getDb();
      const { doc, setDoc } = await import("firebase/firestore");
      const logId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const log = {
        id: logId,
        invoiceId,
        action,
        module: "finance",
        userEmail: userEmail || "admin@motionly.media",
        userName: userEmail ? userEmail.split("@")[0] : "Admin",
        targetName: details,
        details,
        timestamp: new Date().toISOString()
      };
      await setDoc(doc(db, "activity_logs", logId), log);
    } catch (err) {
      console.error("Failed to write activity log:", err);
    }
  }

  public static async getActivityLogs(invoiceId: string): Promise<ActivityLog[]> {
    try {
      const db = await getDb();
      const { collection, getDocs, query, where, orderBy } = await import("firebase/firestore");
      const q = query(collection(db, "activity_logs"), where("invoiceId", "==", invoiceId), orderBy("timestamp", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog));
    } catch (err) {
      console.error("Error fetching activity logs:", err);
      return [];
    }
  }

  // --- SEED SAMPLE DATA -----------------------------------------------------
  public static async seedSampleData(userEmail: string): Promise<void> {
    // 1. Create Default Services if none exist
    const services = await this.getServices();
    if (services.length === 0) {
      await this.createService({
        name: "cinematographer 1 production day",
        description: "Full day high-end video shooting with professional equipment",
        defaultRate: 5000,
        unit: "Day",
        category: "Production",
        active: true
      });
      await this.createService({
        name: "long form Video",
        description: "High-impact video editing and post-production",
        defaultRate: 1500,
        unit: "Video",
        category: "Post-Production",
        active: true
      });
      await this.createService({
        name: "Short form Video ( Reels )",
        description: "Reels / TikTok / Shorts editing with dynamic motion graphics",
        defaultRate: 1100,
        unit: "Video",
        category: "Social Media",
        active: true
      });
      await this.createService({
        name: "Content planning + SEO",
        description: "Strategic content plan and YouTube video optimization",
        defaultRate: 1500,
        unit: "Package",
        category: "Marketing",
        active: true
      });
    }

    // 2. Create Sample Client if none exist
    const clients = await this.getClients();
    let client = clients.find(c => c.name.toLowerCase().includes("afjal"));
    if (!client) {
      client = await this.createClient({
        name: "Mohammed Afjal Hossein",
        company: "Afjal Tech Solutions",
        email: "afjal.hossein@example.com",
        phone: "+880 1812-345678",
        address: "Banani, Dhaka - 1213, Bangladesh",
        taxVatInfo: "VAT-998877",
        notes: "Key client for video production."
      });
    }

    // 3. Upsert Sample Invoice #00121
    const db = await getDb();
    const { doc, setDoc } = await import("firebase/firestore");
    const demoInvId = "inv_demo_00121";

    const demoInvoice: Invoice = {
      id: demoInvId,
      invoiceNumber: "#00121",
      clientId: client ? client.id : "cli_demo_afjal",
      clientName: "Mohammed Afjal Hossein",
      clientCompany: "Afjal Tech Solutions",
      clientEmail: "afjal.hossein@example.com",
      clientPhone: "+880 1812-345678",
      clientAddress: "Banani, Dhaka - 1213, Bangladesh",
      clientTaxVatInfo: "VAT-998877",
      issueDate: "2026-09-05",
      dueDate: "2026-09-08",
      paymentTerms: "Due upon receipt",
      currency: "BDT",
      items: [
        {
          id: "item_1",
          description: "cinematographer 1 production day",
          quantity: 1,
          unit: "Day",
          rate: 5000,
          discount: 0,
          amount: 5000
        },
        {
          id: "item_2",
          description: "long form Video",
          quantity: 1,
          unit: "Video",
          rate: 1500,
          discount: 0,
          amount: 1500
        },
        {
          id: "item_3",
          description: "Short form Video ( Reels )",
          quantity: 2,
          unit: "Videos",
          rate: 1100,
          discount: 0,
          amount: 2200
        },
        {
          id: "item_4",
          description: "Content planning + SEO",
          quantity: 1,
          unit: "Package",
          rate: 1500,
          discount: 0,
          amount: 1500
        }
      ],
      subtotal: 10200,
      discount: 0,
      taxPercent: 0,
      taxAmount: 0,
      advanceAmount: 10000,
      total: 10200,
      amountPaid: 0,
      balanceDue: 200,
      status: "PARTIALLY_PAID",
      publicToken: "pub_demo_00121_token",
      notes: "Bank information ( Authorized payment account of Motionly )\nUCB\nAccount Name: Nazmul Hossen Shuvo\nAccount number : 1583201001229020\nBranch : Katgor\nRouting number : 245154090",
      termsOverride: "Payment is due according to the agreed payment terms. Project delivery timelines may vary depending on feedback and required revisions.",
      googleSheetSyncStatus: "SYNCED",
      createdBy: userEmail || "admin@motionly.media",
      createdAt: "2026-09-05T10:00:00.000Z",
      updatedAt: new Date().toISOString()
    };

    await setDoc(doc(db, "invoices", demoInvId), demoInvoice);
  }
}
