# 🛍️ E-Commerce Full Stack - Admin & Shop


## 🌐 **Demo en Vivo**

**🚀 [Ver Demo](https://ecommerce-admin-frontend-flax.vercel.app)**


Sistema completo de comercio electrónico con panel de administración y tienda online. Desarrollado con **React + TypeScript + Vite**, utilizando **localStorage** como base de datos local.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![Docker](https://img.shields.io/badge/Docker-Compatible-2496ED?logo=docker)

---

## 📋 **Tabla de Contenidos**

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Métodos de Ejecución](#-métodos-de-ejecución)
  - [Opción 1: Ejecución Local (npm)](#opción-1-ejecución-local-npm)
  - [Opción 2: Ejecución con Docker](#opción-2-ejecución-con-docker)
  - [Opción 3: Docker Compose](#opción-3-docker-compose)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Gestión de Datos](#-gestión-de-datos)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Uso del Sistema](#-uso-del-sistema)
- [Personalización](#-personalización)
- [Troubleshooting](#-troubleshooting)
- [Variables de Entorno](#-variables-de-entorno)
- [Despliegue en Producción](#-despliegue-en-producción)

---

## ✨ **Características**

### **Tienda Online (Shop)**
- 🛒 Catálogo de productos con imágenes
- 🔍 Búsqueda en tiempo real
- 🏷️ Filtros por categoría, precio y stock
- 📱 Diseño responsive y moderno
- 🛍️ Carrito de compras funcional
- ✅ Proceso de checkout completo
- 📦 Historial de pedidos
- ⭐ Sistema de calificaciones

### **Panel de Administración**
- 📊 Dashboard con estadísticas en tiempo real
- 📦 Gestión completa de productos (CRUD)
- 📋 Gestión de pedidos con cambio de estados
- 🏷️ Gestión de categorías
- 📈 Visualización de ingresos totales
- ⚠️ Alertas de stock bajo
- 🔄 Sincronización automática con la tienda

---

## 🚀 **Tecnologías**

### **Frontend**
- **React 18** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación
- **Lucide React** - Iconos
- **Axios** - HTTP client

### **Estilos**
- **CSS-in-JS** - Estilos inline
- **Tailwind CSS** - Utility classes
- **Animaciones CSS** - Transiciones suaves

### **Estado y Datos**
- **Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos
- **Custom Hooks** - Lógica reutilizable

### **DevOps**
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación
- **Nginx** - Servidor web (producción)

---

## 📦 **Requisitos Previos**

### **Para ejecución local:**
- **Node.js** 16+ → [Descargar](https://nodejs.org/)
- **npm** 8+ (incluido con Node.js)

### **Para ejecución con Docker:**
- **Docker** 20+ → [Descargar](https://www.docker.com/)
- **Docker Compose** 2+ (incluido con Docker Desktop)

### **Verificar instalaciones:**
```bash
# Node.js y npm
node --version    # Debe mostrar v16.x.x o superior
npm --version     # Debe mostrar 8.x.x o superior

# Docker
docker --version         # Debe mostrar Docker version 20.x.x o superior
docker-compose --version # Debe mostrar Docker Compose version 2.x.x o superior
```

---

## 🔧 **Instalación**

### **1. Clonar el repositorio**
```bash
# Con HTTPS
git clone https://github.com/tu-usuario/ecommerce-admin-frontend.git

# O con SSH
git clone git@github.com:tu-usuario/ecommerce-admin-frontend.git

# Entrar al directorio
cd ecommerce-admin-frontend-main
```

### **2. Instalar dependencias** (solo para ejecución local)
```bash
npm install
```

O con yarn:
```bash
yarn install
```

**Tiempo estimado:** 2-3 minutos

---

## ▶️ **Métodos de Ejecución**

Hay 3 formas de ejecutar el proyecto:

---

### **Opción 1: Ejecución Local (npm)**

#### **Desarrollo**
```bash
# Iniciar servidor de desarrollo
npm run dev
```

**Output esperado:**
```
VITE v5.x.x  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
➜  press h + enter to show help
```

**Acceder a:** `http://localhost:5173`

#### **Producción (Build)**
```bash
# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

**Acceder a:** `http://localhost:4173`

---

### **Opción 2: Ejecución con Docker**

#### **A. Crear imagen Docker**
```bash
# Construir la imagen
docker build -t ecommerce-app .
```

**Flags explicadas:**
- `-t ecommerce-app` → Nombre de la imagen
- `.` → Usar Dockerfile del directorio actual

**Tiempo estimado:** 3-5 minutos (primera vez)

#### **B. Ejecutar contenedor**
```bash
# Modo desarrollo
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules ecommerce-app

# Modo producción
docker run -p 80:80 ecommerce-app
```

**Flags explicadas:**
- `-p 5173:5173` → Mapear puerto 5173 (host:contenedor)
- `-v $(pwd):/app` → Montar directorio actual en /app (hot reload)
- `-v /app/node_modules` → Volumen para node_modules
- `-d` → Ejecutar en segundo plano (daemon)
- `--name mi-ecommerce` → Asignar nombre al contenedor

**Acceder a:**
- Desarrollo: `http://localhost:5173`
- Producción: `http://localhost`

#### **C. Comandos útiles de Docker**
```bash
# Ver contenedores corriendo
docker ps

# Ver todas las imágenes
docker images

# Detener contenedor
docker stop <CONTAINER_ID>

# Eliminar contenedor
docker rm <CONTAINER_ID>

# Eliminar imagen
docker rmi ecommerce-app

# Ver logs del contenedor
docker logs <CONTAINER_ID>

# Acceder a la terminal del contenedor
docker exec -it <CONTAINER_ID> sh

# Limpiar todo (contenedores, imágenes, volúmenes)
docker system prune -a --volumes
```

---

### **Opción 3: Docker Compose**

**Ideal para:** Desarrollo en equipo, ambientes consistentes

#### **A. Crear archivo `docker-compose.yml`**

Creá este archivo en la raíz del proyecto:
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ecommerce-frontend
    ports:
      - "5173:5173"    # Desarrollo
      # - "80:80"      # Producción (descomentar si usas build de producción)
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:3000
    command: npm run dev
    restart: unless-stopped
    networks:
      - ecommerce-network

networks:
  ecommerce-network:
    driver: bridge
```

#### **B. Ejecutar con Docker Compose**
```bash
# Iniciar servicios (modo attached - ver logs)
docker-compose up

# Iniciar servicios (modo detached - segundo plano)
docker-compose up -d

# Reconstruir y iniciar
docker-compose up --build

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f app

# Reiniciar un servicio
docker-compose restart app

# Ejecutar comando en contenedor corriendo
docker-compose exec app npm install nueva-dependencia
```

**Acceder a:** `http://localhost:5173`

---

### **Opción 4: Docker con Dockerfile personalizado**

#### **Dockerfile para Desarrollo**
```dockerfile
# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

**Ejecutar:**
```bash
docker build -f Dockerfile.dev -t ecommerce-dev .
docker run -p 5173:5173 -v $(pwd):/app ecommerce-dev
```

#### **Dockerfile para Producción**
```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Ejecutar:**
```bash
docker build -f Dockerfile.prod -t ecommerce-prod .
docker run -p 80:80 ecommerce-prod
```

---

## 📜 **Scripts Disponibles**

### **NPM Scripts**
```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo en http://localhost:5173

# Producción
npm run build            # Compila el proyecto para producción → carpeta dist/
npm run preview          # Vista previa del build de producción

# Linting y Formateo
npm run lint             # Ejecuta ESLint para revisar código
npm run lint:fix         # Corrige errores de ESLint automáticamente
npm run format           # Formatea código con Prettier

# Testing (si está configurado)
npm run test             # Ejecuta tests
npm run test:watch       # Ejecuta tests en modo watch
npm run test:coverage    # Genera reporte de cobertura

# Utilidades
npm run clean            # Limpia carpetas dist/ y node_modules/
npm run reinstall        # Limpia e instala dependencias
```

### **Docker Scripts**

Podés crear scripts en `package.json` para simplificar comandos Docker:
```json
{
  "scripts": {
    "docker:build": "docker build -t ecommerce-app .",
    "docker:run": "docker run -p 5173:5173 ecommerce-app",
    "docker:dev": "docker-compose up",
    "docker:dev:build": "docker-compose up --build",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    "docker:clean": "docker system prune -af --volumes"
  }
}
```

**Uso:**
```bash
npm run docker:build     # Construir imagen
npm run docker:dev       # Iniciar con compose
npm run docker:down      # Detener servicios
```

---

## 📁 **Estructura del Proyecto**
```
ecommerce-admin-frontend-main/
│
├── .dockerignore           # Archivos ignorados por Docker
├── .gitignore              # Archivos ignorados por Git
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Orquestación Docker
├── nginx.conf              # Configuración Nginx
├── package.json            # Dependencias y scripts
├── package-lock.json       # Lock de dependencias
├── tsconfig.json           # Configuración TypeScript
├── vite.config.ts          # Configuración Vite
├── README.md               # Este archivo
│
├── public/                 # Archivos estáticos
│   ├── favicon.ico
│   └── assets/
│
└── src/
    ├── App.tsx             # Componente raíz
    ├── main.tsx            # Punto de entrada
    ├── index.css           # Estilos globales
    │
    ├── components/         # Componentes reutilizables
    │   ├── admin/         # Componentes del admin
    │   │   └── layout/
    │   │       └── AdminLayout.tsx
    │   ├── shop/          # Componentes de la tienda
    │   │   ├── ProductCard.tsx
    │   │   ├── FilterSidebar.tsx
    │   │   └── ReviewStars.tsx
    │   └── ui/            # Componentes UI globales
    │       └── ToastContainer.tsx
    │
    ├── context/           # Contextos de React
    │   └── CartContext.tsx
    │
    ├── pages/             # Páginas principales
    │   ├── shop/         # Páginas de la tienda
    │   │   ├── Home.tsx
    │   │   ├── Shop.tsx
    │   │   ├── ProductDetail.tsx
    │   │   ├── Cart.tsx
    │   │   ├── Checkout.tsx
    │   │   └── MyOrders.tsx
    │   └── admin/        # Páginas del admin
    │       ├── Dashboard.tsx
    │       ├── Products.tsx
    │       ├── Categories.tsx
    │       └── Orders.tsx
    │
    ├── services/          # Servicios y API
    │   ├── localStorage.ts # Servicio de datos local
    │   └── api.ts         # API HTTP
    │
    └── types/             # Definiciones TypeScript
        └── index.ts
```

---

## 🎯 **Funcionalidades**

### 🛍️ **Tienda (Shop)**

#### **1. Página de Inicio (Home)** - `/`
- Banner principal con CTA
- Productos destacados (6 productos)
- Categorías populares
- Navegación intuitiva

#### **2. Catálogo (Shop)** - `/shop`
- **Búsqueda:** Input con búsqueda en tiempo real
- **Filtros:**
  - Por categoría (dropdown)
  - Por rango de precio (min/max)
  - Por stock (todos/en stock/sin stock)
- **Ordenamiento:**
  - Más recientes (default)
  - Precio: menor a mayor
  - Precio: mayor a menor
  - Nombre A-Z
- **Vista:** Toggle Grid/Lista
- **Sidebar de filtros** (responsive)

#### **3. Detalle de Producto** - `/product/:id`
- Galería de imágenes (3 thumbnails)
- Información completa
- Selector de cantidad
- Estado de stock en tiempo real
- Botón "Agregar al carrito"
- Features: Envío gratis, Garantía, 24-48h

#### **4. Carrito** - `/cart`
- Lista de productos
- Modificar cantidades (+/-)
- Eliminar productos
- Resumen de totales
- Botón checkout
- Persistencia en localStorage

#### **5. Checkout** - `/checkout`
- **Formulario:**
  - Nombre completo *
  - Email *
  - Teléfono *
  - Dirección *
- **Método de entrega:**
  - Drive Thru
  - En Mano
  - Envío a Domicilio
- Resumen del pedido
- Validaciones en tiempo real
- **Descuento automático de stock**
- Pantalla de éxito animada
- Redirección automática

#### **6. Mis Pedidos** - `/my-orders`
- Historial completo
- Detalles de cada pedido:
  - Productos con imágenes
  - Cantidades y precios
  - Total pagado
  - Estado (badge con color)
  - Fecha de compra
  - Método de entrega
  - Info del cliente
- Botón "Comprar de nuevo"

---

### 👨‍💼 **Panel de Administración**

#### **1. Dashboard** - `/admin/dashboard`
- **Stats Cards:**
  - 📦 Total de productos
  - 📋 Total de pedidos
  - ⚠️ Stock bajo (<10)
  - 💰 Ingresos totales
- **Pedidos Recientes:** Últimos 3 con detalles
- **Acciones Rápidas:**
  - ➕ Agregar producto (modal)
  - 📋 Ver pedidos
  - 🏷️ Gestionar categorías
- **Distribución por Categorías:** Barra de progreso
- **Banner informativo** dinámico

#### **2. Productos** - `/admin/products`
- **Listado:** Cards con imágenes
- **Búsqueda:** Tiempo real
- **Filtros avanzados:**
  - Categoría (select)
  - Stock (todos/en stock >10/bajo 1-10/sin 0)
  - Precio (rangos: 0-50, 50-200, 200-500, 500+)
  - Ordenar (nombre, precio asc/desc, stock asc/desc)
- **Botón "Limpiar Filtros"**
- **Contador:** "X de Y productos"
- **Acciones por producto:**
  - ✏️ Editar (modal)
  - 🗑️ Eliminar (confirmación)
- **Modal crear/editar:**
  - Nombre *
  - Descripción
  - Precio *
  - Stock *
  - Categoría * (select)
  - URL Imagen (opcional)
- **Badge de stock:** Verde/Naranja/Rojo

#### **3. Categorías** - `/admin/categories`
- Crear categorías
- Editar nombre, descripción, color
- Eliminar (con validación)
- Ver cantidad de productos

#### **4. Pedidos** - `/admin/orders`
- **Tabla completa:**
  - ID
  - Cliente
  - Fecha (relativa: "Hace X horas")
  - Total
  - Método entrega
  - Estado (select inline)
- **Cambio de estado:**
  - Pendiente (naranja)
  - En Progreso (azul)
  - Entregado (verde)
  - Cancelado (rojo)
- **Modal de detalles:**
  - Info cliente completa
  - Lista productos con imágenes
  - Resumen del pedido
  - Badge de estado con icono
- **Stats cards:** Total, Pendientes, En Progreso, Entregados

---

## 💾 **Gestión de Datos**

### **Sistema de localStorage**

**3 keys principales:**
```javascript
localStorage.getItem('ecommerce_products')   // Array<Product>
localStorage.getItem('ecommerce_orders')     // Array<Order>
localStorage.getItem('ecommerce_categories') // Array<Category>
```

### **Datos Iniciales**

Al iniciar por primera vez, se cargan:

- **12 productos** (IDs: 9001-9012)
- **4 categorías** (IDs: 1-4)

#### **Productos Mock:**
1. iPhone 15 Pro Max - $1299.99 (Electrónica, stock: 15)
2. MacBook Air M3 - $1499.99 (Electrónica, stock: 8)
3. Sony WH-1000XM5 - $399.99 (Electrónica, stock: 25)
4. Nike Air Max 2024 - $189.99 (Deportes, stock: 30)
5. Camiseta Premium Cotton - $49.99 (Ropa, stock: 50)
6. Smart Watch Ultra - $449.99 (Electrónica, stock: 12)
7. Lámpara LED Inteligente - $79.99 (Hogar, stock: 40)
8. Mochila Urbana Pro - $89.99 (Ropa, stock: 20)
9. iPad Pro M2 - $1099.99 (Electrónica, stock: 10)
10. Jeans Slim Fit - $79.99 (Ropa, stock: 35)
11. Sofá Modular 3 Plazas - $899.99 (Hogar, stock: 5)
12. Bicicleta Mountain Bike - $549.99 (Deportes, stock: 8)

#### **Categorías Mock:**
1. **Electrónica** (#3B82F6)
2. **Ropa** (#10B981)
3. **Hogar** (#8B5CF6)
4. **Deportes** (#F59E0B)

### **Sincronización Admin ↔ Shop**

✅ **Cambios en Admin** → Instantáneamente en Shop  
✅ **Compras en Shop** → Descuenta stock en Admin  
✅ **Pedidos en Shop** → Visibles en Admin Orders  
✅ **Sin recargas necesarias**

### **Funciones del Servicio**
```typescript
// src/services/localStorage.ts

// PRODUCTOS
getLocalProducts(): Product[]
addLocalProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): void
updateLocalProduct(id: number, updates: Partial<Product>): void
deleteLocalProduct(id: number): void
updateProductStock(productId: number, quantityToSubtract: number): void

// PEDIDOS
getLocalOrders(): Order[]
addLocalOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): void
updateLocalOrder(id: number, updates: Partial<Order>): void
updateLocalOrderStatus(id: number, status: string): void

// CATEGORÍAS
getLocalCategories(): Category[]
addLocalCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): void
updateLocalCategory(id: number, updates: Partial<Category>): void
deleteLocalCategory(id: number): void

// INICIALIZACIÓN
initializeLocalStorage(): void
```

---

## 🗺️ **Rutas de la Aplicación**

### **Rutas Públicas (Shop)**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página de inicio |
| `/shop` | Shop | Catálogo de productos |
| `/product/:id` | ProductDetail | Detalle del producto |
| `/cart` | Cart | Carrito de compras |
| `/checkout` | Checkout | Proceso de pago |
| `/my-orders` | MyOrders | Historial de pedidos |

### **Rutas de Administración**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin` | → `/admin/dashboard` | Redirige al dashboard |
| `/admin/dashboard` | Dashboard | Panel con estadísticas |
| `/admin/products` | Products | Gestión de productos |
| `/admin/categories` | Categories | Gestión de categorías |
| `/admin/orders` | Orders | Gestión de pedidos |

---

## 📖 **Uso del Sistema**

### **Como Cliente**
```bash
# 1. Iniciar aplicación
npm run dev
# o
docker-compose up

# 2. Abrir navegador
http://localhost:5173

# 3. Navegar por la tienda
- Explorar productos en /shop
- Ver detalles de producto
- Agregar al carrito
- Ir a checkout
- Completar formulario
- Confirmar pedido
- Ver historial en /my-orders
```

### **Como Administrador**
```bash
# 1. Acceder al panel
http://localhost:5173/admin

# 2. Ver dashboard
- Revisar estadísticas
- Ver pedidos recientes
- Monitorear stock bajo

# 3. Gestionar productos
- Ir a /admin/products
- Crear/editar/eliminar productos
- Usar filtros avanzados

# 4. Gestionar pedidos
- Ir a /admin/orders
- Cambiar estados de pedidos
- Ver detalles completos

# 5. Gestionar categorías
- Ir a /admin/categories
- Crear/editar categorías
```

---

## 🎨 **Personalización**

### **Modificar Colores**

Editar componentes (estilos inline):
```javascript
// Gradiente principal
background: 'linear-gradient(135deg, #TU_COLOR1 0%, #TU_COLOR2 100%)'

// Estados de pedidos
pending: '#TU_COLOR'      // Naranja por defecto
in_progress: '#TU_COLOR'  // Azul por defecto
delivered: '#TU_COLOR'    // Verde por defecto
canceled: '#TU_COLOR'     // Rojo por defecto
```

### **Modificar Productos Mock**

Editar `src/services/localStorage.ts`:
```typescript
const mockProducts = [
  {
    id: 9001,
    name: 'Tu Producto',
    description: 'Descripción completa',
    price: 199.99,
    stock: 25,
    category_id: 1,
    image_url: 'https://tu-url-imagen.jpg'
  },
  // ... más productos
];
```

### **Modificar Categorías**

Editar `src/services/localStorage.ts`:
```typescript
const mockCategories = [
  {
    id: 1,
    name: 'Tu Categoría',
    description: 'Descripción',
    color: '#HEX_COLOR'
  },
  // ... más categorías
];
```

### **Modificar Puerto de Desarrollo**

Editar `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Cambiar puerto aquí
    host: true
  }
});
```

O usar variable de entorno:
```bash
PORT=3000 npm run dev
```

---

## 🐛 **Troubleshooting**

### **Problema: `npm install` falla**

**Solución:**
```bash
# Limpiar cache y reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **Problema: Puerto 5173 en uso**

**Solución:**
```bash
# Ver qué proceso usa el puerto
lsof -i :5173

# Matar el proceso
kill -9 <PID>

# O cambiar puerto en vite.config.ts
```

### **Problema: Docker build falla**

**Solución:**
```bash
# Verificar Dockerfile existe
ls -la Dockerfile

# Limpiar cache de Docker
docker builder prune -a

# Reconstruir sin cache
docker build --no-cache -t ecommerce-app .
```

### **Problema: Contenedor no inicia**

**Solución:**
```bash
# Ver logs del contenedor
docker logs <CONTAINER_ID>

# Verificar que el puerto no esté en uso
lsof -i :5173

# Revisar docker-compose.yml
docker-compose config
```

### **Problema: localStorage no guarda datos**

**Solución:**
- Verificar que el navegador permita cookies/localStorage
- Abrir DevTools → Application → Local Storage
- Verificar keys: `ecommerce_products`, `ecommerce_orders`, `ecommerce_categories`
- No estar en modo incógnito

### **Problema: Hot reload no funciona en Docker**

**Solución:**

Agregar en `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  }
});
```

Y en `docker-compose.yml`:
```yaml
volumes:
  - .:/app
  - /app/node_modules
environment:
  - CHOKIDAR_USEPOLLING=true
```

### **Problema: Error de permisos en Docker**

**Solución:**
```bash
# Linux/Mac: Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión
newgrp docker

# Verificar
docker run hello-world
```

### **Problema: Página en blanco después de build**

**Solución:**

Verificar `vite.config.ts`:
```typescript
export default defineConfig({
  base: './', // Para rutas relativas
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
```

### **Resetear Datos**

**En navegador (DevTools Console):**
```javascript
localStorage.clear();
location.reload();
```

**O específicamente:**
```javascript
localStorage.removeItem('ecommerce_products');
localStorage.removeItem('ecommerce_orders');
localStorage.removeItem('ecommerce_categories');
location.reload();
```

---

## 🔐 **Variables de Entorno**

Crear archivo `.env` en la raíz:
```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000

# App Configuration
VITE_APP_NAME=E-Commerce
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_REVIEWS=true
VITE_ENABLE_WISHLIST=false

# Storage
VITE_STORAGE_PREFIX=ecommerce_
```

**Usar en código:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

## 🚀 **Despliegue en Producción**

### **Opción 1: Vercel**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

### **Opción 2: Netlify**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Desplegar
netlify deploy --prod --dir=dist
```

### **Opción 3: Docker en VPS**
```bash
# En el servidor
git clone <repo-url>
cd ecommerce-admin-frontend-main

# Build y ejecutar
docker-compose -f docker-compose.prod.yml up -d

# Con nginx reverse proxy
# Ver configuración en nginx.conf
```

### **Opción 4: GitHub Pages**

Agregar en `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

Configurar `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/nombre-repo/', // Cambiar por tu repo
});
```
```bash
npm run deploy
```

---

## 📱 **Responsive Breakpoints**
```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 🧪 **Testing** (Opcional)

### **Instalar dependencias de testing:**
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

### **Ejecutar tests:**
```bash
npm run test           # Ejecutar una vez
npm run test:watch     # Modo watch
npm run test:coverage  # Con cobertura
```

---

## 📊 **Monitoreo y Analytics**

### **Ver bundle size:**
```bash
npm run build -- --mode analyze
```

### **Verificar performance:**
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

---

## 🔒 **Seguridad**

### **Consideraciones:**

⚠️ **localStorage NO es seguro** para datos sensibles  
⚠️ Este proyecto es **educativo/demostración**  
⚠️ En producción usar backend con autenticación  
✅ No se almacenan contraseñas ni datos de pago  
✅ Sanitizar inputs para prevenir XSS  
✅ Usar HTTPS en producción  

### **Mejoras de seguridad recomendadas:**
```typescript
// Sanitizar inputs
import DOMPurify from 'dompurify';

const cleanInput = DOMPurify.sanitize(userInput);
```

---

## 🚀 **Roadmap / Próximas Mejoras**

- [ ] Autenticación JWT
- [ ] Backend con Node.js + Express
- [ ] Base de datos PostgreSQL/MongoDB
- [ ] Pasarela de pagos (Stripe/PayPal)
- [ ] Sistema de reviews completo
- [ ] Wishlist (lista de deseos)
- [ ] Comparador de productos
- [ ] Chat de soporte (WebSockets)
- [ ] Notificaciones push
- [ ] Modo oscuro/claro
- [ ] Multi-idioma (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Analytics dashboard
- [ ] Exportar reportes (PDF/Excel)
- [ ] Tests unitarios completos
- [ ] CI/CD con GitHub Actions

---

## 📚 **Recursos Adicionales**

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev/)
- [Docker Docs](https://docs.docker.com/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 **Licencia**

MIT License - Ver archivo [LICENSE](LICENSE)

---

## 👤 **Autor**

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 🤝 **Contribuir**

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crear rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m 'Agregar nueva feature'`
4. Push: `git push origin feature/nueva-feature`
5. Abrir Pull Request

---

## 🙏 **Agradecimientos**

- React Team
- Vite Team
- Comunidad de TypeScript
- Lucide Icons
- Unsplash (imágenes)
- Todos los contribuidores

---

## 📞 **Soporte**

¿Problemas o preguntas?

1. Revisar [Troubleshooting](#-troubleshooting)
2. Abrir un [Issue](https://github.com/tu-usuario/repo/issues)
3. Contactar: tu-email@ejemplo.com

---

## 📈 **Estadísticas del Proyecto**

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/repo?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/repo?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/repo)
![GitHub license](https://img.shields.io/github/license/tu-usuario/repo)

---

**¡Gracias por usar este e-commerce! 🎉**

**Happy Coding! 💻✨**

---

*Última actualización: Diciembre 2024*