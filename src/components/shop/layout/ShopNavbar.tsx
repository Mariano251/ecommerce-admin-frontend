import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

export default function ShopNavbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            gap: '20px'
          }}>
            {/* Logo */}
            <Link to="/" style={{
              fontSize: '22px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingCart size={20} color="white" />
              </div>
              ShopHub
            </Link>

            {/* Navigation Links */}
            <div style={{
              display: 'flex',
              gap: '24px',
              flexShrink: 0
            }}>
              <Link to="/" style={{
                color: '#F9FAFB',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#8B5CF6';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#F9FAFB';
              }}>
                Inicio
              </Link>
              <Link to="/shop" style={{
                color: '#F9FAFB',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#8B5CF6';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#F9FAFB';
              }}>
                Tienda
              </Link>
              <Link to="/my-orders" style={{
                color: '#F9FAFB',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#8B5CF6';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.color = '#F9FAFB';
              }}>
                Mis Pedidos
              </Link>
            </div>

            {/* Spacer - empuja los iconos a la derecha */}
            <div style={{ flex: 1 }}></div>

            {/* Search Bar */}
            {/*<div style={{
              position: 'relative',
              width: '220px',
              maxWidth: '280px',
              flexShrink: 1,
              minWidth: '180px'
            }}>
              <Search size={18} color="#9CA3AF" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="text"
                placeholder="Buscar productos..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '10px',
                  color: '#F3F4F6',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#667EEA';
                  target.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
            </div>*/}

            {/* Icons */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'center',
              flexShrink: 0
            }}>
              {/* User Icon */}
              <button style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(102, 126, 234, 0.15)';
                target.style.borderColor = '#667EEA';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.background = 'rgba(255, 255, 255, 0.05)';
                target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              }}>
                <User size={18} color="#F3F4F6" />
              </button>

              {/* Cart Icon with Badge */}
              <Link to="/cart" style={{
                position: 'relative',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textDecoration: 'none',
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
              }}>
                <ShoppingCart size={18} color="white" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#EF4444',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #0A0E27'
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}