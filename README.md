# Proyecto para AlexPhone de iPhones Reacondicionados

Este proyecto es un ecommerce donde los usuarios pueden explorar, buscar y ordenar los iPhones que tenemos en stock.
Utiliza _Vue.js 2.7.16v_ con _Nuxt.js 2.18.1v_ para frontend.

[!IMPORTANT]

### Configuración del proyecto

1. Instalación
   Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

git clone https://github.com/saaroca/technical-test-2025-02-17

2. Instalar dependencias
   Entra en el directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

cd nombre-del-repositorio
npm install

3. Iniciar el servidor de desarrollo
   En el directorio del proyecto, ejecuta el siguiente comando para iniciar el servidor de desarrollo:
   npm run dev

Accede a la aplicación en tu navegador en:
http://localhost:3000

### Funcionalidades

1. Página de Inicio:
   Visualiza todos los productos disponibles.
   Ordena los productos por precio, calidad y capacidad.
   Filtra productos por nombre o especificaciones.

2. Detalles del Producto:
   Al hacer clic en un producto, podrás ver su imagen, nombre, estado, capacidad de almacenamiento, precio y una opción para añadirlo al carrito.

3. Carrito de Compras:
   Añade productos al carrito, visualízalos, cambia la cantidad y eliminalos.

[!IMPORTANT]
### Estructura del proyecto

Se sigue una estructura modular, cada componente se divide en funcionalidades específicas:
**/components** Componentes reutilizables (ej. SkuBadges, Search)
**/pages** Páginas principales (Home, checkout, phone details)
**/composables** Funciones reutilizables, las llamadas a API
**/constants** Archivos de constantes
**/types** Donde tenemos las interfaces
**/plugins** Donde tenemos el toast por ej
**/test** Donde guardamos los test untiarios y de integración
**/layouts** El navbar, la página de error..

API externa: [API AlexPhone](https://test.alexphone.com/api/v1).

### Endpoints

1. **Lista de iPhones** (Obtener todos los iPhones / SKUs)

   - **Endpoint**: `GET https://test.alexphone.com/api/v1/skus`
   - **Descripción**: Obtiene una lista de todos los iPhones (SKUs) disponibles.
   - **Respuesta**: Devuelve un arreglo de objetos SKU.

2. **Detalle de iPhone** (Obtener detalles de un iPhone específico / SKU)

   - **Endpoint**: `GET https://test.alexphone.com/api/v1/sku/{sku}`
   - **Descripción**: Obtiene información detallada sobre un iPhone específico (SKU) a partir de su identificador SKU.
   - **Respuesta**: Devuelve los detalles del SKU solicitado.

3. **Confirmación de compra** (Confirmar la compra de un pedido)

   - **Endpoint**: `PUT https://test.alexphone.com/api/v1/order`
   - **Descripción**: Confirma un pedido de compra, enviando los detalles de los productos a comprar.
   - **Cuerpo**: Espera un objeto `CreateOrderBody` que contiene una lista de SKUs (iPhones) a comprar.
   - **Respuesta**: Devuelve una respuesta de tipo `void`.


[!NOTE]
### Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit de ellos (git commit -am 'Agrega nueva funcionalidad').
Haz push a tu rama (git push origin feature/nueva-funcionalidad).
Crea un pull request explicando los cambios realizados.
