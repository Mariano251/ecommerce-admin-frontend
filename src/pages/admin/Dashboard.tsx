import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight, Clock, CheckCircle, Truck } from 'lucide-react';
import { useToast } from '../../components/ui/ToastContainer';
import { getLocalProducts, getLocalOrders, getLocalCategories, addLocalProduct } from '../../services/localStorage';
import type { Category } from '../../types';

interface Order {
  id: number;
  date: string;
  total: number;
  delivery_method: number;
  status: string;
  created_at: string;
  items?: any[];
  customerInfo?: {
    name: string;
    email: string;
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStock: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: ''
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    try {
      setLoading(true);
      
      // Cargar productos
      const products = getLocalProducts();
      const lowStockProducts = products.filter(p => p.stock < 10);
      
      // Cargar órdenes
      const orders = getLocalOrders();
      const revenue = orders.reduce((sum, order) => sum + order.total, 0);
      
      // Cargar categorías
      const cats = getLocalCategories();
      setCategories(cats);
      
      // Calcular estadísticas por categoría
      const categoryData = cats.map(cat => {
        const categoryProducts = products.filter(p => p.category_id === cat.id);
        const percentage = products.length > 0 
          ? Math.round((categoryProducts.length / products.length) * 100)
          : 0;
        
        return {
          category: cat.name,
          count: categoryProducts.length,
          percentage: percentage,
          color: getCategoryColor(cat.id)
        };
      });

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        lowStock: lowStockProducts.length,
        totalRevenue: revenue,
      });

      // Obtener las 3 órdenes más recientes
      const sortedOrders = orders
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3);
      
      setRecentOrders(sortedOrders);
      setCategoryStats(categoryData);
      
    } catch (error) {
      console.error('Error loading stats:', error);
      showToast('Error al cargar las estadísticas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.stock || !formData.category_id) {
      showToast('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        image_url: formData.image_url.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
      };

      addLocalProduct(productData);
      showToast('Producto creado exitosamente', 'success');
      closeModal();
      loadStats(); // Recargar estadísticas
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Error al guardar el producto', 'error');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      image_url: ''
    });
  };

  const getCategoryColor = (categoryId: number) => {
    const colors: Record<number, string> = {
      1: '#3B82F6',
      2: '#10B981',
      3: '#8B5CF6',
      4: '#F59E0B',
    };
    return colors[categoryId] || '#6B7280';
  };

  const getOrderStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'pending': Clock,
      'in_progress': Truck,
      'delivered': CheckCircle,
      'canceled': Package
    };
    return icons[status] || Package;
  };

  const getOrderStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'in_progress': 'En Progreso',
      'delivered': 'Entregado',
      'canceled': 'Cancelado'
    };
    return labels[status] || status;
  };

  const getOrderStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#F59E0B',
      'in_progress': '#3B82F6',
      'delivered': '#10B981',
      'canceled': '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      change: stats.totalProducts > 0 ? 'Activos' : 'Vacío',
      onClick: () => navigate('/admin/products')
    },
    {
      title: 'Total Pedidos',
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      change: stats.totalOrders > 0 ? 'Gestionados' : 'Sin pedidos',
      onClick: () => navigate('/admin/orders')
    },
    {
      title: 'Stock Bajo',
      value: stats.lowStock,
      icon: Package,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      change: stats.lowStock > 0 ? 'Requiere atención' : 'Todo OK',
      onClick: () => navigate('/admin/products')
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      change: stats.totalRevenue > 0 ? 'Generados' : 'Sin ventas',
      onClick: () => navigate('/admin/orders')
    },
  ];

  const quickActions = [
    {
      label: 'Agregar Producto',
      onClick: () => setIsModalOpen(true),
      primary: true
    },
    {
      label: 'Ver Pedidos',
      onClick: () => navigate('/admin/orders'),
      primary: false
    },
    {
      label: 'Gestionar Categorías',
      onClick: () => navigate('/admin/categories'),
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
              onClick={card.onClick}
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
                  color: '#9CA3AF',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: 'rgba(156, 163, 175, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(156, 163, 175, 0.2)'
                }}>
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
        {/* Recent Orders */}
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB' }}>Pedidos Recientes</h2>
            <button 
              onClick={() => navigate('/admin/orders')}
              style={{
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
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const StatusIcon = getOrderStatusIcon(order.status);
                const statusColor = getOrderStatusColor(order.status);
                
                return (
                  <div key={order.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/admin/orders')}
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
                      background: `${statusColor}20`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <StatusIcon size={20} color={statusColor} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>
                        Pedido #{order.id} - {order.customerInfo?.name || 'Cliente'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#9CA3AF' }}>
                        {getTimeAgo(order.created_at)} • {getOrderStatusLabel(order.status)}
                      </p>
                    </div>
                    <div style={{ color: '#10B981', fontWeight: '700', fontSize: '15px' }}>
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#9CA3AF'
              }}>
                <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p style={{ fontSize: '14px', fontWeight: '600' }}>No hay pedidos aún</p>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>Los pedidos aparecerán aquí</p>
              </div>
            )}
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

      {/* Category Distribution */}
      {categoryStats.length > 0 && (
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          backdropFilter: 'blur(10px)',
          marginBottom: '32px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '24px' }}>
            Productos por Categoría
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryStats.map((item, idx) => (
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
      )}

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
              {stats.totalProducts > 0 ? '¡Tu tienda está activa! 🚀' : '¡Comienza tu tienda! 🎉'}
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.6' }}>
              {stats.totalProducts > 0 
                ? `Tienes ${stats.totalProducts} productos y ${stats.totalOrders} pedidos. Continúa gestionando tu inventario y pedidos desde este panel.`
                : 'Agrega tus primeros productos y empieza a vender. Todos los datos se guardan localmente y se sincronizan en tiempo real.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Modal para Agregar Producto */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
              animation: 'fadeIn 0.2s ease-out'
            }}
          ></div>

          {/* Modal */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(10, 14, 39, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '20px',
              padding: '32px',
              zIndex: 1000,
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#F9FAFB',
              marginBottom: '24px'
            }}>
              Nuevo Producto
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9CA3AF',
                    marginBottom: '8px'
                  }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      color: '#F3F4F6',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667EEA';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9CA3AF',
                    marginBottom: '8px'
                  }}>
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      color: '#F3F4F6',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667EEA';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      marginBottom: '8px'
                    }}>
                      Precio *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: '10px',
                        color: '#F3F4F6',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667EEA';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      marginBottom: '8px'
                    }}>
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        borderRadius: '10px',
                        color: '#F3F4F6',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667EEA';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9CA3AF',
                    marginBottom: '8px'
                  }}>
                    Categoría *
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      color: '#F3F4F6',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667EEA';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9CA3AF',
                    marginBottom: '8px'
                  }}>
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '10px',
                      color: '#F3F4F6',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667EEA';
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '8px'
                }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '12px',
                      color: '#F3F4F6',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0)';
                    }}
                  >
                    Crear Producto
                  </button>
                </div>
              </div>
            </form>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from {
                transform: translate(-50%, -40%);
                opacity: 0;
              }
              to {
                transform: translate(-50%, -50%);
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}