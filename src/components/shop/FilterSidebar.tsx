import { X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sortBy,
  onSortChange,
  onClearFilters
}: FilterSidebarProps) {
  if (!isOpen) return null;

  const categories = [
    { id: null, name: 'Todas las Categorías' },
    { id: 1, name: 'Electrónica' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Hogar' },
    { id: 4, name: 'Deportes' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          zIndex: 998
        }}
      ></div>

      {/* Dropdown Panel */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          width: 'max-content',
          minWidth: '800px',
          maxWidth: '90vw',
          background: 'rgba(10, 14, 39, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '16px',
          zIndex: 999,
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          animation: 'slideDown 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#F9FAFB',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '4px',
              height: '20px',
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              borderRadius: '2px'
            }}></span>
            Filtros
          </h3>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.15)';
              target.style.borderColor = '#EF4444';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(255, 255, 255, 0.05)';
              target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }}
          >
            <X size={16} color="#F3F4F6" />
          </button>
        </div>

        {/* Filtros en Grid Horizontal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Categoría */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9CA3AF',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Categoría
            </label>
            <select
              value={selectedCategory === null ? '' : selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value === '' ? null : Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 12px',
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
              {categories.map((category) => (
                <option key={category.id || 'all'} value={category.id === null ? '' : category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio Mínimo */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9CA3AF',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Precio Mínimo
            </label>
            <input
              type="number"
              placeholder="$0"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
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

          {/* Precio Máximo */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9CA3AF',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Precio Máximo
            </label>
            <input
              type="number"
              placeholder="$9999"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
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

          {/* Ordenar Por */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9CA3AF',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Ordenar Por
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
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
              <option value="newest">Más Recientes</option>
              <option value="name">Nombre (A-Z)</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Botón Limpiar Filtros */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '16px',
          borderTop: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <button
            onClick={() => {
              onClearFilters();
              onClose();
            }}
            style={{
              padding: '10px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#EF4444',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            <X size={14} />
            Limpiar Filtros
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}