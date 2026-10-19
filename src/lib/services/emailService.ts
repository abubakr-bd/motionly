import type { Invoice } from "../../types/finance";

export interface EmailSendResult {
  success: boolean;
  message: string;
  sentAt: string;
}

export class EmailService {
  /**
   * Generates default email body for invoice sending
   */
  public static generateDefaultEmailBody(invoice: Invoice, publicUrl: string): { subject: string; body: string } {
    const subject = `Invoice ${invoice.invoiceNumber} from Motionly Media`;
    const body = `Dear ${invoice.clientName},

Thank you for choosing Motionly Media.

Please find the details of invoice ${invoice.invoiceNumber} below:

- Invoice Number: ${invoice.invoiceNumber}
- Total Amount: ${invoice.currency} ${invoice.total.toLocaleString()}
- Balance Due: ${invoice.currency} ${invoice.balanceDue.toLocaleString()}
- Due Date: ${invoice.dueDate}

You can view your invoice and payment instructions online at:
${publicUrl}

If you have any questions, feel free to reply to this email.

Best regards,
Motionly Media Finance Team
motionlymedia.help@gmail.com
https://motionlymedia.com`;

    return { subject, body };
  }

  /**
   * Send invoice via client mailto fallback or custom email integration API endpoint
   */
  public static async sendInvoiceEmail(
    invoice: Invoice,
    recipientEmail: string,
    subject: string,
    body: string,
    _publicUrl: string
  ): Promise<EmailSendResult> {
    const now = new Date().toISOString();

    try {
      // Create mailto fallback link for immediate execution in client environment
      const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open default mail client if available
      window.location.href = mailtoUrl;

      return {
        success: true,
        message: `Invoice email prepared for ${recipientEmail}`,
        sentAt: now
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Failed to trigger email",
        sentAt: now
      };
    }
  }
}
