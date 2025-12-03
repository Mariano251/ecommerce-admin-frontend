import { useState } from 'react';
import { Package } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  initialData?: ProductFormData;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url: string;
}

export default function ProductForm({ onSubmit, onCancel, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialData || {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 1,
    image_url: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
              Nombre del Producto *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Laptop HP 15"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '10px',
                color: '#F3F4F6',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.currentTarget.style.borderColor = errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
            />
            {errors.name && (
              <p style={{ marginTop: '6px', fontSize: '13px', color: '#EF4444' }}>{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe el producto..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${errors.description ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '10px',
                color: '#F3F4F6',
                fontSize: '15px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.currentTarget.style.borderColor = errors.description ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
            />
            {errors.description && (
              <p style={{ marginTop: '6px', fontSize: '13px', color: '#EF4444' }}>{errors.description}</p>
            )}
          </div>

          {/* Price and Stock */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
                Precio ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${errors.price ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '10px',
                  color: '#F3F4F6',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.price ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
              />
              {errors.price && (
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#EF4444' }}>{errors.price}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
                Stock *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${errors.stock ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '10px',
                  color: '#F3F4F6',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.currentTarget.style.borderColor = errors.stock ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
              />
              {errors.stock && (
                <p style={{ marginTop: '6px', fontSize: '13px', color: '#EF4444' }}>{errors.stock}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
              Categoría *
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => handleChange('category_id', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#F3F4F6',
                fontSize: '15px',
                outline: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <option value="1" style={{ backgroundColor: '#1F2937' }}>Electrónica</option>
              <option value="2" style={{ backgroundColor: '#1F2937' }}>Ropa</option>
              <option value="3" style={{ backgroundColor: '#1F2937' }}>Hogar</option>
              <option value="4" style={{ backgroundColor: '#1F2937' }}>Deportes</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#F3F4F6' }}>
              URL de Imagen (opcional)
            </label>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#F3F4F6',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Preview */}
          {formData.image_url && (
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px' }}>
                Vista previa:
              </p>
              <img
                src={formData.image_url}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#F3F4F6',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              <Package size={18} />
              {initialData ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}