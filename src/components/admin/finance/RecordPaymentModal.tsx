import React, { useState } from "react";
import type { Invoice, PaymentMethod } from "../../../types/finance";
import { FinanceService } from "../../../lib/services/financeService";
import { AdminModal, AdminButton, AdminInput, AdminTextarea } from "../ui/AdminUI";
import { DollarSign, Calendar, CreditCard, FileText } from "lucide-react";

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  userEmail: string;
  onSuccess: () => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  userEmail,
  onSuccess
}) => {
  const [amount, setAmount] = useState<number>(invoice.balanceDue || 0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Bank Transfer");
  const [transactionReference, setTransactionReference] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (amount <= 0) {
      setError("Payment amount must be greater than zero.");
      return;
    }

    if (amount > invoice.balanceDue + 0.01) {
      setError(`Payment amount cannot exceed balance due (${invoice.currency} ${invoice.balanceDue.toLocaleString()}).`);
      return;
    }

    setLoading(true);
    try {
      await FinanceService.recordPayment({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.clientName,
        amount,
        paymentMethod,
        transactionReference,
        paymentDate,
        note
      }, userEmail);

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to record payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={`Record Payment for ${invoice.invoiceNumber}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl">
            {error}
          </div>
        )}

        {/* Invoice Summary Banner */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Client</p>
            <p className="text-sm font-black text-slate-900">{invoice.clientName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Remaining Balance</p>
            <p className="text-base font-black text-blue-600">{invoice.currency} {invoice.balanceDue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminInput
            label="Payment Amount"
            type="number"
            step="any"
            value={amount}
            onChange={(e: any) => setAmount(parseFloat(e.target.value) || 0)}
            required
          />

          <div className="space-y-1.5 w-full">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 w-full">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 transition-all"
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="bKash">bKash</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <AdminInput
            label="Transaction Reference / TRX ID"
            placeholder="e.g. TRX-9928172"
            value={transactionReference}
            onChange={(e: any) => setTransactionReference(e.target.value)}
          />
        </div>

        <AdminTextarea
          label="Payment Note / Description"
          placeholder="e.g. Advance payment via bKash"
          rows={3}
          value={note}
          onChange={(e: any) => setNote(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <AdminButton variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </AdminButton>
          <AdminButton type="submit" loading={loading} variant="primary">
            Record Payment
          </AdminButton>
        </div>
      </form>
    </AdminModal>
  );
};
