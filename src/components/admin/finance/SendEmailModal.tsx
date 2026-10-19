import React, { useState, useEffect } from "react";
import type { Invoice } from "../../../types/finance";
import { EmailService } from "../../../lib/services/emailService";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminModal, AdminButton, AdminInput, AdminTextarea } from "../ui/AdminUI";
import { Mail, Send, CheckCircle2 } from "lucide-react";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  userEmail: string;
  onSuccess: () => void;
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  invoice,
  userEmail,
  onSuccess
}) => {
  const [recipient, setRecipient] = useState(invoice.clientEmail || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const publicUrl = `${window.location.origin}/invoice/${invoice.id}/${invoice.publicToken}`;

  useEffect(() => {
    if (invoice) {
      const formatted = EmailService.generateDefaultEmailBody(invoice, publicUrl);
      setSubject(formatted.subject);
      setBody(formatted.body);
      setRecipient(invoice.clientEmail || "");
    }
  }, [invoice]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await EmailService.sendInvoiceEmail(invoice, recipient, subject, body, publicUrl);

      // Update status to SENT if draft
      if (invoice.status === "DRAFT") {
        await FinanceService.updateInvoice(invoice.id, { status: "SENT" }, userEmail);
      } else {
        await FinanceService.logActivity(invoice.id, "SENT", `Invoice emailed to ${recipient}`, userEmail);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={`Send Invoice ${invoice.invoiceNumber}`}>
      <form onSubmit={handleSend} className="space-y-6">
        <AdminInput
          label="Recipient Email"
          type="email"
          value={recipient}
          onChange={(e: any) => setRecipient(e.target.value)}
          required
        />

        <AdminInput
          label="Email Subject"
          value={subject}
          onChange={(e: any) => setSubject(e.target.value)}
          required
        />

        <AdminTextarea
          label="Message Body"
          rows={8}
          value={body}
          onChange={(e: any) => setBody(e.target.value)}
          required
        />

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between text-xs text-blue-800">
          <span className="font-semibold">Client Link Included:</span>
          <span className="font-mono text-[11px] truncate max-w-xs">{publicUrl}</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <AdminButton variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </AdminButton>
          <AdminButton type="submit" loading={loading} variant="primary">
            <Send className="w-4 h-4 mr-2 inline" />
            Send Email
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
