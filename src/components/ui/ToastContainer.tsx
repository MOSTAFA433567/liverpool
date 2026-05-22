import { useToastStore } from '../../store/useToastStore';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-md border animate-[slideIn_0.3s_ease-out] shadow-2xl transition-all ${
              isSuccess ? 'bg-success/20 border-success/50 text-success' :
              isError ? 'bg-error/20 border-error/50 text-error' :
              'bg-primary/20 border-primary/50 text-primary-container'
            }`}
          >
            {isSuccess ? <CheckCircle className="w-6 h-6 shrink-0" /> :
             isError ? <XCircle className="w-6 h-6 shrink-0" /> :
             <Info className="w-6 h-6 shrink-0" />}
            
            <div className="flex-1 font-headline font-bold mt-0.5">
              {toast.message}
            </div>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
