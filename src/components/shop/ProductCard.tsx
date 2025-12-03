import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { useToast } from '../ui/ToastContainer';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
      showToast(`${product.name} agregado al carrito`, 'success');
    } else {
      showToast('Producto sin stock', 'error');
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: 'rgba(26, 31, 58, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(-8px)';
        target.style.borderColor = '#667EEA';
        target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(0)';
        target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        target.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <img
          src={product.image_url || 'https://via.placeholder.com/400'}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Stock Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '6px 12px',
          background: product.stock > 10 
            ? 'rgba(16, 185, 129, 0.9)' 
            : product.stock > 0 
            ? 'rgba(245, 158, 11, 0.9)' 
            : 'rgba(239, 68, 68, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '700',
          color: 'white'
        }}>
          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category */}
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#8B5CF6',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '8px'
        }}>
          Categoría #{product.category_id}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#F9FAFB',
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: '#9CA3AF',
          marginBottom: '16px',
          lineHeight: '1.6',
          flex: 1
        }}>
          {product.description.substring(0, 80)}...
        </p>

        {/* Reviews */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill={star <= 4 ? '#F59E0B' : 'none'}
                color={star <= 4 ? '#F59E0B' : '#6B7280'}
              />
            ))}
          </div>
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
            4.0 (12 reseñas)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ${product.price.toFixed(2)}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              padding: '12px',
              background: product.stock > 0 
                ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' 
                : 'rgba(107, 114, 128, 0.3)',
              border: 'none',
              borderRadius: '12px',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: product.stock > 0 ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
              opacity: product.stock > 0 ? 1 : 0.5
            }}
            onMouseEnter={(e) => {
              if (product.stock > 0) {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1.05)';
                target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock > 0) {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = 'scale(1)';
                target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            <ShoppingCart size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}