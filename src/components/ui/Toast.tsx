import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    error: {
      icon: XCircle,
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.3)',
    },
    warning: {
      icon: AlertCircle,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      bg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.3)',
    },
    info: {
      icon: Info,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      bg: 'rgba(59, 130, 246, 0.15)',
      border: 'rgba(59, 130, 246, 0.3)',
    },
  };

  const { icon: Icon, gradient, bg, border } = config[type];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(31, 41, 55, 0.95)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${border}`,
      borderRadius: '14px',
      padding: '16px 20px',
      minWidth: '320px',
      maxWidth: '500px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.3s ease-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        background: gradient,
        animation: `shrink ${duration}ms linear`,
        width: '100%'
      }}></div>

      {/* Icon */}
      <div style={{
        width: '40px',
        height: '40px',
        background: bg,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: `1px solid ${border}`
      }}>
        <Icon size={22} style={{ 
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }} />
      </div>

      {/* Message */}
      <p style={{
        flex: 1,
        color: '#F3F4F6',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.5'
      }}>
        {message}
      </p>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: 'none',
          borderRadius: '8px',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          flexShrink: 0
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
      >
        <X size={16} color="#9CA3AF" />
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
