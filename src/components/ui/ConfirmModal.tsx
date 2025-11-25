import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const config = {
    danger: {
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconBorder: 'rgba(239, 68, 68, 0.3)',
      iconColor: '#EF4444',
      confirmBg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      confirmShadow: 'rgba(239, 68, 68, 0.3)',
    },
    warning: {
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconBorder: 'rgba(245, 158, 11, 0.3)',
      iconColor: '#F59E0B',
      confirmBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      confirmShadow: 'rgba(245, 158, 11, 0.3)',
    },
    info: {
      iconBg: 'rgba(59, 130, 246, 0.15)',
      iconBorder: 'rgba(59, 130, 246, 0.3)',
      iconColor: '#3B82F6',
      confirmBg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      confirmShadow: 'rgba(59, 130, 246, 0.3)',
    },
  };

  const currentConfig = config[type];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div style={{ padding: '32px 28px' }}>
          {/* Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            background: currentConfig.iconBg,
            border: `2px solid ${currentConfig.iconBorder}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <AlertTriangle size={32} color={currentConfig.iconColor} />
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#F9FAFB',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            {title}
          </h2>

          {/* Message */}
          <p style={{
            fontSize: '15px',
            color: '#9CA3AF',
            textAlign: 'center',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            {message}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#F3F4F6',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                flex: 1,
                padding: '14px',
                background: currentConfig.confirmBg,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: `0 4px 12px ${currentConfig.confirmShadow}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${currentConfig.confirmShadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${currentConfig.confirmShadow}`;
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}