import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export function ToastContainer() {
  const { toasts, removeToast } = useNotification();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#2F7D4A]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#E5A72B]" />,
    error: <AlertCircle className="w-5 h-5 text-[#D9534F]" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="pointer-events-auto flex items-center justify-between p-4 bg-white dark:bg-[#172019] rounded-2xl shadow-elevated border border-stone-200 dark:border-stone-800 text-sm font-medium"
          >
            <div className="flex items-center gap-3">
              {icons[toast.type] || icons.info}
              <span className="text-[#172019] dark:text-stone-100">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
