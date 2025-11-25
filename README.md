# 🛍️ E-Commerce Admin Dashboard

Dashboard de administración moderno y completo para gestionar tu tienda online. Construido con React, TypeScript y diseño glassmorphism.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)


## 🌐 **Demo en Vivo**

**🚀 [Ver Demo](https://ecommerce-admin-frontend-flax.vercel.app)**

Accede al dashboard completo en producción. El backend puede no estar disponible, pero la aplicación usa datos de prueba para demostración.

**Funcionalidades disponibles en la demo:**
- ✅ Dashboard interactivo con gráficos
- ✅ Gestión completa de productos
- ✅ Gestión completa de categorías
- ✅ Sistema de notificaciones
- ✅ Filtros y búsqueda avanzada
- ✅ Exportar datos a CSV


## 🚀 **Características Principales**

### ✨ **Funcionalidades Core**
- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- 📦 **Gestión de Productos** (CRUD completo)
- 🏷️ **Gestión de Categorías** (CRUD completo)
- 🔍 **Búsqueda y filtros avanzados**
- 📄 **Paginación inteligente** (5, 10, 15, 25, 50 items)
- 📤 **Exportar datos a CSV**
- 🔔 **Sistema de notificaciones Toast**
- ⚡ **Skeleton loaders** para mejor UX
- 🎨 **Modales elegantes** con animaciones

### 🎯 **Gestión de Productos**
- ✅ Crear, editar y eliminar productos
- ✅ Filtros por: categoría, precio, stock
- ✅ Ordenar por: nombre, precio (asc/desc), stock
- ✅ Búsqueda en tiempo real
- ✅ Vista previa de imágenes
- ✅ Indicadores visuales de stock (En Stock, Bajo Stock, Sin Stock)

### 🏷️ **Gestión de Categorías**
- ✅ CRUD completo de categorías
- ✅ Búsqueda de categorías
- ✅ Íconos personalizados por categoría
- ✅ Descripción detallada

### 📊 **Dashboard Analytics**
- ✅ Estadísticas generales (productos, órdenes, clientes, ingresos)
- ✅ Gráfico de ventas mensuales
- ✅ Distribución de productos por categoría
- ✅ Actividad reciente
- ✅ Acciones rápidas

---

## 🛠️ **Tecnologías Utilizadas**

### **Frontend Core**
| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **React** | 18.3.1 | Librería de UI |
| **TypeScript** | 5.6.2 | Tipado estático |
| **Vite** | 6.0.1 | Build tool y dev server |
| **React Router DOM** | 7.1.1 | Enrutamiento |

### **UI & Visualización**
| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Lucide React** | 0.468.0 | Iconos modernos |
| **Recharts** | 2.15.0 | Gráficos interactivos |

### **HTTP & API**
| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Axios** | 1.7.9 | Cliente HTTP |

### **Estilos**
- ✨ **CSS-in-JS** (Inline styles)
- 🎨 **Glassmorphism** design
- 🌈 **Gradientes dinámicos**
- 💫 **Animaciones CSS personalizadas**

---

## 📁 **Estructura del Proyecto**
```
ecommerce-admin/
├── public/                      # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # Menú lateral de navegación
│   │   │   ├── Navbar.tsx      # Barra superior
│   │   │   └── Layout.tsx      # Layout principal
│   │   ├── ui/
│   │   │   ├── Modal.tsx       # Modal reutilizable
│   │   │   ├── Toast.tsx       # Notificación individual
│   │   │   ├── ToastContainer.tsx  # Contenedor y Context de Toasts
│   │   │   ├── SkeletonLoader.tsx  # Animaciones de carga
│   │   │   └── ConfirmModal.tsx    # Modal de confirmación
│   │   ├── products/
│   │   │   └── ProductForm.tsx # Formulario de productos
│   │   └── categories/
│   │       └── CategoryForm.tsx # Formulario de categorías
│   ├── pages/
│   │   ├── Dashboard.tsx       # Página principal con estadísticas
│   │   ├── Products.tsx        # Gestión de productos
│   │   └── Categories.tsx      # Gestión de categorías
│   ├── services/
│   │   └── api.ts              # Configuración de Axios y endpoints
│   ├── types/
│   │   └── index.ts            # Tipos de TypeScript
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 **Diseño y UX**

### **Paleta de Colores**
```typescript
// Backgrounds
Background Principal: #0F172A (Slate 900)
Background Secundario: #1E293B (Slate 800)
Cards: rgba(31, 41, 55, 0.5) con blur

// Gradientes
Primary: linear-gradient(135deg, #3B82F6, #2563EB) // Azul
Success: linear-gradient(135deg, #10B981, #059669) // Verde
Warning: linear-gradient(135deg, #F59E0B, #D97706) // Naranja
Danger: linear-gradient(135deg, #EF4444, #DC2626)  // Rojo
Purple: linear-gradient(135deg, #8B5CF6, #7C3AED) // Morado

// Textos
Texto Principal: #F9FAFB
Texto Secundario: #9CA3AF
```

### **Animaciones**
- ⚡ Shimmer loading (Skeleton loaders)
- 💫 Slide-in modals
- 🎯 Hover effects en cards
- 📊 Animaciones de gráficos
- 🔔 Toast notifications con fade-in/out

---

## 🔌 **API Integration**

### **Base URL**
```typescript
const API_URL = 'https://ecommerce-api2-qmpe.onrender.com';
```

### **Endpoints Disponibles**

#### **Productos**
```typescript
GET    /products          // Obtener todos los productos
GET    /products/:id      // Obtener un producto
POST   /products          // Crear producto
PUT    /products/:id      // Actualizar producto
DELETE /products/:id      // Eliminar producto
```

#### **Categorías**
```typescript
GET    /categories        // Obtener todas las categorías
POST   /categories        // Crear categoría
PUT    /categories/:id    // Actualizar categoría
DELETE /categories/:id    // Eliminar categoría
```

#### **Clientes**
```typescript
GET    /clients           // Obtener todos los clientes
```

#### **Órdenes**
```typescript
GET    /orders            // Obtener todas las órdenes
PUT    /orders/:id        // Actualizar estado de orden
```

---

## 📦 **Instalación y Uso**

### **Prerequisitos**
- Node.js 18+ 
- npm o yarn

### **1. Clonar el repositorio**
```bash
git clone https://github.com/Mariano251/ecommerce-admin-frontend.git
cd ecommerce-admin-frontend
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Configurar variables de entorno (opcional)**
Si necesitas cambiar la URL del backend, editá `src/services/api.ts`:
```typescript
const API_URL = 'TU_URL_DEL_BACKEND';
```

### **4. Ejecutar en desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### **5. Build para producción**
```bash
npm run build
```

### **6. Preview del build**
```bash
npm run preview
```

---

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build
npm run build

# Subir la carpeta dist/ a Netlify
```

---

## 📊 **Funcionalidades Detalladas**

### **Sistema de Notificaciones Toast**
```typescript
// Uso
import { useToast } from './components/ui/ToastContainer';

const { showToast } = useToast();

// Tipos disponibles
showToast('Mensaje de éxito', 'success');
showToast('Mensaje de error', 'error');
showToast('Mensaje de advertencia', 'warning');
showToast('Mensaje informativo', 'info');
```

### **Filtros de Productos**
- **Por Categoría**: Todas, Electrónica, Ropa, Hogar, Deportes
- **Por Precio**: Rango mínimo y máximo
- **Por Stock**: Todos, En Stock (>10), Bajo Stock (1-10), Sin Stock (0)
- **Ordenamiento**: Nombre, Precio (asc/desc), Stock

### **Exportar a CSV**
Los archivos exportados incluyen:
- ID del producto
- Nombre
- Descripción
- Precio
- Stock
- Categoría ID
- URL de imagen

Nombre del archivo: `productos_YYYY-MM-DD.csv`

---

## 🎯 **Tipos de Datos (TypeScript)**

### **Product**
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
```

### **Category**
```typescript
interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
```

### **Client**
```typescript
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}
```

### **Order**
```typescript
interface Order {
  id: number;
  client_id: number;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}
```

---

## 🔧 **Configuración de Desarrollo**

### **Scripts disponibles**
```json
{
  "dev": "vite",                    // Desarrollo
  "build": "tsc -b && vite build",  // Build producción
  "lint": "eslint .",               // Linter
  "preview": "vite preview"         // Preview del build
}
```

### **TSConfig**
El proyecto usa TypeScript estricto con las siguientes configuraciones:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

---

## 🐛 **Troubleshooting**

### **Error: Cannot connect to backend**
**Solución**: El backend puede estar apagado o la URL es incorrecta. El frontend usa datos de prueba (mock data) automáticamente cuando el backend no está disponible.

### **Error: Module not found**
**Solución**: Ejecutá `npm install` para instalar todas las dependencias.

### **Error: Port already in use**
**Solución**: Cambiá el puerto en `vite.config.ts` o cerrá la aplicación que está usando el puerto 5173.

---

## 📈 **Roadmap Futuro**

- [ ] 📱 Responsive design para móviles
- [ ] 🌙 Modo oscuro/claro
- [ ] 🔐 Sistema de autenticación
- [ ] 👥 Gestión de usuarios y roles
- [ ] 📧 Notificaciones por email
- [ ] 📊 Más gráficos y reportes
- [ ] 🔍 Búsqueda avanzada con filtros combinados
- [ ] 📸 Subida de imágenes a la nube
- [ ] 🛒 Gestión completa de órdenes
- [ ] 💳 Integración de pagos

---

## 👨‍💻 **Desarrollado por**

**Mariano Lopez Tubaro**

- GitHub: [@Mariano251](https://github.com/Mariano251)
- Proyecto: E-Commerce Admin Dashboard
- Año: 2024

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 **Agradecimientos**

- React Team por la increíble librería
- Vercel por el hosting gratuito
- Lucide por los iconos
- Recharts por los gráficos
- La comunidad de código abierto

---

## 📞 **Soporte**

Si encontrás algún bug o tenés sugerencias, por favor abrí un issue en GitHub:
[https://github.com/Mariano251/ecommerce-admin-frontend/issues](https://github.com/Mariano251/ecommerce-admin-frontend/issues)

---

**⭐ Si te gustó el proyecto, dejá una estrella en GitHub!**