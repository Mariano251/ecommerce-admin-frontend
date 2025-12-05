export function ProductRowSkeleton() {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <td style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Image skeleton */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}></div>
          <div style={{ flex: 1 }}>
            {/* Title skeleton */}
            <div style={{
              height: '16px',
              width: '60%',
              borderRadius: '4px',
              marginBottom: '8px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}></div>
            {/* Description skeleton */}
            <div style={{
              height: '14px',
              width: '80%',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.1s'
            }}></div>
          </div>
        </div>
      </td>
      <td style={{ padding: '20px 24px' }}>
        <div style={{
          height: '16px',
          width: '60px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          animationDelay: '0.2s'
        }}></div>
      </td>
      <td style={{ padding: '20px 24px' }}>
        <div style={{
          height: '28px',
          width: '100px',
          borderRadius: '20px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          animationDelay: '0.3s'
        }}></div>
      </td>
      <td style={{ padding: '20px 24px' }}>
        <div style={{
          height: '14px',
          width: '80px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          animationDelay: '0.4s'
        }}></div>
      </td>
      <td style={{ padding: '20px 24px', textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            animationDelay: '0.5s'
          }}></div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            animationDelay: '0.6s'
          }}></div>
        </div>
      </td>

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
    </tr>
  );
}

export function ProductsTableSkeleton() {
  return (
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
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}