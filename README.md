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
│   │   │       ├── eventos.service.ts            (datos y lógica de eventos)
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
│   │   │   │   └── crear-cuenta/                 ← NUEVO
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
│   │   │   │   └── dashboard/
│   │   │   │       ├── dashboard.component.html
│   │   │   │       ├── dashboard.component.css
│   │   │   │       └── dashboard.component.ts
│   │   │   └── eventos/
│   │   │       ├── eventos.module.ts
│   │   │       ├── eventos-routing.module.ts
│   │   │       ├── mis-eventos/
│   │   │       │   ├── mis-eventos.component.html
│   │   │       │   ├── mis-eventos.component.css
│   │   │       │   └── mis-eventos.component.ts
│   │   │       └── crear-evento/
│   │   │           ├── crear-evento.component.html
│   │   │           ├── crear-evento.component.css
│   │   │           └── crear-evento.component.ts
│   │   ├── shared/
│   │   │   ├── shared.module.ts                  (declara y exporta componentes compartidos + módulos reutilizables)
│   │   │   ├── models/
│   │   │   │   ├── breadcrumb-item.model.ts      (interfaz para los items del breadcrumb)
│   │   │   │   ├── evento.model.ts               (modelo base de evento público)
│   │   │   │   └── my-evento.model.ts            (modelo de evento propio del usuario)
│   │   │   └── components/
│   │   │       ├── header/
│   │   │       │   ├── header.component.html
│   │   │       │   ├── header.component.css
│   │   │       │   └── header.component.ts
│   │   │       ├── footer/
│   │   │       │   ├── footer.component.html
│   │   │       │   ├── footer.component.css
│   │   │       │   ├── footer.component.ts
│   │   │       │   └── footer.component.spec.ts  (test unitario del footer)
│   │   │       ├── breadcrumb/
│   │   │       │   ├── breadcrumb.component.html
│   │   │       │   ├── breadcrumb.component.css
│   │   │       │   └── breadcrumb.component.ts
│   │   │       └── sidebar/
│   │   │           ├── sidebar.component.html
│   │   │           ├── sidebar.component.css
│   │   │           └── sidebar.component.ts
│   │   ├── app.module.ts                         (módulo raíz, importa feature modules)
│   │   ├── app-routing.module.ts                 (rutas raíz con lazy loading y AuthGuard)
│   │   ├── app.component.ts                      (componente raíz con router-outlet)
│   │   ├── app.component.html
│   │   └── app.component.css
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
- **Módulos**: Cada dominio funcional (Auth, Home, Dashboard, Eventos) tiene su propio módulo con rutas propias. Un `SharedModule` centraliza los componentes reutilizables y módulos de terceros.
- **Formularios**: Uso de `ReactiveFormsModule` con `FormBuilder`, `FormGroup`, `FormArray` y validaciones declarativas. Uso de `FormsModule` con `ngModel` y template-driven forms en el flujo de registro.
- **Estado del Sidebar**: Manejado con `BehaviorSubject` en `SidebarService`, siguiendo el patrón de servicio observable de Angular.
- **Protección de rutas**: `AuthGuard` con `CanActivate` protege las rutas `/dashboard` y `/eventos/*`.
- **Diseño Responsivo (Mobile-First)**: Interfaz adaptativa con CSS Grid y Flexbox. Variables CSS, fuente Google "Outfit" e iconos "Material Symbols Outlined".
- **Alertas**: Librería *SweetAlert2* para confirmaciones, errores y notificaciones de éxito.
- **Environments**: Configuración centralizada del backend en `environment.ts`, consumida por `RutaApiService`.

---

## Librerías y Dependencias

### Dependencias de producción

| Librería | Versión | Uso |
|---|---|---|
| `@angular/core` | ^15.2.0 | Framework principal |
| `@angular/router` | ^15.2.0 | Enrutamiento con lazy loading |
| `@angular/forms` | ^15.2.0 | Formularios reactivos y template-driven |
| `@angular/animations` | ^15.2.0 | Soporte para animaciones Angular |
| `@angular/common` | ^15.2.0 | Directivas comunes (ngIf, ngFor, async pipe) |
| `sweetalert2` | ^11.26.24 | Alertas modales estilizadas (éxito, error, confirmación) |
| `angular2-multiselect-dropdown` | ^10.0.0 | Dropdowns multiselección con búsqueda, para comunidades y eventos de interés |
| `rxjs` | ~7.8.0 | Programación reactiva (Observable, BehaviorSubject, firstValueFrom) |
| `tslib` | ^2.3.0 | Helpers de TypeScript en tiempo de ejecución |
| `zone.js` | ~0.12.0 | Detección de cambios de Angular |

### Dependencias de desarrollo

| Librería | Versión | Uso |
|---|---|---|
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
| `/login/crearcuenta` | `CrearCuentaComponent` | Público (redirigido automáticamente tras primer login) |
| `/dashboard` | `DashboardComponent` | 🔒 Requiere sesión |
| `/eventos/mis-eventos` | `MisEventosComponent` | 🔒 Requiere sesión |
| `/eventos/crear-evento` | `CrearEventoComponent` | 🔒 Requiere sesión |

