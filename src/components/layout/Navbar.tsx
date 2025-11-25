import { Bell, User, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <div style={{
      backgroundColor: '#1F2937',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '29px 32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '12px 20px',
          borderRadius: '12px',
          width: '400px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Search size={18} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Buscar productos, órdenes, clientes..."
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              width: '100%',
              color: '#F3F4F6'
            }}
          />
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Notifications */}
          <button style={{
            position: 'relative',
            padding: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Bell size={22} color="#9CA3AF" />
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              backgroundColor: '#EF4444',
              borderRadius: '50%',
              border: '2px solid #1F2937'
            }}></span>
          </button>

          {/* User Profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              <User size={20} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#F3F4F6', marginBottom: '2px' }}>
                Admin User
              </p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                Administrador
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}