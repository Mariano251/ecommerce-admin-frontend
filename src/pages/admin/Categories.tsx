import { useEffect, useState } from 'react';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../../services/api';
import type { Category } from '../../types';
import { Pencil, Trash2, Plus, Search, FolderOpen } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import CategoryForm from '../../components/categories/CategoryForm';
import type { CategoryFormData } from '../../components/categories/CategoryForm';
import { useToast } from '../../components/ui/ToastContainer';
import ConfirmModal from '../../components/ui/ConfirmModal';

export default function Categories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_key: number) => {
    setCategoryToDelete(id_key);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    
    try {
      await deleteCategory(categoryToDelete);
      loadCategories();
      showToast('Categoría eliminada exitosamente', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      showToast('Error al eliminar la categoría. El backend puede no estar disponible.', 'error');
    } finally {
      setCategoryToDelete(null);
    }
  };

  const handleCreateCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      setIsModalOpen(false);
      loadCategories();
      showToast('Categoría creada exitosamente!', 'success');
    } catch (error) {
      console.error('Error creating category:', error);
      showToast('Error al crear la categoría. Verifica que el backend esté funcionando.', 'error');
    }
  };

  const handleEditCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    
    try {
      await updateCategory(editingCategory.id_key, data);
      setIsModalOpen(false);
      setEditingCategory(null);
      loadCategories();
      showToast('Categoría actualizada exitosamente!', 'success');
    } catch (error) {
      console.error('Error updating category:', error);
      showToast('Error al actualizar la categoría. Verifica que el backend esté funcionando.', 'error');
    }
  };

  // Apply search filter
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(59, 130, 246, 0.3)',
            borderTopColor: '#3B82F6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F9FAFB', marginBottom: '8px' }}>
            Categorías
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '15px' }}>
            Organiza tus productos por categorías
          </p>
        </div>
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
          Nueva Categoría
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
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
            placeholder="Buscar categorías..."
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
      </div>

      {/* Categories Grid/List */}
      {filteredCategories.length === 0 ? (
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
            <FolderOpen size={40} color="#6B7280" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '8px' }}>
            {categories.length === 0 ? 'No hay categorías registradas' : 'No se encontraron categorías'}
          </h3>
          <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '15px' }}>
            {categories.length === 0 ? 'Crea categorías para organizar mejor tus productos' : 'Intenta con otra búsqueda'}
          </p>
          {categories.length === 0 && (
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
              Agregar Categoría
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
                  Nombre
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Descripción
                </th>
                <th style={{ padding: '18px 24px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id_key} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FolderOpen size={24} color="white" />
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#F3F4F6' }}>
                        {category.name}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
                      {category.description}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button 
                        onClick={() => {
                          setEditingCategory(category);
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
                        onClick={() => handleDelete(category.id_key)}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <CategoryForm
          onSubmit={editingCategory ? handleEditCategory : handleCreateCategory}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          initialData={editingCategory ? {
            name: editingCategory.name,
            description: editingCategory.description,
          } : undefined}
        />
      </Modal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="¿Eliminar categoría?"
        message="Esta acción no se puede deshacer. La categoría será eliminada permanentemente."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}