import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/ui/ToastContainer';
import { CreditCard, MapPin, User, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { createClient, createAddress, createBill, createOrder, createOrderDetail } from '../../services/api';


export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    city: '',
    deliveryMethod: '3' // Default: Home delivery
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showToast('Por favor completa todos los campos de contacto', 'error');
      return;
    }

    if (!formData.street.trim() || !formData.number.trim() || !formData.city.trim()) {
      showToast('Por favor completa la dirección de envío', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Tu carrito está vacío', 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. Create Client
      const clientData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: `${formData.street} ${formData.number}, ${formData.city}`
      };
      const clientResponse = await createClient(clientData);
      const client_id = clientResponse.data.id_key;

      // 2. Create Address
      const addressData = {
        street: formData.street.trim(),
        number: formData.number.trim(),
        city: formData.city.trim(),
        client_id: client_id
      };
      await createAddress(addressData); // No need to store address ID unless it's explicitly used later

      // 3. Create Bill
      const subtotal = getCartTotal();
      const tax = subtotal * 0.16;
      const total = subtotal + tax;

      const billData = {
        bill_number: `BILL-${Date.now()}`, // Generate a unique bill number
        discount: 0,
        total: total,
        payment_type: 'card' as 'card', // Explicitly cast to 'card'
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      };
      const billResponse = await createBill(billData);
      const bill_id = billResponse.data.id_key;

      // 4. Create Order
      const orderData = {
        total: total,
        delivery_method: Number(formData.deliveryMethod),
        status: 'pending',
        client_id: client_id,
        bill_id: bill_id,
      };
      const orderResponse = await createOrder(orderData);
      const order_id = orderResponse.data.id_key;

      // 5. Create Order Details
      await Promise.all(
        cart.map(item =>
          createOrderDetail({
            quantity: item.quantity,
            price: item.price,
            order_id: order_id,
            product_id: item.id_key,
          })
        )
      );

      setOrderId(order_id);
      setOrderSuccess(true);
      clearCart();
      showToast('¡Pedido realizado exitosamente!', 'success');

      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/my-orders');
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Error al procesar el pedido. Intenta nuevamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
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
            <CreditCard size={50} color="#667EEA" />
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#F9FAFB',
            marginBottom: '12px'
          }}>
            Tu carrito está vacío
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9CA3AF',
            marginBottom: '32px'
          }}>
            Agrega productos a tu carrito para continuar con la compra
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
              transition: 'all 0.2s'
            }}
          >
            Ir a la Tienda
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div style={{ padding: '40px 24px', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          {/* Success Animation */}
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4)',
            animation: 'successPop 0.6s ease-out'
          }}>
            <CheckCircle2 size={60} color="white" />
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#F9FAFB',
            marginBottom: '16px'
          }}>
            ¡Pedido Realizado con Éxito!
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#9CA3AF',
            marginBottom: '12px'
          }}>
            Tu pedido #{orderId} ha sido confirmado
          </p>

          <p style={{
            fontSize: '16px',
            color: '#9CA3AF',
            marginBottom: '32px'
          }}>
            Recibirás un correo de confirmación en {formData.email}
          </p>

          {/* Order Summary Card */}
          <div style={{
            background: 'rgba(26, 31, 58, 0.5)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#F9FAFB',
              marginBottom: '16px'
            }}>
              Detalles de tu pedido
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>Total:</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ${(getCartTotal() * 1.16).toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>Método de entrega:</span>
                <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                  {formData.deliveryMethod === '1' ? 'Drive Thru' : 
                   formData.deliveryMethod === '2' ? 'En Mano' : 'Envío a Domicilio'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>Dirección:</span>
                <span style={{ color: '#F9FAFB', fontWeight: '600', textAlign: 'right' }}>
                  {formData.street} {formData.number}, {formData.city}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/my-orders')}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                fontSize: '16px',
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
              Ver Mis Pedidos
            </button>

            <button
              onClick={() => navigate('/shop')}
              style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '14px',
                color: '#F3F4F6',
                fontSize: '16px',
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
              Seguir Comprando
            </button>
          </div>

          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            marginTop: '32px'
          }}>
            Redirigiendo a tus pedidos en 3 segundos...
          </p>
        </div>

        <style>{`
          @keyframes successPop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <button
          onClick={() => navigate('/cart')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            color: '#F3F4F6',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '32px',
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
          <ArrowLeft size={18} />
          Volver al Carrito
        </button>

        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          color: '#F9FAFB',
          marginBottom: '12px'
        }}>
          Finalizar
          <span style={{
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}> Compra</span>
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#9CA3AF',
          marginBottom: '40px'
        }}>
          Completa tus datos para procesar el pedido
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Left Column - Forms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Contact Info */}
              <div style={{
                background: 'rgba(26, 31, 58, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={20} color="white" />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#F9FAFB'
                  }}>
                    Información de Contacto
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      marginBottom: '8px'
                    }}>
                      Nombre Completo *
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
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
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
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
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
                </div>
              </div>

              {/* Shipping Address */}
              <div style={{
                background: 'rgba(26, 31, 58, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={20} color="white" />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#F9FAFB'
                  }}>
                    Dirección de Envío
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9CA3AF',
                      marginBottom: '8px'
                    }}>
                      Calle *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#9CA3AF',
                        marginBottom: '8px'
                      }}>
                        Número *
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={formData.number}
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
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
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
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div style={{
                background: 'rgba(26, 31, 58, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CreditCard size={20} color="white" />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#F9FAFB'
                  }}>
                    Método de Entrega
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { value: '1', label: 'Drive Thru', desc: 'Recoge en el auto' },
                    { value: '2', label: 'En Mano', desc: 'Recoge en tienda' },
                    { value: '3', label: 'Envío a Domicilio', desc: 'Recibe en tu casa' }
                  ].map((method) => (
                    <label
                      key={method.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: formData.deliveryMethod === method.value 
                          ? 'rgba(102, 126, 234, 0.15)' 
                          : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${formData.deliveryMethod === method.value 
                          ? '#667EEA' 
                          : 'rgba(102, 126, 234, 0.2)'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.deliveryMethod !== method.value) {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(255, 255, 255, 0.06)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.deliveryMethod !== method.value) {
                          const target = e.currentTarget as HTMLElement;
                          target.style.background = 'rgba(255, 255, 255, 0.03)';
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={method.value}
                        checked={formData.deliveryMethod === method.value}
                        onChange={handleInputChange}
                        style={{
                          width: '20px',
                          height: '20px',
                          accentColor: '#667EEA',
                          cursor: 'pointer'
                        }}
                      />
                      <div>
                        <div style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#F9FAFB',
                          marginBottom: '4px'
                        }}>
                          {method.label}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#9CA3AF'
                        }}>
                          {method.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
              <div style={{
                background: 'rgba(26, 31, 58, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#F9FAFB',
                  marginBottom: '20px'
                }}>
                  Resumen del Pedido
                </h3>

                {/* Cart Items */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  paddingRight: '8px'
                }}>
                  {cart.map((item) => (
                    <div
                      key={item.id_key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{ color: '#9CA3AF' }}>
                        {item.name} x{item.quantity}
                      </div>
                      <div style={{ color: '#F9FAFB', fontWeight: '600' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid rgba(102, 126, 234, 0.2)',
                  paddingTop: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#9CA3AF' }}>Subtotal</span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#9CA3AF' }}>Envío</span>
                    <span style={{ color: '#10B981', fontWeight: '700' }}>
                      GRATIS
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ color: '#9CA3AF' }}>Impuestos (16%)</span>
                    <span style={{ color: '#F9FAFB', fontWeight: '600' }}>
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{
                  borderTop: '2px solid rgba(102, 126, 234, 0.3)',
                  paddingTop: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#F9FAFB'
                    }}>
                      Total
                    </span>
                    <span style={{
                      fontSize: '32px',
                      fontWeight: '900',
                      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: loading 
                      ? 'rgba(102, 126, 234, 0.5)' 
                      : 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    border: 'none',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                    opacity: loading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-2px)';
                      target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0)';
                      target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '3px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      Confirmar Pedido
                    </>
                  )}
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <ShieldCheck size={16} color="#10B981" />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#10B981'
                  }}>
                    Pago seguro y protegido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}