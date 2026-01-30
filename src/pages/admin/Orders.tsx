import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, Calendar} from 'lucide-react';
import { useToast } from '../../components/ui/ToastContainer';


import { getOrders, updateOrderStatus, getClient, getOrderDetails, getProduct } from '../../services/api';
import type { Order, OrderItem, CustomerInfo } from '../../types';

export default function Orders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersResponse = await getOrders();
      const fetchedOrders: Order[] = ordersResponse.data;

      // Fetch client info and order items for each order
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
      showToast('Error al cargar los pedidos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      showToast('Estado actualizado exitosamente', 'success');
      loadOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Error al actualizar el estado', 'error');
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

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
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
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#F9FAFB',
          marginBottom: '8px'
        }}>
          Pedidos
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#9CA3AF'
        }}>
          Gestiona todos los pedidos de la tienda
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[
          { 
            label: 'Total Pedidos', 
            value: orders.length, 
            icon: Package,
            color: '#667EEA'
          },
          { 
            label: 'Pendientes', 
            value: orders.filter(o => o.status === 'pending').length, 
            icon: Clock,
            color: '#F59E0B'
          },
          { 
            label: 'En Progreso', 
            value: orders.filter(o => o.status === 'in_progress').length, 
            icon: Truck,
            color: '#3B82F6'
          },
          { 
            label: 'Entregados', 
            value: orders.filter(o => o.status === 'delivered').length, 
            icon: CheckCircle,
            color: '#10B981'
          }
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(26, 31, 58, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.borderColor = stat.color;
              target.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              target.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={24} color={stat.color} />
              </div>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#F9FAFB',
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#9CA3AF',
              fontWeight: '600'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div style={{
          background: 'rgba(26, 31, 58, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderBottom: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    ID Pedido
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Cliente
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Fecha
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Total
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Entrega
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Estado
                  </th>
                  <th style={{
                    padding: '16px 20px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                 
                  return (
                    <tr
                      key={order.id_key}
                      style={{
                        borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'transparent';
                      }}
                    >
                      <td style={{
                        padding: '20px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#667EEA'
                      }}>
                        #{order.id_key}
                      </td>
                      <td style={{
                        padding: '20px',
                        fontSize: '14px',
                        color: '#F9FAFB'
                      }}>
                        {order.customerInfo?.name || 'Cliente'}
                      </td>
                      <td style={{
                        padding: '20px',
                        fontSize: '14px',
                        color: '#9CA3AF'
                      }}>
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td style={{
                        padding: '20px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#10B981'
                      }}>
                        ${order.total.toFixed(2)}
                      </td>
                      <td style={{
                        padding: '20px',
                        fontSize: '14px',
                        color: '#F9FAFB'
                      }}>
                        {getDeliveryMethodLabel(order.delivery_method)}
                      </td>
                      <td style={{ padding: '20px' }}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id_key, e.target.value)}
                          style={{
                            padding: '8px 12px',
                            background: statusInfo.bg,
                            border: `1px solid ${statusInfo.color}40`,
                            borderRadius: '8px',
                            color: statusInfo.color,
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="in_progress">En Progreso</option>
                          <option value="delivered">Entregado</option>
                          <option value="canceled">Cancelado</option>
                        </select>
                      </td>
                      <td style={{
                        padding: '20px',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => viewOrderDetails(order)}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            borderRadius: '8px',
                            color: '#667EEA',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
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
                          <Eye size={14} />
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: 'rgba(26, 31, 58, 0.5)',
          borderRadius: '20px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Package size={40} color="#667EEA" />
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#F9FAFB',
            marginBottom: '12px'
          }}>
            No hay pedidos aún
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#9CA3AF'
          }}>
            Los pedidos aparecerán aquí cuando los clientes realicen compras
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
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
              maxWidth: '800px',
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
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '32px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#F9FAFB',
                  marginBottom: '8px'
                }}>
                  Pedido #{selectedOrder.id_key}
                </h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#9CA3AF'
                }}>
                  <Calendar size={14} />
                  {new Date(selectedOrder.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {(() => {
                const statusInfo = getStatusInfo(selectedOrder.status);
                const StatusIcon = statusInfo.icon;
                return (
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
                );
              })()}
            </div>

            {/* Customer Info */}
            {selectedOrder.customerInfo && (
              <div style={{
                padding: '20px',
                background: 'rgba(26, 31, 58, 0.5)',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#F9FAFB',
                  marginBottom: '16px'
                }}>
                  Información del Cliente
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  fontSize: '14px'
                }}>
                  <div>
                    <span style={{ color: '#9CA3AF' }}>Nombre: </span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      {selectedOrder.customerInfo.name}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#9CA3AF' }}>Email: </span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      {selectedOrder.customerInfo.email}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#9CA3AF' }}>Teléfono: </span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      {selectedOrder.customerInfo.phone}
                    </span>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <span style={{ color: '#9CA3AF' }}>Dirección: </span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      {selectedOrder.customerInfo.address}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div style={{
                padding: '20px',
                background: 'rgba(26, 31, 58, 0.5)',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#F9FAFB',
                  marginBottom: '16px'
                }}>
                  Productos ({selectedOrder.items.length})
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id_key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: 'rgba(10, 14, 39, 0.5)',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flex: 1
                      }}>
                        {item.image_url && (
                          <div style={{
                            width: '50px',
                            height: '50px',
                            background: `url(${item.image_url}) center/cover`,
                            borderRadius: '8px'
                          }}></div>
                        )}
                        <div>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#F9FAFB',
                            marginBottom: '4px'
                          }}>
                            {item.name}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: '#9CA3AF'
                          }}>
                            Cantidad: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#10B981'
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div style={{
              padding: '20px',
              background: 'rgba(26, 31, 58, 0.5)',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#F9FAFB',
                marginBottom: '16px'
              }}>
                Resumen del Pedido
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px'
                }}>
                  <span style={{ color: '#9CA3AF' }}>Método de Entrega:</span>
                  <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                    {getDeliveryMethodLabel(selectedOrder.delivery_method)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#F9FAFB'
                  }}>
                    Total:
                  </span>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                width: '100%',
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
                target.style.background = 'rgba(102, 126, 234, 0.15)';
                target.style.borderColor = '#667EEA';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.background = 'rgba(255, 255, 255, 0.05)';
                target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              }}
            >
              Cerrar
            </button>
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
    </div>
  );
}