# Unieventos — Angular 15

**Unieventos** es una aplicación web diseñada para la comunidad de la Universidad del Magdalena (estudiantes, docentes, egresados y administrativos). Su propósito principal es facilitar la publicación, gestión y descubrimiento de eventos institucionales (académicos, culturales, deportivos, sociales, tecnológicos y de bienestar), manteniendo a toda la comunidad informada y conectada.

> Este proyecto es una migración y mejora de la versión original desarrollada en HTML5, CSS3 y JavaScript puro, ahora construida sobre **Angular 15** con arquitectura por Feature Modules.

---

## Árbol del proyecto

```
unieventos-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts                (protección de rutas privadas)
│   │   │   │   └── auth.guard.spec.ts           (test unitario del guard)
│   │   │   └── services/
│   │   │       ├── PDF/                         (Componente y estilos para reportes en PDF)
│   │   │       │   └── evento-pdf/
│   │   │       │       ├── evento-pdf.component.ts
│   │   │       │       ├── evento-pdf.component.html
│   │   │       │       └── evento-pdf.component.css
│   │   │       ├── eventos.service.ts            (datos y lógica de eventos)
│   │   │       ├── excel-report.service.ts       (generación de reportes Excel corporativos)
│   │   │       ├── inscripciones.service.ts      (gestión de preinscripciones y asistencia)
│   │   │       ├── resenas.service.ts            (gestión de reseñas y calificaciones)
│   │   │       ├── ruta-api.service.ts           (centraliza la URL base del backend via environment)
│   │   │       └── sidebar.service.ts            (estado del menú lateral con BehaviorSubject)
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   ├── auth.service.ts               (login HTTP, registro, comunidades, sesión)
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.css
│   │   │   │   │   └── login.component.ts
│   │   │   │   └── crear-cuenta/
│   │   │   │       ├── crear-cuenta.component.html
│   │   │   │       ├── crear-cuenta.component.css
│   │   │   │       └── crear-cuenta.component.ts
│   │   │   ├── home/
│   │   │   │   ├── home.module.ts
│   │   │   │   ├── home-routing.module.ts
│   │   │   │   └── home/
│   │   │   │       ├── home.component.html
│   │   │   │       ├── home.component.css
│   │   │   │       └── home.component.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   ├── dashboard-routing.module.ts
│   │   │   │   ├── dashboard.service.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   ├── dashboard.component.css
│   │   │   │   │   └── dashboard.component.ts
│   │   │   │   └── asistencia/                   (Escaneo de QR e inscripción rápida de asistentes/invitados)
│   │   │   │       ├── asistencia.component.html
│   │   │   │       ├── asistencia.component.css
│   │   │   │       └── asistencia.component.ts
│   │   │   ├── eventos/
│   │   │   │   ├── eventos.module.ts
│   │   │   │   ├── eventos-routing.module.ts
│   │   │   │   ├── mis-eventos/
│   │   │   │   │   ├── mis-eventos.component.html
│   │   │   │   │   ├── mis-eventos.component.css
│   │   │   │   │   └── mis-eventos.component.ts
│   │   │   │   ├── crear-evento/
│   │   │   │   │   ├── crear-evento.component.html
│   │   │   │   │   ├── crear-evento.component.css
│   │   │   │   │   └── crear-evento.component.ts
│   │   │   │   ├── modificar-evento/             (Edición y actualización de eventos existentes)
│   │   │   │   │   ├── modificar-evento.component.html
│   │   │   │   │   ├── modificar-evento.component.css
│   │   │   │   │   └── modificar-evento.component.ts
│   │   │   │   └── resenas/                      (Visualización y distribución de reseñas y comentarios)
│   │   │   │       ├── resenas.component.html
│   │   │   │       ├── resenas.component.css
│   │   │   │       └── resenas.component.ts
│   │   │   └── gestion/                          (Feature module de administración y perfil)
│   │   │       ├── gestion.module.ts
│   │   │       ├── gestion-routing.module.ts
│   │   │       ├── mi-perfil/
│   │   │       │   ├── mi-perfil.component.html
│   │   │       │   ├── mi-perfil.component.css
│   │   │       │   ├── mi-perfil.component.ts
│   │   │       │   └── mi-perfil.service.ts
│   │   │       └── usuarios/
│   │   │           ├── usuarios.component.html
│   │   │           ├── usuarios.component.css
│   │   │           ├── usuarios.component.ts
│   │   │           └── usuarios.service.ts
│   │   └── shared/
│   │       ├── shared.module.ts                  (declara y exporta componentes compartidos + módulos reutilizables)
│   │       ├── models/
│   │       │   ├── breadcrumb-item.model.ts      (interfaz para los items del breadcrumb)
│   │       │   ├── evento.model.ts               (modelo base de evento público)
│   │       │   └── my-evento.model.ts            (modelo de evento propio del usuario)
│   │       ├── pipes/                            (Filtros y formateadores personalizados)
│   │       │   └── resenas-con-imagen.pipe.ts
│   │       └── components/
│   │           ├── header/
│   │           │   ├── header.component.html
│   │           │   ├── header.component.css
│   │           │   └── header.component.ts
│   │           ├── footer/
│   │           │   ├── footer.component.html
│   │           │   ├── footer.component.css
│   │           │   ├── footer.component.ts
│   │           │   └── footer.component.spec.ts  (test unitario del footer)
│   │           ├── breadcrumb/
│   │           │   ├── breadcrumb.component.html
│   │           │   ├── breadcrumb.component.css
│   │           │   └── breadcrumb.component.ts
│   │           └── sidebar/
│   │               ├── sidebar.component.html
│   │               ├── sidebar.component.css
│   │               └── sidebar.component.ts
│   ├── environments/
│   │   ├── environment.ts                        (apiUrl: http://localhost:4000)
│   │   └── environment.prod.ts                   (configuración de producción)
│   ├── assets/
│   │   └── img/                                  (imágenes estáticas: logo, escudo, portadas, user-default)
│   └── styles.css                                (estilos globales: fuentes, variables, layout base)
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

---

## Especificaciones del Proyecto

- **Framework**: Angular 15 (`@angular/core ^15.2.0`) con arquitectura por **Feature Modules** y lazy loading.
- **TypeScript**: `~4.9.4`
- **Módulos**: Cada dominio funcional (Auth, Home, Dashboard, Eventos, Gestión) tiene su propio módulo con rutas y componentes propios. Un `SharedModule` centraliza componentes reutilizables, directivas, pipes y módulos de terceros.
- **Formularios**: Uso intensivo de `ReactiveFormsModule` con validaciones declarativas complejas y dinámicas (ej. horarios con `FormArray` en la creación de eventos). Flujos interactivos mediante `FormsModule` con `ngModel` en pantallas de búsqueda e inicios rápidos.
- **Detección y Escaneo de Códigos QR**: Integración directa con hardware del dispositivo mediante cámara para validación rápida de entradas a eventos.
- **Generación de Reportes**: Exportación de listados a Microsoft Excel (.xlsx) estructurados y maquetación de plantillas de impresión en formato PDF (.pdf) desde el lado del cliente.
- **Estado del Sidebar**: Manejado con `BehaviorSubject` en `SidebarService`, siguiendo el patrón de servicio observable de Angular.
- **Protección de rutas**: `AuthGuard` con `CanActivate` protege las rutas privadas como `/dashboard`, `/eventos/*` y `/gestion/*`.
- **Diseño Responsivo (Mobile-First)**: Interfaz adaptativa elegante basada en CSS Grid, Flexbox y variables HSL/CSS. Se aplican tipografías como "Outfit" e íconos interactivos de "Material Symbols Outlined".
- **Alertas**: Librería *SweetAlert2* para confirmaciones, errores y notificaciones de éxito en toda la operatividad.

---

## Librerías y Dependencias

Las siguientes librerías de terceros representan el núcleo tecnológico que hace posible las funcionalidades críticas del sistema (exportación Excel, exportación PDF y escaneo QR):

### Dependencias de producción

| Librería | Versión | Uso Crítico y Operatividad |
|---|---|---|
| `@angular/core` | ^15.2.0 | Framework principal |
| `@angular/router` | ^15.2.0 | Enrutamiento con lazy loading y protección por Guards |
| `@angular/forms` | ^15.2.0 | Formularios reactivos y dinámicos |
| `@angular/animations` | ^15.2.0 | Soporte para animaciones Angular en transiciones |
| `@angular/common` | ^15.2.0 | Directivas comunes del núcleo |
| `@zxing/ngx-scanner` | ^18.0.1 | **Escaneo de Códigos QR**: Permite abrir la cámara y decodificar el QR en tiempo real para registrar asistencias. |
| `exceljs` | ^4.4.0 | **Reportes Excel**: Genera el archivo Excel de asistentes con estilos tipográficos, colores institucionales y bordes. |
| `file-saver` | ^2.0.5 | **Guardado de Archivos**: Facilita la descarga y almacenamiento local en formato binario de los reportes Excel generados. |
| `jspdf` | ^4.2.1 | **Reportes PDF**: Creación de documentos PDF vectoriales en formato A4 con detalles del evento y QR integrados. |
| `html2canvas` | ^1.4.1 | **Renderizado de Plantillas**: Convierte secciones del HTML del cliente en canvas para que `jspdf` las guarde en alta definición. |
| `sweetalert2` | ^11.26.24 | Alertas modales estilizadas e interactivas (éxito, error, confirmación) |
| `angular2-multiselect-dropdown` | ^10.0.0 | Desplegables multiselección con búsqueda de comunidades y eventos |
| `rxjs` | ~7.8.0 | Programación reactiva (Observable, BehaviorSubject, firstValueFrom) |
| `tslib` | ^2.3.0 | Helpers de TypeScript en tiempo de ejecución |
| `zone.js` | ~0.12.0 | Detección de cambios de Angular |

### Dependencias de desarrollo

| Librería | Versión | Uso |
|---|---|---|
| `@types/file-saver` | ^2.0.7 | Tipado estático TypeScript para el servicio de descargas de reportes. |
| `@angular/cli` | ~15.2.11 | CLI de Angular |
| `@angular-devkit/build-angular` | ^15.2.11 | Builder de compilación |
| `@angular/compiler-cli` | ^15.2.0 | Compilador AOT |
| `typescript` | ~4.9.4 | Lenguaje TypeScript |
| `karma` | ~6.4.0 | Test runner |
| `jasmine-core` | ~4.5.0 | Framework de testing |

---

## Rutas de la Aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `HomeComponent` | Público |
| `/login` | `LoginComponent` | Público |
| `/login/crearcuenta` | `CrearCuentaComponent` | Público (redirigido tras primer login si el usuario no existe) |
| `/asistencia` | `AsistenciaComponent` | 🔓 Público (Acceso desde escaneo QR con parámetros. Registra asistencia y permite el registro de usuarios externos/invitados). |
| `/dashboard` | `DashboardComponent` | 🔒 Requiere sesión (Dashboard general, filtros de eventos y acceso a cámara/escáner de QR) |
| `/eventos/mis-eventos` | `MisEventosComponent` | 🔒 Requiere sesión (Panel de gestión propia de eventos, control de QR y reportes) |
| `/eventos/crear-evento` | `CrearEventoComponent` | 🔒 Requiere sesión (Formulario reactivo de creación de eventos y horarios) |
| `/eventos/modificar-evento/:id` | `ModificarEventoComponent` | 🔒 Requiere sesión (Edición de evento y actualización en backend) |
| `/eventos/resenas` | `ResenasComponent` | 🔒 Requiere sesión (Visualización de reseñas recibidas de los eventos del usuario) |
| `/eventos/resenas/:id` | `ResenasComponent` | 🔒 Requiere sesión (Filtrado específico para ver las reseñas de un evento en particular) |
| `/gestion/usuarios` | `UsuariosComponent` | 🔒 Requiere sesión (Panel administrativo de visualización, CRUD y estado de usuarios) |
| `/gestion/mi-perfil` | `MiPerfilComponent` | 🔒 Requiere sesión (Visualización y edición de foto de perfil) |

---

## Características Principales

1. **Home Público**: Búsqueda interactiva y filtrado de eventos (Actuales, Próximos) por categoría y texto. Vista de detalle por evento y acceso sin autenticación.
2. **Autenticación Institucional**: Login con `ReactiveFormsModule` que valida correos. Integración con API REST via `RutaApiService` → `environment.apiUrl`. Persistencia de sesión en `localStorage`.
3. **Registro de Usuario (Crear Cuenta)**: Flujo automático post-login. Si el backend responde "Usuario no existe", se le redirige a `/login/crearcuenta` conservando sus datos temporales. Formulario con campos de nombre, apellido, código/documento, foto de perfil, comunidad (single-select) y eventos de interés (multi-select), enviado mediante `FormData`.
4. **Multiselect Dropdowns**: Integración de `angular2-multiselect-dropdown` para selección de comunidades y tipos de eventos de interés con búsqueda y carga dinámica de la base de datos (`/api/comunidad/listAll`).
5. **AuthGuard**: Protección de rutas privadas. Redirige a `/login` si no hay sesión activa.
6. **Dashboard y Escáner QR**: El usuario autenticado dispone de filtros interactivos de eventos y de un lector QR integrado (`@zxing/ngx-scanner`). Al permitir el acceso a la cámara, el escáner decodifica la URL del QR, procesa automáticamente los parámetros (`eventoId`, `jornadaId`, `codigo`, `ts`, `tk`) y registra la asistencia de inmediato de forma reactiva.
7. **Página de Registro de Asistencia y Flujo de Invitados (`AsistenciaComponent`)**:
   Pantalla dedicada accesible de forma pública mediante el enlace del QR (`/asistencia?e=ID&j=ID&c=CODIGO`).
   - Si el usuario está autenticado, registra la asistencia directamente y le da la bienvenida.
   - Si no está autenticado, presenta un formulario ágil para registrarse como **Invitado** (Usuario Invitado). El sistema crea el usuario, inicia su sesión automáticamente en segundo plano y completa el registro de asistencia sin fricción en un único flujo de navegación.
8. **Gestión de "Mis Eventos"**: Panel de gestión visual de eventos propios del usuario. Permite iniciar, modificar, eliminar o finalizar un evento con confirmación de *SweetAlert2*. Además, permite desplegar el código QR asignado a una jornada específica del evento.
9. **Exportación de Reportes de Asistentes a Excel**: Desde el panel de gestión del evento, se puede exportar en tiempo real la lista de preinscritos y asistentes reales de una jornada a formato Excel. El servicio `ExcelReportService` hace uso de `exceljs` para estructurar un documento elegante con colores corporativos, bordes en las celdas, autoajuste del ancho de columnas y cabeceras claras, que se descarga automáticamente gracias a `file-saver`.
10. **Generación e Impresión del Evento a PDF**: El componente `EventoPdfComponent` funciona como una plantilla de impresión invisible que se renderiza dinámicamente con la portada, título, descripción, jornada y QR del evento. Utiliza `html2canvas` para capturar la maquetación en imagen y `jspdf` para construir un documento PDF A4 de alta fidelidad listo para guardar o imprimir.
11. **Modificación de Eventos (`ModificarEventoComponent`)**: Interfaz dedicada para editar los atributos de un evento creado previamente (horarios, portada, descripción, comunidades). Permite actualizar los cambios en el backend de forma segura mediante métodos HTTP PUT y Multipart Formdata.
12. **Módulo de Administración de Usuarios (`UsuariosComponent`)**: Panel administrativo centralizado bajo `/gestion/usuarios` para gestores de la plataforma. Ofrece visualización completa en cuadrícula de todos los usuarios registrados, creación manual de usuarios, edición de sus roles y comunidades, cambio rápido de su estado de actividad (Activo/Inactivo) y eliminación física con confirmaciones y alertas estilizadas.
13. **Mi Perfil y Carga de Foto de Perfil (`MiPerfilComponent`)**: Interfaz elegante bajo `/gestion/mi-perfil` donde el usuario puede visualizar su ficha institucional y modificar su foto de perfil. Al cambiar la foto, se envía la imagen en un flujo `Multipart/FormData` consumiendo `MiPerfilService`. Una vez confirmada con éxito por el servidor, se recarga la previsualización y se actualiza reactivamente la imagen en el Header y el menú lateral (Sidebar) de forma inmediata.
14. **Visualización y Gestión de Reseñas (`ResenasComponent`)**:
    Módulo unificado para gestionar el feedback de los eventos propios del usuario.
    - Presenta un panel superior interactivo con la calificación promedio del evento y una gráfica detallada con la distribución real de puntuaciones de 1 a 5 estrellas.
    - Listado cronológico de reseñas con fotos multimedia asociadas y avatares de los usuarios calificadores.
    - Filtro de reseñas dinámico que permite buscar comentarios de un evento específico o ver un compendio general.
    - Estilo de botón centralizado e integrado en toda la aplicación (Home, Dashboard, Asistencia, Gestión de Eventos) para redirigir directamente al componente de reseñas mediante hover elegante de contraste oscuro (`#1e293b`).

---

## Servicios Principales

| Servicio | Ubicación | Responsabilidad |
|---|---|---|
| `AuthService` | `pages/auth/auth.service.ts` | Login HTTP, registro con `FormData`, obtener comunidades, login de invitados, validación de correo institucional y manejo de sesión. |
| `EventosService` | `core/services/eventos.service.ts` | Gestión REST de eventos (activos, próximos, por interés, por comunidad), obtención de código QR como Blob, creación y actualización de eventos con portadas y jornadas. |
| `ExcelReportService` | `core/services/excel-report.service.ts` | **Generación de reporte Excel** estructurado y estilizado a partir de los datos del evento y asistentes. |
| `InscripcionesService` | `core/services/inscripciones.service.ts` | Conexión con endpoints de preinscripciones, preinscripción a jornadas, registro y consulta de asistencias. |
| `ResenasService` | `core/services/resenas.service.ts` | Consulta y envío de reseñas de eventos, cálculo de promedios de calificación y almacenamiento de fotos multimedia. |
| `UsuariosService` | `pages/gestion/usuarios/usuarios.service.ts` | Operaciones administrativas de CRUD de usuarios, cambio de estado de actividad y consulta de roles del sistema. |
| `MiPerfilService` | `pages/gestion/mi-perfil/mi-perfil.service.ts` | Peticiones Multipart HTTP PUT para la actualización de la foto de perfil en el backend. |
| `SidebarService` | `core/services/sidebar.service.ts` | Estado reactivo observable del sidebar con `BehaviorSubject`. |
| `RutaApiService` | `core/services/ruta-api.service.ts` | Centraliza la URL base del backend desde `environment.ts` (`RutaApiService.getPath()`). |

---

## Historial de Versiones e Integración

### Última Actualización v02.05.2026
*Conexión completa de la base de datos a endpoints REST, reportes ejecutables (Excel y PDF), escaneo de asistencia por QR en tiempo real, gestión administrativa de usuarios, panel de perfil y sistema de reseñas.*

#### Agregado (Features)
- **Reportes Excel**: Implementado `ExcelReportService` con la librería `exceljs` y `file-saver` para exportar a Excel el listado de asistentes.
- **Generación de PDF**: Añadida la plantilla y componente `EventoPdfComponent` junto a `jspdf` y `html2canvas` para imprimir en formato PDF el detalle del evento y su QR correspondiente.
- **Escáner de QR**: Integración de `@zxing/ngx-scanner` en el dashboard para registro de asistencia mediante cámara móvil.
- **Flujo de Invitados en QR**: Nueva ruta pública `/asistencia` para registrar la asistencia directamente o registrarse como invitado al vuelo y marcar la asistencia de inmediato.
- **Edición de Eventos**: Implementación de `ModificarEventoComponent` para editar datos e imágenes de portada en caliente y guardarlos en el servidor.
- **Gestión de Usuarios**: Módulo `/gestion/usuarios` con tabla interactiva para crear, actualizar, eliminar y cambiar el estado (Activo/Inactivo) de usuarios de la aplicación.
- **Mi Perfil**: Sección de usuario `/gestion/mi-perfil` con posibilidad de cambiar la foto de perfil en tiempo real e impactar reactivamente al sidebar y al header.
- **Reseñas de Eventos**: Componente `/eventos/resenas` para visualizar las valoraciones promedio del evento, distribución de estrellas (1-5), listado de comentarios y multimedia de reseñas.
- **Pipes Personalizados**: Incorporación de `ResenasConImagenPipe` para filtrar y procesar reseñas que posean fotos multimedia.
- **Consistencia Visual en Botones**: Estilo unificado para los enlaces de reseñas con efectos de hover de alto contraste oscuro (`#1e293b`).

#### Corregido (Bugfixes)
- **Distribución de Estrellas en Reseñas**: Corregido el bug donde todas las barras mostraban 5 estrellas; ahora muestra correctamente la distribución secuencial de 1, 2, 3, 4 y 5 estrellas.
- **Mock de Eventos Eliminado**: Toda la interacción de creación, consulta y actualización de eventos ahora es real y consume la base de datos por HTTP REST en lugar de memoria estática.
- **Hover en Modales Blancos**: Corregido el problema de visualización de botones de reseñas sobre fondo blanco; implementado hover en azul pizarra/oscuro para un contraste óptimo.
- **Estructuración de Imagen por Defecto**: Solucionado el fallo al cargar la foto de perfil en cabecera y sidebar usando fallback de control de error `onImgError()`.

---

## Pendiente a Realizar / Mejorar

- **Paginación en Tablas de Gestión**: Implementar paginación del lado del cliente/servidor para la tabla de usuarios del panel administrativo en caso de gran volumen de datos.
- **HTTP Interceptor**: Configuración centralizada de headers para envío automático de tokens Bearer de autorización y manejo estandarizado de excepciones HTTP.
- **Previsualización de Reporte Excel**: Permitir al creador del evento visualizar un resumen web de la tabla antes de descargar el archivo Excel.
- **Validaciones de Contraseña Complejas**: Añadir validación por expresiones regulares en la creación y actualización de contraseñas de usuarios.

---

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Correr la aplicación en modo local
npm start

# Build de producción
ng build
```

La aplicación estará disponible en `http://localhost:4200`.

> El módulo de autenticación, gestión y asistencia requiere el backend corriendo en `http://localhost:4000` (configurable en `src/environments/environment.ts`). Sin backend, el login y la carga dinámica mostrarán error de conexión, aunque las pantallas principales y la interfaz conservan sus fallbacks y estructuras de diseño intactas.