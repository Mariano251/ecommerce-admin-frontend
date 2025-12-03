import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ShoppingCart, 
  Users,
  Store
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Productos', icon: Package },
  { path: '/categories', label: 'Categorías', icon: FolderTree },
  { path: '/orders', label: 'Órdenes', icon: ShoppingCart },
  { path: '/clients', label: 'Clientes', icon: Users },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div style={{
      width: '280px',
      background: 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)'
    }}>
      {/* Logo Section */}
      <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
          }}>
            <Store size={26} color="white" />
          </div>
          <div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2px'
            }}>
              E-Commerce
            </h1>
            <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '24px 16px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                  position: 'relative',
                  ...(isActive ? {
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
                    transform: 'translateX(4px)'
                  } : {
                    backgroundColor: 'transparent'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '24px',
                    backgroundColor: 'white',
                    borderRadius: '0 4px 4px 0'
                  }} />
                )}
                <Icon 
                  size={22} 
                  color={isActive ? 'white' : '#9CA3AF'}
                  style={{ transition: 'color 0.3s' }}
                />
                <span style={{
                  fontSize: '15px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'white' : '#D1D5DB',
                  transition: 'all 0.3s'
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px', fontWeight: '500' }}>
            Versión 1.0.0
          </p>
          <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: '600' }}>
            © 2025 E-Commerce
          </p>
        </div>
      </div>
    </div>
  );
}