import { useState } from 'react';

export interface CategoryFormData {
  name: string;
  description: string;
}

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  initialData?: CategoryFormData;
}

export default function CategoryForm({ onSubmit, onCancel, initialData }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CategoryFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Name */}
      <div>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#F3F4F6' 
        }}>
          Nombre de la Categoría *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ej: Electrónica"
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '10px',
            color: '#F3F4F6',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
          onBlur={(e) => e.target.style.borderColor = errors.name ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
        />
        {errors.name && (
          <span style={{ fontSize: '13px', color: '#EF4444', marginTop: '4px', display: 'block' }}>
            {errors.name}
          </span>
        )}
      </div>

      {/* Description */}
      <div>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#F3F4F6' 
        }}>
          Descripción *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe la categoría..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${errors.description ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '10px',
            color: '#F3F4F6',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
          onBlur={(e) => e.target.style.borderColor = errors.description ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'}
        />
        {errors.description && (
          <span style={{ fontSize: '13px', color: '#EF4444', marginTop: '4px', display: 'block' }}>
            {errors.description}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
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
            padding: '12px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          {initialData ? 'Actualizar Categoría' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
}