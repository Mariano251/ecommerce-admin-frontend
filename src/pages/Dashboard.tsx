import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { getProducts, getOrders, getClients } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalClients: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes, clientsRes] = await Promise.all([
        getProducts(),
        getOrders(),
        getClients(),
      ]);

      const revenue = ordersRes.data.reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalProducts: productsRes.data.length,
        totalOrders: ordersRes.data.length,
        totalClients: clientsRes.data.length,
        totalRevenue: revenue,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      change: '+12%',
    },
    {
      title: 'Total Órdenes',
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      change: '+8%',
    },
    {
      title: 'Total Clientes',
      value: stats.totalClients,
      icon: Users,
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      change: '+23%',
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      change: '+15%',
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(59, 130, 246, 0.3)',
            borderTopColor: '#3B82F6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F9FAFB', marginBottom: '8px' }}>
          Dashboard General
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '15px' }}>Resumen de tu tienda en tiempo real</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              style={{
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{
                  background: card.gradient,
                  padding: '14px',
                  borderRadius: '14px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                }}>
                  <Icon size={26} color="white" />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#10B981',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <TrendingUp size={14} />
                  <span>{card.change}</span>
                </div>
              </div>
              
              <div>
                <p style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#F9FAFB' }}>
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Recent Activity Card */}
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB' }}>Actividad Reciente</h2>
            <button style={{
              color: '#60A5FA',
              fontSize: '14px',
              fontWeight: '600',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(96, 165, 250, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Ver todo <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Package size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>Nueva orden recibida</p>
                  <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Hace 2 horas</p>
                </div>
                <div style={{ color: '#10B981', fontWeight: '700', fontSize: '15px' }}>+$129.99</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'white' }}>Acciones Rápidas</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '24px', fontSize: '14px' }}>
            Gestiona tu tienda de forma eficiente con estas opciones
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Agregar Producto', 'Ver Órdenes', 'Gestionar Inventario'].map((action, idx) => (
              <button key={idx} style={{
                width: '100%',
                backgroundColor: idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.15)',
                color: idx === 0 ? '#3B82F6' : 'white',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = idx === 0 ? '#F3F4F6' : 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                <span>{action}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div style={{
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
          }}>
            <TrendingUp size={26} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#F9FAFB', marginBottom: '8px' }}>
              ¡Tu tienda está creciendo! 🚀
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.6' }}>
              Mantén el control de tu inventario, gestiona órdenes y haz crecer tu negocio desde este panel de administración.
              Cuando tu amigo termine de configurar el backend, podrás ver datos reales aquí.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}