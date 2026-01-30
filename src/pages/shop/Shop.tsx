import { useEffect, useState } from 'react';

import type { Product } from '../../types';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/shop/ProductCard';
import FilterSidebar from '../../components/shop/FilterSidebar';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

    const loadProducts = async () => {
      try {
        setLoading(true);
              const productsResponse = await getProducts();
              if (Array.isArray(productsResponse.data)) {
                setProducts(productsResponse.data);
                setFilteredProducts(productsResponse.data);
              } else {
                setProducts([]);
                setFilteredProducts([]);
              }      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }

    // Price filter
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    filtered = filtered.filter(p => p.price >= min && p.price <= max);

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery || selectedCategory || minPrice || maxPrice || sortBy !== 'newest';

  // 1. Renderizado del estado de carga (Spinner)
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '400px',
        background: 'rgba(26, 31, 58, 0.5)',
        borderRadius: '20px',
        margin: '40px auto',
        maxWidth: '1400px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(102, 126, 234, 0.3)',
            borderTopColor: '#667EEA',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            color: '#F9FAFB',
            marginBottom: '12px'
          }}>
            Explora Nuestra
            <span style={{
              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}> Tienda</span>
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#9CA3AF'
          }}>
            Descubre {products.length} productos increíbles
          </p>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '500px',
            minWidth: '250px'
          }}>
            <Search size={20} color="#9CA3AF" style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '12px',
                color: '#F3F4F6',
                fontSize: '14px',
                outline: 'none',
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
            />
          </div>

          {/* Controles de vista y filtros */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* View Toggle */}
            <div style={{
              display: 'flex',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '10px 16px',
                  background: viewMode === 'grid' ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Grid size={18} color={viewMode === 'grid' ? 'white' : '#9CA3AF'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '10px 16px',
                  background: viewMode === 'list' ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <List size={18} color={viewMode === 'list' ? 'white' : '#9CA3AF'} />
              </button>
            </div>

            {/* Filters Button Container */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                style={{
                  padding: '14px 24px',
                  background: isFilterOpen 
                    ? 'rgba(102, 126, 234, 0.15)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isFilterOpen ? '#667EEA' : 'rgba(102, 126, 234, 0.2)'}`,
                  borderRadius: '12px',
                  color: '#F3F4F6',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(102, 126, 234, 0.15)';
                  target.style.borderColor = '#667EEA';
                }}
                onMouseLeave={(e) => {
                  if (!isFilterOpen) {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(255, 255, 255, 0.05)';
                    target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  }
                }}
              >
                <SlidersHorizontal size={18} />
                Filtros
              </button>

              {/* Filter Dropdown */}
              <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#9CA3AF'
          }}>
            Mostrando {filteredProducts.length} productos
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                padding: '8px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#EF4444',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
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
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Products Grid/List */}
        {/* Se eliminó la condición {loading ? (...) : ...} anterior */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fill, minmax(300px, 1fr))' 
              : '1fr',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
                             <ProductCard key={product.id_key} product={product} />            ))}
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
              width: '80px',
              height: '80px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Search size={40} color="#667EEA" />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#F9FAFB',
              marginBottom: '12px'
            }}>
              No se encontraron productos
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#9CA3AF',
              marginBottom: '24px'
            }}>
              Intenta ajustar tus filtros o búsqueda
            </p>
            <button
              onClick={clearFilters}
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
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}