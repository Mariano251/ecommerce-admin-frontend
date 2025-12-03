import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px'
          }}>
            <ShoppingBag size={60} color="#667EEA" />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#F9FAFB',
            marginBottom: '16px'
          }}>
            Tu carrito está vacío
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9CA3AF',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Parece que aún no has agregado ningún producto. ¡Explora nuestra tienda y encuentra lo que buscas!
          </p>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              border: 'none',
              borderRadius: '14px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'translateY(-4px)';
              target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
            }}
          >
            Ir a la Tienda
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#F9FAFB',
              marginBottom: '8px'
            }}>
              Mi
              <span style={{
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}> Carrito</span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#9CA3AF'
            }}>
              {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>

          <button
            onClick={clearCart}
            style={{
              padding: '12px 24px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              color: '#EF4444',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.25)';
              target.style.borderColor = '#EF4444';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.15)';
              target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            }}
          >
            Vaciar Carrito
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px'
        }}>
          {/* Cart Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(26, 31, 58, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '24px',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                {/* Product Image */}
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(0, 0, 0, 0.2)',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={item.image_url || 'https://via.placeholder.com/120'}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'scale(1)';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <h3
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#F9FAFB',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#8B5CF6';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.color = '#F9FAFB';
                    }}
                  >
                    {item.name}
                  </h3>

                  <div style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ${item.price.toFixed(2)}
                  </div>

                  <div style={{
                    fontSize: '14px',
                    color: item.stock > 10 ? '#10B981' : item.stock > 0 ? '#F59E0B' : '#EF4444',
                    fontWeight: '600'
                  }}>
                    {item.stock > 10
                      ? `${item.stock} disponibles`
                      : item.stock > 0
                      ? `Solo ${item.stock} disponibles`
                      : 'Sin stock'}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  alignItems: 'flex-end'
                }}>
                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(10, 14, 39, 0.5)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px',
                    padding: '8px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(102, 126, 234, 0.15)',
                        border: 'none',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.15)';
                      }}
                    >
                      <Minus size={18} color="#667EEA" />
                    </button>

                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#F9FAFB',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      style={{
                        width: '40px',
                        height: '40px',
                        background: item.quantity >= item.stock
                          ? 'rgba(107, 114, 128, 0.1)'
                          : 'rgba(102, 126, 234, 0.15)',
                        border: 'none',
                        borderRadius: '10px',
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
                          target.style.background = 'rgba(102, 126, 234, 0.25)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (item.quantity < item.stock) {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(102, 126, 234, 0.15)';
                        }
                      }}
                    >
                      <Plus size={18} color="#667EEA" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#9CA3AF'
                  }}>
                    Subtotal: <span style={{ color: '#F9FAFB' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '10px 20px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '10px',
                      color: '#EF4444',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
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
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            position: 'sticky',
            top: '100px',
            background: 'rgba(26, 31, 58, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '20px',
            padding: '32px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#F9FAFB',
              marginBottom: '24px'
            }}>
              Resumen del Pedido
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '24px',
              borderBottom: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px'
              }}>
                <span style={{ color: '#9CA3AF' }}>Subtotal</span>
                <span style={{ color: '#F9FAFB', fontWeight: '600' }}>${getCartTotal().toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px'
              }}>
                <span style={{ color: '#9CA3AF' }}>Envío</span>
                <span style={{ color: '#10B981', fontWeight: '600' }}>GRATIS</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px'
              }}>
                <span style={{ color: '#9CA3AF' }}>Impuestos estimados</span>
                <span style={{ color: '#F9FAFB', fontWeight: '600' }}>${(getCartTotal() * 0.16).toFixed(2)}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#9CA3AF'
              }}>
                Total
              </span>
              <span style={{
                fontSize: '36px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ${(getCartTotal() * 1.16).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
              }}
            >
              Proceder al Pago
              <ArrowRight size={22} />
            </button>

            <button
              onClick={() => navigate('/shop')}
              style={{
                width: '100%',
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
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}