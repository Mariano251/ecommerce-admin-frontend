import { useEffect, useState } from 'react';
import { getClients } from '../../services/api';
import type { Client } from '../../types';
import { Mail, Phone, Users, Calendar } from 'lucide-react';
export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarGradient = (id: number) => {
    const gradients = [
      'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    ];
    return gradients[id % gradients.length];
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(139, 92, 246, 0.3)',
            borderTopColor: '#8B5CF6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9CA3AF', fontWeight: '500' }}>Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F9FAFB', marginBottom: '8px' }}>
          Clientes
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '15px' }}>Gestiona la información de tus clientes</p>
      </div>

      {/* Clients Grid */}
      {clients.length === 0 ? (
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
            <Users size={40} color="#6B7280" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F9FAFB', marginBottom: '8px' }}>
            No hay clientes registrados
          </h3>
          <p style={{ color: '#9CA3AF', fontSize: '15px' }}>
            Los clientes que realicen compras aparecerán aquí
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))',
          gap: '24px'
        }}>
          {clients.map((client) => (
            <div
              key={client.id_key}
              style={{
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '28px',
                transition: 'all 0.3s',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: getAvatarGradient(client.id_key),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  fontSize: '20px',
                  fontWeight: '800',
                  color: 'white',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  flexShrink: 0
                }}>
                  {getInitials(client.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#F9FAFB', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {client.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '500' }}>
                    ID: #{client.id_key}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}>
                    <Mail size={16} color="#60A5FA" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#F3F4F6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <Phone size={16} color="#10B981" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#F3F4F6' }}>{client.phone}</span>
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#9CA3AF'
              }}>
                <Calendar size={14} />
                Registrado: {new Date(client.created_at).toLocaleDateString('es-ES')}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}