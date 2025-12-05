import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Productos' },
    { path: '/admin/categories', icon: Tag, label: 'Categorías' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Pedidos' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(102, 126, 234, 0.2)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Panel
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#9CA3AF',
            marginTop: '4px'
          }}>
            Panel de administración
          </p>
        </div>

        {/* User Info */}
        {user && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
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
                <User size={20} color="white" />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#F9FAFB',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          flex: 1
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)' 
                    : 'transparent',
                  border: isActive 
                    ? '1px solid rgba(102, 126, 234, 0.3)' 
                    : '1px solid transparent',
                  color: isActive ? '#667EEA' : '#9CA3AF',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(255, 255, 255, 0.05)';
                    target.style.borderColor = 'rgba(102, 126, 234, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.borderColor = 'transparent';
                  }
                }}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(102, 126, 234, 0.2)',
          margin: '16px 0'
        }}></div>

        {/* Volver al Shop */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'transparent',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            color: '#9CA3AF',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '8px'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'rgba(102, 126, 234, 0.1)';
            target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
            target.style.color = '#667EEA';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'transparent';
            target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            target.style.color = '#9CA3AF';
          }}
        >
          <Package size={20} />
          Volver al Shop
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'rgba(239, 68, 68, 0.2)';
            target.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'rgba(239, 68, 68, 0.1)';
            target.style.transform = 'translateX(0)';
          }}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)'
      }}>
        <Outlet />
      </main>
    </div>
  );
}