import { Outlet } from 'react-router-dom';
import ResponsiveNavbar from './ResponsiveNavbar';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShopLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E27',
      position: 'relative'
    }}>
      {/* Background gradient overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Navbar */}
      <ResponsiveNavbar />

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 1
      }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '80px',
        padding: '48px 24px',
        background: 'rgba(26, 31, 58, 0.5)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          {/* Column 1 - Brand */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              ShopHub
            </h3>
            <p style={{
              color: '#9CA3AF',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Tu tienda online de confianza con los mejores productos y precios del mercado.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#F9FAFB',
              marginBottom: '16px'
            }}>
              Enlaces
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#8B5CF6';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#9CA3AF';
                }}>
                Inicio
              </a>
              <a href="/shop" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#8B5CF6';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#9CA3AF';
                }}>
                Tienda
              </a>
              <a href="/my-orders" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#8B5CF6';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#9CA3AF';
                }}>
                Mis Pedidos
              </a>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#F9FAFB',
              marginBottom: '16px'
            }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
                📧 info@shophub.com
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
                📱 +52 55 1234 5678
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
                📍 Ciudad de Mendoza, Argentina.
              </p>
            </div>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#F9FAFB',
              marginBottom: '16px'
            }}>
              Síguenos
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <div key={social} style={{
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
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
                  target.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(255, 255, 255, 0.05)';
                  target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                }}>
                  <span style={{ fontSize: '12px', color: '#F3F4F6' }}>
                    {social[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          maxWidth: '1400px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(102, 126, 234, 0.1)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            © 2025 ShopHub. Todos los derechos reservados. Desarrollado por Mariano Lopez
          </p>
        </div>
      </footer>
    </div>
  );
}