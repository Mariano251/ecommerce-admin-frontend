import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package, Shield, Truck,  Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/ui/ToastContainer';
import { getLocalProducts, getLocalCategories } from '../../services/localStorage';
import type { Product, Category } from '../../types';
import ReviewStars from '../../components/shop/ReviewStars';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    loadProduct();
    // Agregamos un pequeño retraso para que el estado de carga sea visible
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer); // Limpieza del timer
  }, [id]);

  const loadProduct = () => {
    try {
      // Aseguramos que el loading inicie en true
      setLoading(true); 
      if (!id) {
        navigate('/shop');
        return;
      }

      const products = getLocalProducts();
      const foundProduct = products.find(p => p.id === parseInt(id));

      if (!foundProduct) {
        showToast('Producto no encontrado', 'error');
        navigate('/shop');
        return;
      }

      setProduct(foundProduct);

      // Cargar categoría
      const categories = getLocalCategories();
      const foundCategory = categories.find(c => c.id === foundProduct.category_id);
      setCategory(foundCategory || null);

    } catch (error) {
      console.error('Error loading product:', error);
      showToast('Error al cargar el producto', 'error');
      navigate('/shop');
    } 
    // NOTA: El `finally` fue movido al `useEffect` con un setTimeout para garantizar 
    // que el spinner se muestre por un tiempo mínimo, simulando una carga asíncrona.
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock < quantity) {
      showToast('No hay suficiente stock disponible', 'error');
      return;
    }

    addToCart(product, quantity);
    showToast(`${quantity} ${product.name} agregado(s) al carrito`, 'success');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return;
    
    if (newQuantity < 1) {
      setQuantity(1);
    } else if (newQuantity > product.stock) {
      setQuantity(product.stock);
      showToast(`Solo hay ${product.stock} unidades disponibles`, 'error');
    } else {
      setQuantity(newQuantity);
    }
  };

  // Bloque de carga con el nuevo mensaje
  if (loading) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', // Añadido para centrar verticalmente el spinner y el texto
        gap: '16px' // Espacio entre el spinner y el texto
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(102, 126, 234, 0.2)',
          borderTop: '4px solid #667EEA',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#9CA3AF', fontWeight: '500' }}>
          Cargando detalle de producto... {/* Mensaje solicitado */}
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); } /* Simplificado y debería funcionar */
          }
        `}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <p style={{ fontSize: '18px', color: '#9CA3AF' }}>Producto no encontrado</p>
        <button
          onClick={() => navigate('/shop')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const images = [
    product.image_url || 'https://via.placeholder.com/600',
    'https://via.placeholder.com/600/667EEA',
    'https://via.placeholder.com/600/764BA2'
  ];

  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            color: '#F3F4F6',
            fontSize: '15px',
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
          <ArrowLeft size={20} />
          Volver a la tienda
        </button>

        {/* Product Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '60px',
          marginBottom: '80px'
        }}>
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(26, 31, 58, 0.7)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <img
                src={images[activeImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {product.stock === 0 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    padding: '16px 32px',
                    background: 'rgba(239, 68, 68, 0.9)',
                    borderRadius: '12px',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    Sin Stock
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  style={{
                    width: 'calc(33.33% - 8px)',
                    aspectRatio: '1',
                    overflow: 'hidden',
                    background: 'rgba(26, 31, 58, 0.7)',
                    border: `2px solid ${activeImage === index ? '#667EEA' : 'rgba(102, 126, 234, 0.2)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.borderColor = '#667EEA';
                  }}
                  onMouseLeave={(e) => {
                    if (activeImage !== index) {
                      const target = e.currentTarget as HTMLElement;
                      target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            {category && (
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#8B5CF6',
                marginBottom: '16px'
              }}>
                {category.name}
              </div>
            )}

            {/* Title */}
            <h1 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#F9FAFB',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>

            {/* Rating (placeholder) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <ReviewStars rating={4.5} size={22} />
              <span style={{ fontSize: '16px', color: '#9CA3AF' }}>
                4.5 (0 reseñas)
              </span>
            </div>

            {/* Price */}
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '24px'
            }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '16px',
              color: '#9CA3AF',
              lineHeight: '1.8',
              marginBottom: '32px'
            }}>
              {product.description || 'Producto de alta calidad.'}
            </p>

            {/* Stock Status */}
            <div style={{
              padding: '16px',
              background: product.stock > 10
                ? 'rgba(16, 185, 129, 0.1)'
                : product.stock > 0
                ? 'rgba(245, 158, 11, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${
                product.stock > 10
                  ? 'rgba(16, 185, 129, 0.3)'
                  : product.stock > 0
                  ? 'rgba(245, 158, 11, 0.3)'
                  : 'rgba(239, 68, 68, 0.3)'
              }`,
              borderRadius: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                fontSize: '15px',
                fontWeight: '600',
                color: product.stock > 10
                  ? '#10B981'
                  : product.stock > 0
                  ? '#F59E0B'
                  : '#EF4444'
              }}>
                {product.stock > 10
                  ? `✓ En stock (${product.stock} disponibles)`
                  : product.stock > 0
                  ? `⚠ Últimas unidades (${product.stock} disponibles)`
                  : '✗ Agotado'}
              </div>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#F3F4F6',
                  marginBottom: '12px'
                }}>
                  Cantidad
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(26, 31, 58, 0.7)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  padding: '8px',
                  width: 'fit-content'
                }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    style={{
                      width: '44px',
                      height: '44px',
                      background: quantity <= 1 ? 'rgba(107, 114, 128, 0.1)' : 'rgba(102, 126, 234, 0.15)',
                      border: 'none',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      opacity: quantity <= 1 ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (quantity > 1) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (quantity > 1) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.15)';
                      }
                    }}
                  >
                    <Minus size={20} color="#667EEA" />
                  </button>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#F9FAFB',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    style={{
                      width: '44px',
                      height: '44px',
                      background: quantity >= product.stock
                        ? 'rgba(107, 114, 128, 0.1)'
                        : 'rgba(102, 126, 234, 0.15)',
                      border: 'none',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      opacity: quantity >= product.stock ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (quantity < product.stock) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (quantity < product.stock) {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(102, 126, 234, 0.15)';
                      }
                    }}
                  >
                    <Plus size={20} color="#667EEA" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                width: '100%',
                padding: '18px',
                background: product.stock > 0
                  ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
                  : 'rgba(107, 114, 128, 0.3)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: product.stock > 0 ? '0 8px 24px rgba(102, 126, 234, 0.4)' : 'none',
                opacity: product.stock > 0 ? 1 : 0.6,
                marginBottom: '24px'
              }}
              onMouseEnter={(e) => {
                if (product.stock > 0) {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-4px)';
                  target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (product.stock > 0) {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              <ShoppingCart size={22} />
              {product.stock > 0 ? 'Agregar al Carrito' : 'Producto Agotado'}
            </button>

            {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}>
              {[
                { icon: Package, text: 'Envío gratis' },
                { icon: Shield, text: 'Garantía' },
                { icon: Truck, text: '24-48h' }
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    background: 'rgba(26, 31, 58, 0.5)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}
                >
                  <feature.icon size={24} color="#667EEA" style={{ margin: '0 auto 8px' }} />
                  <div style={{
                    fontSize: '13px',
                    color: '#9CA3AF',
                    fontWeight: '600'
                  }}>
                    {feature.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}