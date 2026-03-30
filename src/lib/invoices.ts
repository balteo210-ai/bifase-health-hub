// Invoice types and utilities for Bifase
import { Appointment } from './store';

export interface Invoice {
  id: string;
  appointmentId: string;
  invoiceNumber: string;
  date: string;
  serviceName: string;
  providerName: string;
  location: string;
  price: number;
  commission: number;
  total: number;
  status: 'paid';
  customerName: string;
  customerEmail: string;
}

let invoiceCounter = 1;

export function createInvoice(appointment: Appointment, customerName: string, customerEmail: string): Invoice {
  const num = invoiceCounter++;
  return {
    id: `inv-${Date.now()}`,
    appointmentId: appointment.id,
    invoiceNumber: `BIF-${new Date().getFullYear()}-${String(num).padStart(4, '0')}`,
    date: new Date().toISOString().split('T')[0],
    serviceName: appointment.serviceName,
    providerName: appointment.providerName,
    location: appointment.location,
    price: appointment.price,
    commission: appointment.commission,
    total: appointment.price,
    status: 'paid',
    customerName,
    customerEmail,
  };
}

export function generateInvoicePDF(invoice: Invoice): void {
  // Create a printable HTML invoice and trigger print/save as PDF
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Fattura ${invoice.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #00a3a3; padding-bottom: 20px; }
    .logo { font-size: 28px; font-weight: 800; color: #00a3a3; }
    .logo span { color: #1a1a2e; }
    .invoice-meta { text-align: right; }
    .invoice-meta h2 { font-size: 24px; color: #00a3a3; margin-bottom: 8px; }
    .invoice-meta p { font-size: 13px; color: #666; }
    .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .party h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
    .party p { font-size: 14px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #f5f5f5; text-align: left; padding: 12px 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #666; border-bottom: 2px solid #e0e0e0; }
    td { padding: 14px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
    .total-row td { font-weight: 700; font-size: 16px; border-top: 2px solid #1a1a2e; border-bottom: none; }
    .total-row td:last-child { color: #00a3a3; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999; }
    .badge { display: inline-block; background: #e8f8f5; color: #00a3a3; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Bi<span>fase</span></div>
    <div class="invoice-meta">
      <h2>FATTURA</h2>
      <p><strong>${invoice.invoiceNumber}</strong></p>
      <p>Data: ${new Date(invoice.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <p><span class="badge">Pagata</span></p>
    </div>
  </div>
  <div class="parties">
    <div class="party">
      <h3>Fornitore</h3>
      <p><strong>${invoice.providerName}</strong><br>${invoice.location}</p>
    </div>
    <div class="party" style="text-align:right">
      <h3>Cliente</h3>
      <p><strong>${invoice.customerName}</strong><br>${invoice.customerEmail}</p>
    </div>
  </div>
  <table>
    <thead><tr><th>Descrizione</th><th>Dettaglio</th><th style="text-align:right">Importo</th></tr></thead>
    <tbody>
      <tr><td>${invoice.serviceName}</td><td>${invoice.providerName} — ${invoice.location}</td><td style="text-align:right">€${invoice.price.toFixed(2)}</td></tr>
      <tr class="total-row"><td colspan="2">Totale</td><td style="text-align:right">€${invoice.total.toFixed(2)}</td></tr>
    </tbody>
  </table>
  <div class="footer">
    <p>Bifase S.r.l. — P.IVA 00000000000 — bifase@pec.it</p>
    <p style="margin-top:4px">Documento generato automaticamente</p>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }
}
