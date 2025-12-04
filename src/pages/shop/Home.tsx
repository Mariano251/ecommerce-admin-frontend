import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalProducts, getLocalCategories } from '../../services/localStorage';
import type { Product, Category } from '../../types';
import ProductCard from '../../components/shop/ProductCard';
import { ArrowRight, Sparkles, Zap, ShieldCheck, TrendingUp, Laptop, Shirt, House, Dumbbell, Package } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Electrónica', description: 'Lo último en tecnología', created_at: '', updated_at: '' },
    { id: 2, name: 'Ropa', description: 'Moda y estilo', created_at: '', updated_at: '' },
    { id: 3, name: 'Hogar', description: 'Decora tu espacio', created_at: '', updated_at: '' },
    { id: 4, name: 'Deportes', description: 'Mantente activo', created_at: '', updated_at: '' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  

  const loadData = async () => {
  try {
    // Cargar productos desde localStorage
    const localProducts = getLocalProducts();
    setFeaturedProducts(localProducts.slice(0, 8));
    
    // Cargar categorías desde localStorage
    const localCategories = getLocalCategories();
    if (localCategories.length > 0) {
      setCategories(localCategories.slice(0, 4));
    }
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    setLoading(false);
  }
  };
  const getCategoryIcon = (categoryId: number) => {
    const icons = {
      1: Laptop,
      2: Shirt,
      3: House,
      4: Dumbbell,
    };
    return icons[categoryId as keyof typeof icons] || Package;
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      { from: '#667EEA', to: '#764BA2' },
      { from: '#F093FB', to: '#F5576C' },
      { from: '#4FACFE', to: '#00F2FE' },
      { from: '#43E97B', to: '#38F9D7' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '120px 24px 80px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '50px',
                width: 'fit-content'
              }}>
                <Sparkles size={16} color="#667EEA" />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#8B5CF6'
                }}>
                  Nueva Colección 2026
                </span>
              </div>

              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                lineHeight: '1.1',
                color: '#F9FAFB',
                margin: 0
              }}>
                Descubre lo
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Extraordinario
                </span>
              </h1>

              <p style={{
                fontSize: '18px',
                color: '#9CA3AF',
                lineHeight: '1.8',
                maxWidth: '500px'
              }}>
                Explora nuestra selección premium de productos con los mejores precios del mercado. 
                Calidad garantizada y envío gratis en compras mayores a $500.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => navigate('/shop')}
                  style={{
                    padding: '18px 36px',
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    border: 'none',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.transform = 'translateY(-4px)';
                    target.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  Explorar Tienda
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => {
                    const section = document.getElementById('featured');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '18px 36px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '14px',
                    color: '#F3F4F6',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(102, 126, 234, 0.15)';
                    target.style.borderColor = '#667EEA';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.background = 'rgba(255, 255, 255, 0.05)';
                    target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  }}
                >
                  Ver Destacados
                </button>
              </div>

              <div style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
                flexWrap: 'wrap'
              }}>
                {[
                  { value: '500+', label: 'Productos' },
                  { value: '10k+', label: 'Clientes' },
                  { value: '4.8★', label: 'Rating' }
                ].map((stat, index) => (
                  <div key={index}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#9CA3AF',
                      marginTop: '4px'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Floating Category Cards */}
            <div style={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {categories[0] && (() => {
                const Icon = getCategoryIcon(categories[0].id);
                const colors = getCategoryColor(0);
                return (
                  <div
                    onClick={() => navigate('/shop')}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      right: '10%',
                      width: '220px',
                      background: `linear-gradient(135deg, ${colors.from}15 0%, ${colors.to}15 100%)`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.from}40`,
                      borderRadius: '24px',
                      padding: '24px',
                      animation: 'float 6s ease-in-out infinite',
                      boxShadow: `0 20px 60px ${colors.from}30`,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-10px) scale(1.05)';
                      target.style.boxShadow = `0 25px 70px ${colors.from}40`;
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0) scale(1)';
                      target.style.boxShadow = `0 20px 60px ${colors.from}30`;
                    }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      boxShadow: `0 10px 30px ${colors.from}40`
                    }}>
                      <Icon size={40} color="white" />
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#F9FAFB',
                      textAlign: 'center',
                      marginBottom: '8px'
                    }}>
                      {categories[0].name}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#9CA3AF',
                      textAlign: 'center',
                      lineHeight: '1.5'
                    }}>
                      {categories[0].description}
                    </p>
                  </div>
                );
              })()}

              {categories[1] && (() => {
                const Icon = getCategoryIcon(categories[1].id);
                const colors = getCategoryColor(1);
                return (
                  <div
                    onClick={() => navigate('/shop')}
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '5%',
                      width: '200px',
                      background: `linear-gradient(135deg, ${colors.from}15 0%, ${colors.to}15 100%)`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.from}40`,
                      borderRadius: '24px',
                      padding: '20px',
                      animation: 'float 8s ease-in-out infinite',
                      animationDelay: '1s',
                      boxShadow: `0 20px 60px ${colors.from}30`,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-10px) scale(1.05)';
                      target.style.boxShadow = `0 25px 70px ${colors.from}40`;
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0) scale(1)';
                      target.style.boxShadow = `0 20px 60px ${colors.from}30`;
                    }}
                  >
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: `0 10px 30px ${colors.from}40`
                    }}>
                      <Icon size={35} color="white" />
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '800',
                      color: '#F9FAFB',
                      textAlign: 'center',
                      marginBottom: '6px'
                    }}>
                      {categories[1].name}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#9CA3AF',
                      textAlign: 'center',
                      lineHeight: '1.4'
                    }}>
                      {categories[1].description}
                    </p>
                  </div>
                );
              })()}

              {categories[2] && (() => {
                const Icon = getCategoryIcon(categories[2].id);
                const colors = getCategoryColor(2);
                return (
                  <div
                    onClick={() => navigate('/shop')}
                    style={{
                      position: 'absolute',
                      top: '5%',
                      left: '15%',
                      width: '140px',
                      background: `linear-gradient(135deg, ${colors.from}15 0%, ${colors.to}15 100%)`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.from}40`,
                      borderRadius: '20px',
                      padding: '16px',
                      animation: 'float 7s ease-in-out infinite',
                      animationDelay: '0.5s',
                      boxShadow: `0 15px 40px ${colors.from}25`,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(-8px) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Icon size={26} color="white" />
                    </div>
                    <h3 style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#F9FAFB',
                      textAlign: 'center'
                    }}>
                      {categories[2].name}
                    </h3>
                  </div>
                );
              })()}

              <div style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 4s ease-in-out infinite',
                zIndex: -1
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(26, 31, 58, 0.3)',
        borderTop: '1px solid rgba(102, 126, 234, 0.1)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: Zap,
                title: 'Envío Rápido',
                description: 'Recibe tus productos en 24-48 horas'
              },
              {
                icon: ShieldCheck,
                title: 'Compra Segura',
                description: 'Protección garantizada en cada compra'
              },
              {
                icon: TrendingUp,
                title: 'Mejor Precio',
                description: 'Los precios más competitivos del mercado'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '32px',
                  background: 'rgba(26, 31, 58, 0.5)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '20px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-8px)';
                  target.style.borderColor = '#667EEA';
                  target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                }}>
                  <feature.icon size={32} color="white" />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#F9FAFB',
                  marginBottom: '12px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#9CA3AF',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" style={{
        padding: '100px 24px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#F9FAFB',
              marginBottom: '16px'
            }}>
              Productos
              <span style={{
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}> Destacados</span>
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Descubre nuestra selección de productos más populares con las mejores ofertas
            </p>
          </div>

          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  style={{
                    height: '450px',
                    background: 'rgba(26, 31, 58, 0.5)',
                    borderRadius: '20px',
                    animation: 'shimmer 2s infinite'
                  }}
                ></div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: '#9CA3AF'
            }}>
              <p style={{ fontSize: '18px' }}>No hay productos destacados disponibles</p>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '60px'
            }}>
              <button
                onClick={() => navigate('/shop')}
                style={{
                  padding: '18px 48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '14px',
                  color: '#F3F4F6',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
                  target.style.borderColor = 'transparent';
                  target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(255, 255, 255, 0.05)';
                  target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  target.style.transform = 'translateY(0)';
                }}
              >
                Ver Todos los Productos
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}