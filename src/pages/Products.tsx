import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/api';
import type { Product } from '../types';
import { Pencil, Trash2, Plus, Search, Package, SlidersHorizontal, Download } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ProductForm from '../components/products/ProductForm';
import type { ProductFormData } from '../components/products/ProductForm';
import { useToast } from '../components/ui/ToastContainer';
import { ProductsTableSkeleton } from '../components/ui/SkeletonLoader';
import ConfirmModal from '../components/ui/ConfirmModal';

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'stock';
type StockFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

export default function Products() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      // Mock data para pruebas cuando el backend no está disponible
      setProducts([
        {
          id: 1,
          name: 'Laptop HP Pavilion 15',
          description: 'Laptop potente con Intel Core i7, 16GB RAM, 512GB SSD',
          price: 899.99,
          stock: 15,
          category_id: 1,
          image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: 'iPhone 15 Pro',
          description: 'Smartphone Apple con chip A17 Pro y cámara de 48MP',
          price: 1199.99,
          stock: 8,
          category_id: 1,
          image_url: 'https://images.unsplash.com/photo-1592286927505-5589e5ca5e1c?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Camiseta Nike Deportiva',
          description: 'Camiseta transpirable para running y entrenamiento',
          price: 29.99,
          stock: 50,
          category_id: 2,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          name: 'Smart TV Samsung 55"',
          description: 'Televisor 4K UHD con HDR y Smart TV integrado',
          price: 649.99,
          stock: 12,
          category_id: 1,
          image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          name: 'Sofá Moderno 3 Plazas',
          description: 'Sofá cómodo de tela gris con patas de madera',
          price: 549.99,
          stock: 5,
          category_id: 3,
          image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 6,
          name: 'Zapatillas Adidas Running',
          description: 'Zapatillas deportivas con tecnología Boost',
          price: 89.99,
          stock: 25,
          category_id: 4,
          image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 7,
          name: 'Auriculares Sony WH-1000XM5',
          description: 'Auriculares inalámbricos con cancelación de ruido',
          price: 349.99,
          stock: 0,
          category_id: 1,
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 8,
          name: 'Lámpara de Mesa Moderna',
          description: 'Lámpara LED regulable con diseño minimalista',
          price: 45.99,
          stock: 18,
          category_id: 3,
          image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 9,
          name: 'Mochila Deportiva Nike',
          description: 'Mochila espaciosa con compartimento para laptop',
          price: 59.99,
          stock: 30,
          category_id: 4,
          image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 10,
          name: 'Reloj Smartwatch Apple Watch',
          description: 'Apple Watch Series 9 con GPS y monitor de salud',
          price: 429.99,
          stock: 7,
          category_id: 1,
          image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setProductToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete);
      loadProducts();
      showToast('Producto eliminado exitosamente', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Error al eliminar el producto. El backend puede no estar disponible.', 'error');
    } finally {
      setProductToDelete(null);
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await createProduct(data);
      setIsModalOpen(false);
      loadProducts();
      showToast('Producto creado exitosamente!', 'success');
    } catch (error) {
      console.error('Error creating product:', error);
      showToast('Error al crear el producto. Verifica que el backend esté funcionando.', 'error');
    }
  };

  const handleEditProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      await updateProduct(editingProduct.id, data);
      setIsModalOpen(false);
      setEditingProduct(null);
      loadProducts();
      showToast('Producto actualizado exitosamente!', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      showToast('Error al actualizar el producto. Verifica que el backend esté funcionando.', 'error');
    }
  };

  const exportToCSV = () => {
    // Preparar datos
    const csvData = filteredProducts.map(product => ({
      ID: product.id,
      Nombre: product.name,
      Descripción: product.description,
      Precio: product.price,
      Stock: product.stock,
      Categoría: product.category_id,
      'URL Imagen': product.image_url || '',
    }));

    // Crear encabezados
    const headers = Object.keys(csvData[0]);
    const csvRows = [];

    // Agregar encabezados
    csvRows.push(headers.join(','));

    // Agregar filas
    for (const row of csvData) {
      const values = headers.map(header => {
        const value = row[header as keyof typeof row];
        // Escapar comillas y envolver en comillas si contiene coma
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    // Crear blob y descargar
    const csvString = csvRows.join('\n');
    const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `productos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Productos exportados exitosamente!', 'success');
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setStockFilter('all');
    setSortBy('name');
    setSearchTerm('');
  };

  // Apply filters
  const filteredProducts = products
    .filter(product => {
      // Search
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category
      const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
      
      // Price range
      const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
      
      // Stock filter
      let matchesStock = true;
      if (stockFilter === 'in-stock') matchesStock = product.stock > 10;
      if (stockFilter === 'low-stock') matchesStock = product.stock > 0 && product.stock <= 10;
      if (stockFilter === 'out-of-stock') matchesStock = product.stock === 0;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, stockFilter, sortBy]);

  if (loading) {
    return (
      <div style={{ padding: '0' }}>
        {/* Header Skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{
              height: '32px',
              width: '200px',
              borderRadius: '8px',
              marginBottom: '8px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}></div>
            <div style={{
              height: '16px',
              width: '150px',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.1s'
            }}></div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              height: '46px',
              width: '140px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.2s'
            }}></div>
            <div style={{
              height: '46px',
              width: '160px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.3s'
            }}></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            animationDelay: '0.4s'
          }}></div>
        </div>

        {/* Table Skeleton */}
        <ProductsTableSkeleton />

        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F9FAFB', marginBottom: '8px' }}>
            Productos
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '15px' }}>
            {filteredProducts.length} de {products.length} productos
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={exportToCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#F3F4F6',
              padding: '14px 20px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
            }}
          >
            <Download size={20} />
            Exportar CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              color: 'white',
              padding: '14px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
            }}
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {/* Search */}
          <div style={{
            flex: 1,
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Search size={20} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#F3F4F6',
                backgroundColor: 'transparent'
              }}
            />
          </div>

          {/* Toggle Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: showFilters ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'rgba(31, 41, 55, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '16px 24px',
              color: showFilters ? 'white' : '#F3F4F6',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
          >
            <SlidersHorizontal size={20} />
            Filtros
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div style={{
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(10px)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {/* Category Filter */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#F3F4F6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Todas</option>
                  <option value="1" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Electrónica</option>
                  <option value="2" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Ropa</option>
                  <option value="3" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Hogar</option>
                  <option value="4" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Deportes</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Precio Mínimo
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#F3F4F6',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Precio Máximo
                </label>
                <input
                  type="number"
                  placeholder="$999"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#F3F4F6',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Stock Filter */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Stock
                </label>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as StockFilter)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#F3F4F6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="all" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Todos</option>
                  <option value="in-stock" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>En Stock (&gt;10)</option>
                  <option value="low-stock" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Bajo Stock (1-10)</option>
                  <option value="out-of-stock" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Sin Stock (0)</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Ordenar Por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#F3F4F6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="name" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Nombre</option>
                  <option value="price-asc" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Precio: Menor a Mayor</option>
                  <option value="price-desc" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Precio: Mayor a Menor</option>
                  <option value="stock" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>Stock</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '10px',
                color: '#EF4444',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Products Table/Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '64px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Package size={40} color="#6B7280" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '8px' }}>
            {products.length === 0 ? 'No hay productos registrados' : 'No se encontraron productos'}
          </h3>
          <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '15px' }}>
            {products.length === 0 ? 'Comienza agregando tu primer producto' : 'Intenta ajustar los filtros'}
          </p>
          {products.length === 0 ? (
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '10px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Agregar Producto
            </button>
          ) : (
            <button 
              onClick={clearFilters}
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '10px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      ) : (
        <div style={{
          background: 'rgba(31, 41, 55, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'rgba(0, 0, 0, 0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <tr>
                <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Producto
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Precio
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Stock
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Categoría
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={product.image_url || 'https://via.placeholder.com/50'}
                        alt={product.name}
                        style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      />
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                          {product.description.substring(0, 40)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#10B981' }}>
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      backgroundColor: product.stock > 10 ? 'rgba(16, 185, 129, 0.15)' : product.stock > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: product.stock > 10 ? '#10B981' : product.stock > 0 ? '#F59E0B' : '#EF4444',
                      border: `1px solid ${product.stock > 10 ? 'rgba(16, 185, 129, 0.3)' : product.stock > 0 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                    }}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '14px', color: '#9CA3AF' }}>
                    Categoría #{product.category_id}
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setIsModalOpen(true);
                        }}
                        style={{
                          padding: '10px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '10px',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Pencil size={18} color="#60A5FA" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: '10px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '10px',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div style={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Items per page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: '500' }}>
              Mostrar:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#F3F4F6',
                fontSize: '14px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value="5" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>5 por página</option>
              <option value="10" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>10 por página</option>
              <option value="15" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>15 por página</option>
              <option value="25" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>25 por página</option>
              <option value="50" style={{ backgroundColor: '#1F2937', color: '#F3F4F6' }}>50 por página</option>
            </select>
            <span style={{ color: '#9CA3AF', fontSize: '14px' }}>
              Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length}
            </span>
          </div>

          {/* Page numbers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                backgroundColor: currentPage === 1 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: currentPage === 1 ? '#6B7280' : '#F3F4F6',
                fontSize: '14px',
                fontWeight: '600',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }
              }}
            >
              Anterior
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '8px 14px',
                  backgroundColor: currentPage === page ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'rgba(31, 41, 55, 0.5)',
                  background: currentPage === page ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: currentPage === page ? 'white' : '#F3F4F6',
                  fontSize: '14px',
                  fontWeight: currentPage === page ? '700' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                  minWidth: '36px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                  }
                }}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                backgroundColor: currentPage === totalPages ? 'rgba(255, 255, 255, 0.03)' : 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: currentPage === totalPages ? '#6B7280' : '#F3F4F6',
                fontSize: '14px',
                fontWeight: '600',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }
              }}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <ProductForm
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct ? {
            name: editingProduct.name,
            description: editingProduct.description,
            price: editingProduct.price,
            stock: editingProduct.stock,
            category_id: editingProduct.category_id,
            image_url: editingProduct.image_url || ''
          } : undefined}
        />
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}