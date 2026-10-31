import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Reusable Feedback Modal for Alerts & Confirmations
 * Replaces window.alert() and window.confirm() with a clean, branded UI.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info', // 'info' | 'success' | 'warning' | 'error' | 'confirm'
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  danger = false
}) {
  if (!isOpen) return null;

  var isConfirmType = type === 'confirm' || Boolean(onConfirm);

  var getIcon = function () {
    switch (type) {
      case 'success':
        return <CheckCircle size={28} color="#16a34a" />;
      case 'warning':
      case 'confirm':
        return <AlertTriangle size={28} color={danger ? '#dc2626' : '#d97706'} />;
      case 'error':
        return <AlertCircle size={28} color="#dc2626" />;
      default:
        return <Info size={28} color="#2563eb" />;
    }
  };

  var getHeaderBg = function () {
    switch (type) {
      case 'success':
        return '#f0fdf4';
      case 'warning':
        return '#fffbeb';
      case 'error':
        return '#fef2f2';
      case 'confirm':
        return danger ? '#fef2f2' : '#f0fdf4';
      default:
        return '#eff6ff';
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        className="modal-content"
        onClick={function (e) { e.stopPropagation(); }}
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          background: 'var(--bg-card)',
          position: 'relative',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex',
            padding: '4px',
            borderRadius: '6px'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header with Icon and Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          <div
            style={{
              background: getHeaderBg(),
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {getIcon()}
          </div>
          <div style={{ flex: 1, paddingTop: '2px' }}>
            {title && (
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-heading)' }}>
                {title}
              </h3>
            )}
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
          {isConfirmType && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontSize: '0.9rem', padding: '8px 16px', borderRadius: '8px' }}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            className="btn"
            onClick={function () {
              if (onConfirm) onConfirm();
              onClose();
            }}
            style={{
              fontSize: '0.9rem',
              padding: '8px 18px',
              borderRadius: '8px',
              backgroundColor: danger ? '#dc2626' : 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

