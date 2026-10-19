import type { Invoice, Payment, Client, SavedService, SyncStatus } from "../../types/finance";

const SPREADSHEET_ID = "1ykMwwRRI9nZIEfL98lg1QYcUDz_vckTiLyaDOwXZ0zU";

export const DEFAULT_APPS_SCRIPT_CODE = `/**
 * Motionly Media - Google Sheets Synchronization Web App
 * Paste this script in Google Sheets: Extensions -> Apps Script
 * Click Deploy -> New deployment -> Select type: Web app
 * Execute as: Me
 * Who has access: Anyone
 * Copy the Web App URL and paste it into Motionly Finance Settings.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "syncInvoice") {
      return syncInvoiceRow(ss, data.invoice);
    } else if (action === "syncPayment") {
      return syncPaymentRow(ss, data.payment);
    } else if (action === "syncClient") {
      return syncClientRow(ss, data.client);
    } else if (action === "syncService") {
      return syncServiceRow(ss, data.service);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function syncInvoiceRow(ss, inv) {
  var sheet = getOrCreateSheet(ss, "Invoices", [
    "Invoice ID", "Invoice Number", "Client ID", "Client Name", "Company", 
    "Issue Date", "Due Date", "Subtotal", "Discount", "Tax", 
    "Advance", "Total", "Amount Paid", "Balance Due", "Currency", 
    "Status", "Created By", "Created At", "Updated At"
  ]);

  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(inv.id) || String(data[i][1]) === String(inv.invoiceNumber)) {
      rowIndex = i + 1;
      break;
    }
  }

  var row = [
    inv.id,
    inv.invoiceNumber,
    inv.clientId,
    inv.clientName,
    inv.clientCompany || "",
    inv.issueDate,
    inv.dueDate,
    inv.subtotal,
    inv.discount,
    inv.taxAmount,
    inv.advanceAmount,
    inv.total,
    inv.amountPaid,
    inv.balanceDue,
    inv.currency || "BDT",
    inv.status,
    inv.createdBy || "",
    inv.createdAt,
    new Date().toISOString()
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "syncInvoice", invoiceId: inv.id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function syncPaymentRow(ss, pay) {
  var sheet = getOrCreateSheet(ss, "Payments", [
    "Payment ID", "Invoice ID", "Invoice Number", "Client", 
    "Date", "Amount", "Method", "Transaction Reference", "Note", "Recorded By"
  ]);

  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(pay.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  var row = [
    pay.id,
    pay.invoiceId,
    pay.invoiceNumber,
    pay.clientName || "",
    pay.paymentDate,
    pay.amount,
    pay.paymentMethod,
    pay.transactionReference || "",
    pay.note || "",
    pay.createdBy || ""
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "syncPayment", paymentId: pay.id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function syncClientRow(ss, client) {
  var sheet = getOrCreateSheet(ss, "Clients", [
    "Client ID", "Name", "Company", "Email", "Phone", "Address", "Created At"
  ]);
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(client.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  var row = [client.id, client.name, client.company || "", client.email, client.phone || "", client.address || "", client.createdAt];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function syncServiceRow(ss, service) {
  var sheet = getOrCreateSheet(ss, "Services", [
    "Service ID", "Service Name", "Category", "Default Rate", "Unit", "Active"
  ]);
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(service.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  var row = [service.id, service.name, service.category || "", service.defaultRate, service.unit || "", service.active];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F1F5F9");
  }
  return sheet;
}
`;

export interface SyncResult {
  success: boolean;
  status: SyncStatus;
  message?: string;
  timestamp: string;
}

export class GoogleSheetsService {
  private static webhookUrl: string = "https://script.google.com/macros/s/AKfycbxnPYIXiFdBtZ3z3LSAqGrVY4oKpstOSMgdzEKBjTbsTj204YPqoZA2SwYgAr8iN6tLmQ/exec";

  public static setWebhookUrl(url: string) {
    this.webhookUrl = url.trim();
  }

  public static getSpreadsheetId(): string {
    return SPREADSHEET_ID;
  }

  public static getSpreadsheetUrl(): string {
    return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?usp=sharing`;
  }

  private static async sendToWebhook(targetUrl: string, payload: any): Promise<boolean> {
    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });
      return response.ok || response.type === "opaque" || response.status === 200;
    } catch {
      try {
        await fetch(targetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload)
        });
        return true;
      } catch (err) {
        console.error("Google Sheets Webhook Error:", err);
        return false;
      }
    }
  }

  /**
   * Synchronize an invoice to Google Sheets
   */
  public static async syncInvoice(invoice: Invoice, webhookUrl?: string): Promise<SyncResult> {
    const targetUrl = (webhookUrl || this.webhookUrl)?.trim();
    const now = new Date().toISOString();

    if (!targetUrl) {
      return {
        success: false,
        status: "PENDING",
        message: "Google Sheets Web App URL not set. Please add your Apps Script Web App URL in Finance Settings -> Google Sheets tab.",
        timestamp: now
      };
    }

    const success = await this.sendToWebhook(targetUrl, {
      action: "syncInvoice",
      spreadsheetId: SPREADSHEET_ID,
      invoice
    });

    return {
      success,
      status: success ? "SYNCED" : "FAILED",
      message: success 
        ? "Successfully synchronized to Google Sheets" 
        : "Unable to reach Google Sheets. Please ensure your Apps Script is deployed as Web App (Anyone access).",
      timestamp: now
    };
  }

  /**
   * Synchronize a payment record to Google Sheets
   */
  public static async syncPayment(payment: Payment, webhookUrl?: string): Promise<SyncResult> {
    const targetUrl = (webhookUrl || this.webhookUrl)?.trim();
    const now = new Date().toISOString();

    if (!targetUrl) {
      return {
        success: false,
        status: "PENDING",
        message: "Google Sheets Web App URL not configured",
        timestamp: now
      };
    }

    const success = await this.sendToWebhook(targetUrl, {
      action: "syncPayment",
      spreadsheetId: SPREADSHEET_ID,
      payment
    });

    return {
      success,
      status: success ? "SYNCED" : "FAILED",
      message: success ? "Payment synced to Google Sheets" : "Failed to sync payment to Google Sheets",
      timestamp: now
    };
  }

  /**
   * Synchronize a client to Google Sheets
   */
  public static async syncClient(client: Client, webhookUrl?: string): Promise<SyncResult> {
    const targetUrl = (webhookUrl || this.webhookUrl)?.trim();
    const now = new Date().toISOString();

    if (!targetUrl) return { success: false, status: "PENDING", timestamp: now };

    const success = await this.sendToWebhook(targetUrl, { action: "syncClient", client });
    return { success, status: success ? "SYNCED" : "FAILED", timestamp: now };
  }

  /**
   * Synchronize a service to Google Sheets
   */
  public static async syncService(service: SavedService, webhookUrl?: string): Promise<SyncResult> {
    const targetUrl = (webhookUrl || this.webhookUrl)?.trim();
    const now = new Date().toISOString();

    if (!targetUrl) return { success: false, status: "PENDING", timestamp: now };

    const success = await this.sendToWebhook(targetUrl, { action: "syncService", service });
    return { success, status: success ? "SYNCED" : "FAILED", timestamp: now };
  }
}
