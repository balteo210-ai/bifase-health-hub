import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Invoice, generateInvoicePDF } from '@/lib/invoices';

interface InvoicesSectionProps {
  invoices: Invoice[];
}

const InvoicesSection = ({ invoices }: InvoicesSectionProps) => {
  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
        <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
        <p className="text-muted-foreground">Nessuna fattura disponibile</p>
        <p className="mt-1 text-xs text-muted-foreground">Le fatture verranno generate automaticamente dopo ogni pagamento</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice, i) => (
        <motion.div
          key={invoice.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-display font-semibold text-foreground">{invoice.invoiceNumber}</span>
                <Badge variant="secondary" className="rounded-full text-xs bg-success/10 text-success">Pagata</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{invoice.serviceName} — {invoice.providerName}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(invoice.date), 'd MMMM yyyy', { locale: it })}
              </p>
              <p className="mt-1 text-sm font-medium text-primary">€{invoice.total.toFixed(2)}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1"
              onClick={() => generateInvoicePDF(invoice)}
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InvoicesSection;