---

## Características Principales

1. **Home Público**: Búsqueda interactiva y filtrado de eventos (Actuales, Próximos) por categoría y texto. Vista de detalle por evento. Acceso sin autenticación.
2. **Autenticación Institucional**: Login con `ReactiveFormsModule` que valida correos. Integración con API REST via `RutaApiService` → `environment.apiUrl`. Persistencia de sesión en `localStorage`.
3. **Registro de Usuario (Crear Cuenta)**: Flujo automático post-login — si el backend responde "Usuario no existe", el usuario es redirigido a `/login/crearcuenta` con sus datos precargados. Formulario con campos de nombre, apellido, código/documento, foto de perfil, selección de comunidad (single-select) y eventos de interés (multi-select). Envío al backend via `FormData` (multipart) con imagen opcional.
4. **Multiselect Dropdowns**: Integración de `angular2-multiselect-dropdown` para selección de comunidades (single-select con búsqueda) y tipos de eventos de interés (multi-select con búsqueda). Datos de comunidades obtenidos dinámicamente del backend (`/api/comunidad/listAll`).
5. **AuthGuard**: Protección de rutas privadas. Redirige a `/login` si no hay sesión activa.
6. **Dashboard**: Vista principal del usuario autenticado con los mismos filtros del Home y acceso al menú lateral.
7. **Menú Lateral (Sidebar)**: Componente global manejado por `SidebarService` con `BehaviorSubject`. Muestra foto de perfil del usuario (cargada desde el backend o avatar por defecto), nombre completo, navegación principal y opción de cerrar sesión. Manejo de errores de imagen con `onImgError()`.
8. **Header con Foto de Perfil**: El `HeaderComponent` muestra la foto del usuario autenticado (cargada desde la URL del backend via `RutaApiService`) o un ícono por defecto si la URL es `"not defined"`. Toggle del sidebar al hacer clic.
9. **Mis Eventos**: Panel de gestión visual con modal interactivo que muestra descripción, horarios, preinscritos y código QR. Acciones de iniciar, modificar y eliminar con confirmación `SweetAlert2`.
10. **Crear Evento**: Formulario reactivo con campos dinámicos para horarios mediante `FormArray`. Validaciones en tiempo real, carga y previsualización de imagen de portada.
11. **Carga de Imagen de Perfil**: Preview de imagen seleccionada antes de enviar al servidor, usando `FileReader` con `readAsDataURL()`.

---

## Servicios Principales

| Servicio | Ubicación | Responsabilidad |
|---|---|---|
| `AuthService` | `pages/auth/auth.service.ts` | Login HTTP, registro de usuario con `FormData`, obtener comunidades, validación de correo institucional, manejo de sesión en `localStorage` |
| `EventosService` | `core/services/eventos.service.ts` | Datos mockeados de eventos públicos y propios, filtrado, CRUD en memoria |
| `SidebarService` | `core/services/sidebar.service.ts` | Estado observable del sidebar con `BehaviorSubject` |
| `RutaApiService` | `core/services/ruta-api.service.ts` | Centraliza la URL base del backend desde `environment.ts` (método estático `getPath()`) |

### Interfaz `JsonResponse`

Definida en `auth.service.ts`, estandariza las respuestas del backend:

```typescript
export interface JsonResponse {
  codigo: number;
  mensaje: string;
  data?: any;
  listaRespuesta?: any[];
}
```

---

## Última Actualización v01.04.2026

*Registro completo de usuario, integración de dropdowns multiselección y mejoras de integración con el backend.*

### Agregado (Features)

