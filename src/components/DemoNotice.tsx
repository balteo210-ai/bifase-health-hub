import { AlertCircle } from 'lucide-react';

const DemoNotice = ({ className = '' }: { className?: string }) => (
  <div
    className={`flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2 text-xs text-primary ${className}`}
    role="note"
  >
    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
    <span>
      Funzionalità dimostrativa del MVP Capstone Project. Non inserire dati personali, sanitari o
      sensibili.
    </span>
  </div>
);

export default DemoNotice;
