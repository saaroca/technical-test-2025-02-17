# 📱 Proyecto AlexPhone - iPhones Reacondicionados

Este proyecto es un **ecommerce** donde los usuarios pueden explorar, buscar y ordenar los iPhones disponibles en stock.

> 🚀 **Tecnologías utilizadas:**
> - **Frontend:** _Vue.js 2.7.16_ + _Nuxt.js 2.18.1_
> - **API externa:** [API AlexPhone](https://test.alexphone.com/api/v1)

---

## ⚙️ Configuración del Proyecto

### 1️⃣ Clonar el Repositorio

```sh
git clone https://github.com/saaroca/technical-test-2025-02-17
```

### 2️⃣ Instalar Dependencias

```sh
cd nombre-del-repositorio
npm install
```

### 3️⃣ Iniciar el Servidor de Desarrollo

```sh
npm run dev
```

🔗 Accede a la aplicación en: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Funcionalidades

✅ **Página de Inicio**
- Visualiza todos los productos disponibles.
- Ordena los productos por **precio, calidad y capacidad**.
- Filtra productos por **nombre o especificaciones**.

✅ **Detalles del Producto**
- Visualiza la **imagen, estado, capacidad, precio** y opción de compra.
- Obtén información detallada de cada iPhone.

✅ **Carrito de Compras**
- Añade productos al carrito, visualízalos y gestiona la cantidad.
- Elimina productos antes de confirmar la compra.

---

## 📂 Estructura del Proyecto

📁 **/components** → Componentes reutilizables (_SkuBadges, Search_).  
📁 **/pages** → Páginas principales (_Home, checkout, detalles del producto_).  
📁 **/composables** → Funciones reutilizables para llamadas a la API.  
📁 **/constants** → Archivos de constantes del proyecto.  
📁 **/types** → Definiciones de interfaces y tipos.  
📁 **/plugins** → Plugins (ej. manejo de _toast_).  
📁 **/test** → Pruebas unitarias e integración.  
📁 **/layouts** → Elementos globales (_Navbar, Error Page_).  

---

## 🌐 Endpoints API

### 📜 **1. Lista de iPhones**
**GET** `/api/v1/skus`

📌 **Descripción:** Obtiene una lista de iPhones disponibles.  
📌 **Respuesta:** Array de objetos SKU.

### 🔍 **2. Detalles del iPhone**
**GET** `/api/v1/sku/{sku}`

📌 **Descripción:** Devuelve detalles de un iPhone específico.  
📌 **Parámetro:** `sku` → Identificador del iPhone.

### 🛒 **3. Confirmación de Compra**
**PUT** `/api/v1/order`

📌 **Descripción:** Confirma un pedido enviando los productos seleccionados.  
📌 **Cuerpo:** Objeto `CreateOrderBody` con los SKUs a comprar.

---

## 🤝 Contribución

¡Gracias por querer contribuir a este proyecto! 🎉 Sigue estos pasos:

1. **Haz un fork** del repositorio.
2. Crea una nueva rama:  
   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y **haz commit** de ellos:  
   ```sh
   git commit -m "Agrega nueva funcionalidad"
   ```
4. **Sube los cambios** a tu rama:  
   ```sh
   git push origin feature/nueva-funcionalidad
   ```
5. **Crea un Pull Request** explicando tus cambios. 🚀

---

💡 **¿Dudas o sugerencias?** ¡Siéntete libre de abrir un issue o contribuir! 😊