- **`CrearCuentaComponent`**: Nuevo componente de registro post-login en `/login/crearcuenta`. Formulario con campos: nombre de usuario, apellido, correo (precargado y deshabilitado), contraseña (confirmación), código/documento (condicional según comunidad), comunidad, eventos de interés y foto de perfil opcional.
- **Flujo automático Login → Registro**: Si el backend responde `"Usuario no existe"`, el `LoginComponent` guarda los datos parciales (`nombreUsuario`, `correo`, `contrasena`) en `localStorage` y redirige automáticamente a `/login/crearcuenta`. Tras el registro exitoso se limpian estos datos temporales.
- **`RutaApiService`**: Nuevo servicio que centraliza la URL base del backend (`environment.apiUrl`), reemplazando la URL hardcodeada en los servicios.
- **`angular2-multiselect-dropdown`**: Integración de la librería para dropdowns de comunidades (single-select) y eventos de interés (multi-select) con búsqueda, lazy loading y configuraciones personalizadas.
- **Envío de formulario con `FormData`**: `AuthService.crearUsuario()` envía los datos del usuario como JSON blob (`application/json`) junto con la imagen como `multipart/form-data`.
- **Endpoints de backend**: Nuevos endpoints consumidos: `POST /api/usuario/createPostLogin` (registro), `GET /api/comunidad/listAll` (comunidades).
- **Carga y preview de foto de perfil**: `CrearCuentaComponent` permite seleccionar imagen, muestra preview con `FileReader`, y la envía al backend en el registro.
- **Foto de perfil en Header y Sidebar**: Ambos componentes cargan la URL de foto desde los datos del usuario, construyendo la URL completa con `RutaApiService.getPath()`. Si la URL es `"not defined"`, se muestra el ícono `account_circle`. Implementan `onImgError()` para fallback a imagen por defecto.
- **Configuración de Environments**: Archivos `environment.ts` y `environment.prod.ts` para manejar `apiUrl` según el entorno.
- **`SharedModule` extendido**: Ahora importa y exporta `FormsModule` y `AngularMultiSelectModule`, además de los componentes compartidos.
- **Interfaz `JsonResponse`**: Tipado estandarizado para respuestas del backend con `codigo`, `mensaje`, `data` y `listaRespuesta`.
- **Validaciones en Crear Cuenta**: Validación de campos requeridos, formato de correo, coincidencia de contraseñas, comunidad seleccionada y al menos un evento de interés. Todas con feedback via `SweetAlert2`.
- **`CUSTOM_ELEMENTS_SCHEMA`**: Agregado en `AuthModule` y `SharedModule` para compatibilidad con componentes de terceros.

### Corregido (Bugfixes)

- **Versión de Angular incorrecta en documentación**: Corregida la referencia de Angular 21 a **Angular 15** (`@angular/core ^15.2.0`).
- **Redirección Login → Crear Cuenta**: Resuelto problema de navegación con rutas relativas — ahora usa ruta absoluta `/login/crearcuenta`.
- **`AuthService` movido a `pages/auth/`**: El servicio vive ahora dentro del feature module de Auth con sus endpoints específicos, en lugar de `core/services/`.
- **Tipado de respuesta en login**: La respuesta del login ahora usa la interfaz `JsonResponse` con tipado genérico para acceder correctamente a `res.codigo` y `res.data`.
- **Manejo de errores en registro**: `guardarUsuario()` captura errores HTTP y muestra el mensaje del backend (`error.error.mensaje`) via `SweetAlert2`.
- **Modelos movidos a `shared/models/`**: `evento.model.ts` y `my-evento.model.ts` ahora están en `shared/models/` en vez de `core/models/`.
- **Sidebar muestra nombre completo**: Ahora muestra `nombre + apellido` del usuario en lugar de solo el nombre.

### Actualizado (Refactors)

- URL del backend centralizada en `environment.ts` → `RutaApiService` (ya no está hardcodeada como `http://localhost:4000`).
- `SharedModule` ahora exporta `FormsModule` y `AngularMultiSelectModule` para uso en todos los feature modules.
- `AuthService` usa `firstValueFrom` de RxJS para convertir observables en promesas en el flujo de registro.
- Estilos del theme de `angular2-multiselect-dropdown` incluidos globalmente en `angular.json`.
- `HeaderComponent` construye la URL de foto de perfil dinámicamente con `RutaApiService.getPath()`.

---

## Pendiente a Mejorar

- **Persistencia real de eventos**: Los eventos creados viven en memoria. Integrar con backend via `EventosService`.
- **Validación de contraseña**: Agregar validación de longitud mínima (actualmente comentada en el código).
- **Modificar evento**: El botón de modificar en el modal aún no tiene funcionalidad implementada.
- **Modal QR**: Mejorar el posicionamiento y tamaño del ícono QR en primer plano.
- **Guardados y Reseñas**: Links del sidebar aún sin destino implementado.
- **`listaEventosInteres` en registro**: El envío de la lista de eventos de interés al backend aún no está conectado (comentado en el código).

## Pendiente a Realizar

- **Integración completa con backend**: Conectar `EventosService` con endpoints REST para CRUD real de eventos.
- **HTTP Interceptor**: Manejo centralizado de headers de autorización y errores HTTP.
- **Módulo de perfil de usuario**: Página de perfil con datos del usuario autenticado.
- **Pre-registro a eventos**: Funcionalidad para que usuarios se inscriban a eventos desde el Home o Dashboard.
- **Generación real de QR**: Integrar librería de generación de códigos QR (ej. `qrcode`, `ngx-qrcode`).
- **Animaciones Angular**: Aprovechar `@angular/animations` para transiciones del modal y sidebar.
- **Validación de correo institucional activable**: La validación `@unimagdalena.edu.co` existe en el servicio pero está comentada en el componente de login.

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

> El módulo de login y registro requiere el backend corriendo en `http://localhost:4000` (configurable en `src/environments/environment.ts`). Sin backend, el login mostrará "Error de conexión" y el registro de usuario no funcionará — el resto de la aplicación (Home, Dashboard con datos mockeados) funciona de forma independiente.