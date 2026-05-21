'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, title, message, onClose, duration = 5000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for exit animation
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed top-16 md:top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
    <div
      className={`flex items-start gap-3 max-w-lg w-full rounded-2xl shadow-2xl p-4 pr-5 border pointer-events-auto ${
        isSuccess
          ? 'bg-white border-[#0EA5E9]/30 shadow-[#0EA5E9]/10'
          : 'bg-white border-red-200 shadow-red-100'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
          isSuccess ? 'bg-[#0EA5E9]/10' : 'bg-red-50'
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-[#0EA5E9]" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm ${isSuccess ? 'text-[#0B192C]' : 'text-red-700'}`}>
          {title}
        </p>
        <p className="text-slate-500 text-sm mt-0.5 leading-snug">{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
    </div>
  );
}
