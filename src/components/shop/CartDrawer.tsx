import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-450px',
          width: '100%',
          maxWidth: '450px',
          height: '100vh',
          background: 'rgba(10, 14, 39, 0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(102, 126, 234, 0.2)',
          zIndex: 1001,
          transition: 'right 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isOpen ? '-10px 0 30px rgba(0, 0, 0, 0.5)' : 'none'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={20} color="white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#F9FAFB'
              }}>
                Mi Carrito
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#9CA3AF'
              }}>
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.15)';
              target.style.borderColor = '#EF4444';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(255, 255, 255, 0.05)';
              target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }}
          >
            <X size={20} color="#F3F4F6" />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={40} color="#667EEA" />
              </div>
              <p style={{
                fontSize: '16px',
                color: '#9CA3AF',
                textAlign: 'center'
              }}>
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(26, 31, 58, 0.7)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    gap: '16px'
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}>
                    <img
                      src={item.image_url || 'https://via.placeholder.com/80'}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#F9FAFB',
                      lineHeight: '1.4'
                    }}>
                      {item.name}
                    </h3>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: '10px',
                        padding: '4px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.background = 'rgba(102, 126, 234, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.currentTarget as HTMLElement;
                            target.style.background = 'rgba(102, 126, 234, 0.1)';
                          }}
                        >
                          <Minus size={16} color="#667EEA" />
                        </button>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#F9FAFB',
                          minWidth: '30px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          style={{
                            width: '32px',
                            height: '32px',
                            background: item.quantity >= item.stock ? 'rgba(107, 114, 128, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            opacity: item.quantity >= item.stock ? 0.5 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (item.quantity < item.stock) {
                              const target = e.currentTarget as HTMLElement;
                              target.style.background = 'rgba(102, 126, 234, 0.2)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (item.quantity < item.stock) {
                              const target = e.currentTarget as HTMLElement;
                              target.style.background = 'rgba(102, 126, 234, 0.1)';
                            }
                          }}
                        >
                          <Plus size={16} color="#667EEA" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(239, 68, 68, 0.2)';
                          target.style.borderColor = '#EF4444';
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(239, 68, 68, 0.1)';
                          target.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                        }}
                      >
                        <Trash2 size={16} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  style={{
                    padding: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    color: '#EF4444',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                >
                  Vaciar Carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid rgba(102, 126, 234, 0.2)',
            background: 'rgba(10, 14, 39, 0.98)'
          }}>
            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#9CA3AF'
              }}>
                Total:
              </span>
              <span style={{
                fontSize: '32px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleCheckout}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                Proceder al Pago
              </button>
              <button
                onClick={handleViewCart}
                style={{
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  color: '#F3F4F6',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(102, 126, 234, 0.15)';
                  target.style.borderColor = '#667EEA';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(255, 255, 255, 0.05)';
                  target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                }}
              >
                Ver Carrito Completo
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}