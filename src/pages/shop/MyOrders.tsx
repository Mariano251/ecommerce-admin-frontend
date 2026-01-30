import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar } from 'lucide-react';
import { getOrders, getClient, getOrderDetails, getProduct } from '../../services/api';
import type { Order, OrderItem, CustomerInfo } from '../../types';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersResponse = await getOrders();
      const fetchedOrders: Order[] = ordersResponse.data;

      const ordersWithDetails = await Promise.all(
        fetchedOrders.map(async (order) => {
          const clientResponse = await getClient(order.client_id);
          const customerInfo: CustomerInfo = {
            name: clientResponse.data.name,
            email: clientResponse.data.email,
            phone: clientResponse.data.phone,
            address: clientResponse.data.address,
          };

          const orderDetailsResponse = await getOrderDetails(order.id_key);
          const orderItems: OrderItem[] = await Promise.all(
            orderDetailsResponse.data.map(async (detail) => {
              const productResponse = await getProduct(detail.product_id);
              const product = productResponse.data;

              return {
                id_key: detail.id_key,
                name: product?.name || 'Unknown Product',
                price: detail.price,
                quantity: detail.quantity,
                image_url: product?.image,
              };
            })
          );

          return {
            ...order,
            customerInfo,
            items: orderItems,
          };
        })
      );

      const sortedOrders = ordersWithDetails.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; bg: string; icon: any }> = {
      'pending': {
        label: 'Pendiente',
        color: '#F59E0B',
        bg: 'rgba(245, 158, 11, 0.15)',
        icon: Clock
      },
      'in_progress': {
        label: 'En Progreso',
        color: '#3B82F6',
        bg: 'rgba(59, 130, 246, 0.15)',
        icon: Truck
      },
      'delivered': {
        label: 'Entregado',
        color: '#10B981',
        bg: 'rgba(16, 185, 129, 0.15)',
        icon: CheckCircle
      },
      'canceled': {
        label: 'Cancelado',
        color: '#EF4444',
        bg: 'rgba(239, 68, 68, 0.15)',
        icon: XCircle
      }
    };

    return statusMap[status] || statusMap['pending'];
  };

  const getDeliveryMethodLabel = (method: number) => {
    const methods: Record<number, string> = {
      1: 'Drive Thru',
      2: 'En Mano',
      3: 'Envío a Domicilio'
    };
    return methods[method] || 'Envío a Domicilio';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(102, 126, 234, 0.2)',
          borderTop: '4px solid #667EEA',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            color: '#F9FAFB',
            marginBottom: '12px'
          }}>
            Mis
            <span style={{
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}> Pedidos</span>
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#9CA3AF'
          }}>
            Historial completo de tus compras - {orders.length} pedido{orders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id_key}
                  style={{
                    background: 'rgba(26, 31, 58, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '20px',
                    padding: '32px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.borderColor = '#667EEA';
                    target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Package size={22} color="white" />
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#F9FAFB'
                          }}>
                            Pedido #{order.id_key}
                          </h3>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            color: '#9CA3AF',
                            marginTop: '4px'
                          }}>
                            <Calendar size={14} />
                            {new Date(order.created_at).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: statusInfo.bg,
                      border: `1px solid ${statusInfo.color}40`,
                      borderRadius: '12px'
                    }}>
                      <StatusIcon size={18} color={statusInfo.color} />
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: statusInfo.color
                      }}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Items (if available) */}
                  {order.items && order.items.length > 0 && (
                    <div style={{
                      marginBottom: '20px',
                      padding: '16px',
                      background: 'rgba(10, 14, 39, 0.5)',
                      borderRadius: '12px'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#F9FAFB',
                        marginBottom: '12px'
                      }}>
                        Productos ({order.items.length})
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        {order.items.map((item, index) => (
                          <div
                            key={`${item.id_key}-${index}`}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '13px'
                            }}
                          >
                            <span style={{ color: '#9CA3AF' }}>
                              {item.name} x{item.quantity}
                            </span>
                            <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    padding: '20px',
                    background: 'rgba(10, 14, 39, 0.5)',
                    borderRadius: '16px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        color: '#9CA3AF',
                        marginBottom: '6px',
                        fontWeight: '600'
                      }}>
                        Total
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        ${order.total.toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div style={{
                        fontSize: '13px',
                        color: '#9CA3AF',
                        marginBottom: '6px',
                        fontWeight: '600'
                      }}>
                        Método de Entrega
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#F9FAFB'
                      }}>
                        {getDeliveryMethodLabel(order.delivery_method)}
                      </div>
                    </div>

                    <div>
                      <div style={{
                        fontSize: '13px',
                        color: '#9CA3AF',
                        marginBottom: '6px',
                        fontWeight: '600'
                      }}>
                        Fecha de Pedido
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#F9FAFB'
                      }}>
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info (if available) */}
                  {order.customerInfo && (
                    <div style={{
                      padding: '16px',
                      background: 'rgba(10, 14, 39, 0.5)',
                      borderRadius: '12px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#F9FAFB',
                        marginBottom: '12px'
                      }}>
                        Información del Cliente
                      </h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px',
                        fontSize: '13px'
                      }}>
                        <div>
                          <span style={{ color: '#9CA3AF' }}>Nombre: </span>
                          <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                            {order.customerInfo.name}
                          </span>
                        </div>
                        <div>
                          <span style={{ color: '#9CA3AF' }}>Email: </span>
                          <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                            {order.customerInfo.email}
                          </span>
                        </div>
                        <div>
                          <span style={{ color: '#9CA3AF' }}>Teléfono: </span>
                          <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                            {order.customerInfo.phone}
                          </span>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <span style={{ color: '#9CA3AF' }}>Dirección: </span>
                          <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                            {order.customerInfo.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => {
                        const itemsList = order.items 
                          ? order.items.map(item => `  • ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')
                          : 'Sin productos';
                        
                        alert(
                          `📦 PEDIDO #${order.id_key}\n\n` +
                          `💰 Total: $${order.total.toFixed(2)}\n` +
                          `📊 Estado: ${statusInfo.label}\n` +
                          `🚚 Método: ${getDeliveryMethodLabel(order.delivery_method)}\n` +
                          `📅 Fecha: ${new Date(order.created_at).toLocaleDateString('es-ES')}\n\n` +
                          `🛍️ PRODUCTOS:\n${itemsList}\n\n` +
                          (order.customerInfo ? 
                            `👤 CLIENTE:\n` +
                            `  Nombre: ${order.customerInfo.name}\n` +
                            `  Email: ${order.customerInfo.email}\n` +
                            `  Teléfono: ${order.customerInfo.phone}\n` +
                            `  Dirección: ${order.customerInfo.address}`
                            : ''
                          )
                        );
                      }}
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
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
                      Ver Detalles
                    </button>

                    {order.status === 'delivered' && (
                      <button
                        onClick={() => navigate('/shop')}
                        style={{
                          padding: '12px 24px',
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
                          target.style.background = 'rgba(102, 126, 234, 0.15)';
                          target.style.borderColor = '#667EEA';
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(255, 255, 255, 0.05)';
                          target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                        }}
                      >
                        Comprar de Nuevo
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'rgba(26, 31, 58, 0.5)',
            borderRadius: '20px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Package size={50} color="#667EEA" />
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#F9FAFB',
              marginBottom: '12px'
            }}>
              No tienes pedidos aún
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#9CA3AF',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Comienza a explorar nuestra tienda y realiza tu primera compra
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
            </button>
          </div>
        )}
      </div>
    </div>
  );
}