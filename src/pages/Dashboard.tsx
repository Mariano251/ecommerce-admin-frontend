import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, Plus } from 'lucide-react';
import { getProducts, getOrders, getClients, createProduct } from '../services/api';
import Modal from '../components/ui/Modal';
import ProductForm from '../components/products/ProductForm';
import type { ProductFormData } from '../components/products/ProductForm';
import { useToast } from '../components/ui/ToastContainer';

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await createProduct(data);
      setIsModalOpen(false);
      showToast('Producto creado exitosamente!', 'success');
      loadStats(); // Recargar estadísticas
    } catch (error) {
      console.error('Error creating product:', error);
      showToast('Error al crear el producto. Verifica que el backend esté funcionando.', 'error');
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

  const quickActions = [
    {
      label: 'Agregar Producto',
      onClick: () => setIsModalOpen(true),
      primary: true
    },
    {
      label: 'Ver Órdenes',
      onClick: () => navigate('/orders'),
      primary: false
    },
    {
      label: 'Gestionar Inventario',
      onClick: () => navigate('/products'),
      primary: false
    }
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
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={action.onClick}
                style={{
                  width: '100%',
                  backgroundColor: action.primary ? 'white' : 'rgba(255, 255, 255, 0.15)',
                  color: action.primary ? '#3B82F6' : 'white',
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
                  e.currentTarget.style.backgroundColor = action.primary ? '#F3F4F6' : 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = action.primary ? 'white' : 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span>{action.label}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Sales Chart */}
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '24px' }}>
            Ventas Mensuales
          </h2>
          <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              height: '280px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '20px',
              gap: '8px'
            }}>
              {[
                { month: 'Ene', value: 4200, height: '60%' },
                { month: 'Feb', value: 3800, height: '52%' },
                { month: 'Mar', value: 5100, height: '75%' },
                { month: 'Abr', value: 4600, height: '65%' },
                { month: 'May', value: 6200, height: '92%' },
                { month: 'Jun', value: 5800, height: '85%' },
              ].map((data, idx) => (
                <div key={idx} style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '100%',
                    height: data.height,
                    background: 'linear-gradient(180deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '8px 8px 0 0',
                    position: 'relative',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    boxShadow: '0 -4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1.05)';
                    e.currentTarget.style.boxShadow = '0 -8px 20px rgba(59, 130, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.boxShadow = '0 -4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#10B981',
                      whiteSpace: 'nowrap'
                    }}>
                      ${data.value}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF' }}>
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '24px' }}>
            Productos por Categoría
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { category: 'Electrónica', count: 45, percentage: 35, color: '#3B82F6' },
              { category: 'Ropa', count: 32, percentage: 25, color: '#10B981' },
              { category: 'Hogar', count: 28, percentage: 22, color: '#8B5CF6' },
              { category: 'Deportes', count: 23, percentage: 18, color: '#F59E0B' },
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#9CA3AF' }}>
                    {item.count} productos ({item.percentage}%)
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: item.color,
                    borderRadius: '10px',
                    transition: 'width 1s ease-out',
                    boxShadow: `0 0 10px ${item.color}80`
                  }}></div>
                </div>
              </div>
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

      {/* Modal para Agregar Producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Producto"
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}