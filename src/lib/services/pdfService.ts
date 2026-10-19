import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Invoice, FinanceCompanyInfo, FinanceBankInfo, InvoiceBranding } from "../../types/finance";

export class PDFService {
  /**
   * Generates and downloads a clean A4 PDF of the invoice directly from a DOM element reference
   */
  public static async generateInvoicePDFFromElement(
    element: HTMLElement,
    filename: string
  ): Promise<boolean> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution crisp text
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First Page
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;

      // Subsequent Pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pdfHeight;
      }

      pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
      return true;
    } catch (err) {
      console.error("PDF Generation Error:", err);
      return false;
    }
  }

  /**
   * Generates and downloads a clean, high-resolution PNG image of the invoice
   */
  public static async generateInvoicePNGFromElement(
    element: HTMLElement,
    filename: string
  ): Promise<boolean> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution crisp image
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (err) {
      console.error("PNG Generation Error:", err);
      return false;
    }
  }

  /**
   * Fallback programmatically constructed PDF generator using jsPDF vector API
   */
  public static generateProgrammaticPDF(
    invoice: Invoice,
    company: FinanceCompanyInfo,
    _bank: FinanceBankInfo,
    _branding?: InvoiceBranding
  ) {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pw = doc.internal.pageSize.getWidth();
    let y = 15;

    // Header
    doc.setFillColor(37, 99, 235); // Motionly Blue
    doc.rect(15, y, 12, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("M", 18.5, y + 8.5);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(18);
    doc.text(company.companyName || "MOTIONLY MEDIA", 32, y + 8);

    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("INVOICE", pw - 15, y + 8, { align: "right" });

    y += 20;

    // Meta bar
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 15, y);
    doc.text(`Issue Date: ${invoice.issueDate}`, 70, y);
    doc.text(`Due Date: ${invoice.dueDate}`, 125, y);
    doc.text(`Status: ${invoice.status}`, pw - 15, y, { align: "right" });

    y += 10;
    doc.setDrawColor(226, 232, 240);
    doc.line(15, y, pw - 15, y);

    y += 10;

    // Client info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("BILLED TO:", 15, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(invoice.clientName, 15, y);
    if (invoice.clientCompany) {
      y += 5;
      doc.text(invoice.clientCompany, 15, y);
    }
    if (invoice.clientEmail) {
      y += 5;
      doc.text(invoice.clientEmail, 15, y);
    }

    y += 15;

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(15, y, pw - 30, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("DESCRIPTION", 18, y + 5.5);
    doc.text("QTY", 120, y + 5.5, { align: "center" });
    doc.text("RATE", 150, y + 5.5, { align: "right" });
    doc.text("AMOUNT", pw - 18, y + 5.5, { align: "right" });

    y += 10;

    // Table Rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    invoice.items.forEach((item) => {
      doc.text(item.description, 18, y);
      doc.text(`${item.quantity} ${item.unit || ""}`, 120, y, { align: "center" });
      doc.text(`${invoice.currency} ${item.rate.toLocaleString()}`, 150, y, { align: "right" });
      doc.text(`${invoice.currency} ${item.amount.toLocaleString()}`, pw - 18, y, { align: "right" });
      y += 8;
    });

    y += 5;
    doc.line(15, y, pw - 15, y);
    y += 10;

    // Totals
    const rightX = pw - 18;
    const subtotal = invoice.subtotal || 0;
    const discount = invoice.discount || 0;
    const advance = invoice.advanceAmount || 0;
    const paid = invoice.amountPaid || 0;
    const tax = invoice.taxAmount || 0;
    const calculatedTotal = Math.max(0, subtotal - discount + tax);
    const calculatedBalance = Math.max(0, calculatedTotal - advance - paid);

    doc.setFontSize(9);
    doc.text(`Subtotal: ${invoice.currency} ${subtotal.toLocaleString()}`, rightX, y, { align: "right" });
    y += 5;

    if (discount > 0) {
      doc.text(`Discount: -${invoice.currency} ${discount.toLocaleString()}`, rightX, y, { align: "right" });
      y += 5;
    }

    if (tax > 0) {
      doc.text(`Tax: +${invoice.currency} ${tax.toLocaleString()}`, rightX, y, { align: "right" });
      y += 5;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(`TOTAL: ${invoice.currency} ${calculatedTotal.toLocaleString()}`, rightX, y, { align: "right" });
    y += 6;

    if (advance > 0) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(37, 99, 235);
      doc.text(`Advance Received: -${invoice.currency} ${advance.toLocaleString()}`, rightX, y, { align: "right" });
      y += 5;
    }

    if (paid > 0) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(16, 185, 129);
      doc.text(`Amount Paid: -${invoice.currency} ${paid.toLocaleString()}`, rightX, y, { align: "right" });
      y += 5;
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`Balance Due: ${invoice.currency} ${calculatedBalance.toLocaleString()}`, rightX, y, { align: "right" });

    doc.save(`${invoice.invoiceNumber.replace("#", "Invoice_")}.pdf`);
  }
}
