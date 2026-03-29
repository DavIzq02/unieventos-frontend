# Unieventos — Angular 21

**Unieventos** es una aplicación web diseñada para la comunidad de la Universidad del Magdalena (estudiantes, docentes, egresados y administrativos). Su propósito principal es facilitar la publicación, gestión y descubrimiento de eventos institucionales (académicos, culturales, deportivos, sociales, tecnológicos y de bienestar), manteniendo a toda la comunidad informada y conectada.

> Este proyecto es una migración y mejora de la versión original desarrollada en HTML5, CSS3 y JavaScript puro, ahora construida sobre **Angular 21** con arquitectura por Feature Modules.

---

## Árbol del proyecto

```
Unieventos/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts               (protección de rutas privadas)
│   │   │   ├── models/
│   │   │   │   ├── evento.model.ts             (modelo base de evento público)
│   │   │   │   └── my-evento.model.ts          (modelo de evento propio del usuario)
│   │   │   └── services/
│   │   │       ├── auth.service.ts             (lógica de autenticación y sesión)
│   │   │       ├── eventos.service.ts          (datos y lógica de eventos)
│   │   │       └── sidebar.service.ts          (estado del menú lateral con BehaviorSubject)
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   └── login/
│   │   │   │       ├── login.component.html
│   │   │   │       ├── login.component.css
│   │   │   │       └── login.component.ts
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
│   │   │   ├── shared.module.ts                (declara y exporta todos los componentes compartidos)
│   │   │   ├── models/
│   │   │   │   └── breadcrumb-item.model.ts    (interfaz para los items del breadcrumb)
│   │   │   └── components/
│   │   │       ├── header/
│   │   │       │   ├── header.component.html
│   │   │       │   ├── header.component.css
│   │   │       │   └── header.component.ts
│   │   │       ├── footer/
│   │   │       │   ├── footer.component.html
│   │   │       │   ├── footer.component.css
│   │   │       │   └── footer.component.ts
│   │   │       ├── breadcrumb/
│   │   │       │   ├── breadcrumb.component.html
│   │   │       │   ├── breadcrumb.component.css
│   │   │       │   └── breadcrumb.component.ts
│   │   │       └── sidebar/
│   │   │           ├── sidebar.component.html
│   │   │           ├── sidebar.component.css
│   │   │           └── sidebar.component.ts
│   │   ├── app.module.ts                       (módulo raíz, importa feature modules)
│   │   ├── app-routing.module.ts               (rutas raíz con lazy loading y AuthGuard)
│   │   └── app.component.ts                   (componente raíz con router-outlet)
│   ├── assets/
│   │   └── img/                               (imágenes estáticas: logo, escudo, portadas)
│   └── styles.css                             (estilos globales: fuentes, variables, layout base)
├── angular.json
├── package.json
└── README.md
```

---

## Especificaciones del Proyecto

- **Framework**: Angular 21 con arquitectura por **Feature Modules** y lazy loading.
- **Módulos**: Cada dominio funcional (Auth, Home, Dashboard, Eventos) tiene su propio módulo con rutas propias. Un `SharedModule` centraliza los componentes reutilizables.
- **Formularios**: Uso de `ReactiveFormsModule` con `FormBuilder`, `FormGroup`, `FormArray` y validaciones declarativas.
- **Estado del Sidebar**: Manejado con `BehaviorSubject` en `SidebarService`, siguiendo el patrón de servicio observable de Angular.
- **Protección de rutas**: `AuthGuard` con `CanActivate` protege las rutas `/dashboard` y `/eventos/*`.
- **Diseño Responsivo (Mobile-First)**: Interfaz adaptativa con CSS Grid y Flexbox. Variables CSS, fuente Google "Outfit" e iconos "Material Symbols Outlined".
- **Alertas**: Librería *SweetAlert2* para confirmaciones, errores y notificaciones de éxito.

---

## Rutas de la Aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `HomeComponent` | Público |
| `/login` | `LoginComponent` | Público |
| `/dashboard` | `DashboardComponent` | 🔒 Requiere sesión |
| `/eventos/mis-eventos` | `MisEventosComponent` | 🔒 Requiere sesión |
| `/eventos/crear-evento` | `CrearEventoComponent` | 🔒 Requiere sesión |

---

## Características Principales

1. **Home Público**: Búsqueda interactiva y filtrado de eventos (Actuales, Próximos) por categoría y texto. Vista de detalle por evento. Acceso sin autenticación.
2. **Autenticación Institucional**: Login con `ReactiveFormsModule` que valida estrictamente correos `@unimagdalena.edu.co`. Integración con API REST en `http://localhost:4000/api/usuario/login`. Persistencia de sesión en `localStorage`.
3. **AuthGuard**: Protección de rutas privadas. Redirige a `/login` si no hay sesión activa.
4. **Dashboard**: Vista principal del usuario autenticado con los mismos filtros del Home y acceso al menú lateral.
5. **Menú Lateral (Sidebar)**: Componente global manejado por `SidebarService` con `BehaviorSubject`. Muestra el nombre del usuario, navegación principal y opción de cerrar sesión.
6. **Mis Eventos**: Panel de gestión visual con modal interactivo que muestra descripción, horarios, preinscritos y código QR. Acciones de iniciar, modificar y eliminar con confirmación `SweetAlert2`.
7. **Crear Evento**: Formulario reactivo con campos dinámicos para horarios mediante `FormArray`. Validaciones en tiempo real, carga y previsualización de imagen de portada.

---

## Servicios Principales

| Servicio | Responsabilidad |
|---|---|
| `AuthService` | Login HTTP, validación de correo institucional, manejo de sesión en `localStorage` |
| `EventosService` | Datos mockeados de eventos públicos y propios, filtrado, CRUD en memoria |
| `SidebarService` | Estado observable del sidebar con `BehaviorSubject` |

---

## Última Actualización v28.03.2026

*Migración completa del proyecto de HTML/CSS/JS puro a Angular 21.*

### Agregado (Features)
- **Arquitectura Feature Modules**: Separación por dominios (`AuthModule`, `HomeModule`, `DashboardModule`, `EventosModule`) con lazy loading en el router raíz.
- **SharedModule**: Centraliza `HeaderComponent`, `FooterComponent`, `BreadcrumbComponent` y `SidebarComponent`. Exporta `RouterModule` para uso en todos los feature modules.
- **AuthGuard**: Protección de rutas `/dashboard` y `/eventos/*` con redirección automática a `/login`.
- **SidebarService**: Estado reactivo del menú lateral con `BehaviorSubject<boolean>`, consumido por `HeaderComponent` (abre) y `SidebarComponent` (cierra y escucha).
- **Formularios Reactivos**: `LoginComponent` y `CrearEventoComponent` usan `ReactiveFormsModule` con validaciones declarativas y mensajes de error en tiempo real.
- **FormArray en Horarios**: `CrearEventoComponent` implementa `FormArray` para agregar y eliminar franjas de horario dinámicamente.
- **Modelos tipados**: Interfaces `Evento`, `MyEvento`, `Horario` y `BreadcrumbItem` para tipado estricto en todo el proyecto.
- **Cierre de sesión funcional**: `SidebarComponent` llama a `AuthService.cerrarSesion()`, limpia `localStorage` y redirige al Home.

### Corregido (Bugfixes)
- **Sidebar en todas las páginas**: Resuelto mediante `SharedModule` — un único componente declarado y exportado, consumido por todos los feature modules.
- **Botón de usuario en Crear Evento**: El `HeaderComponent` recibe `[showUserBtn]="true"` como `@Input()`, eliminando la inconsistencia de visibilidad entre páginas.
- **Rutas abiertas sin autenticación**: Corregido con `AuthGuard` en `app-routing.module.ts`.
- **Cerrar sesión sin limpiar estado**: `SidebarComponent` ahora llama a `AuthService.cerrarSesion()` que elimina la clave `usuario` de `localStorage`.

### Actualizado (Refactors)
- `components.js` eliminado — sus responsabilidades se distribuyen entre los componentes Angular con `@Input()` y servicios.
- Estilos CSS migrados a archivos `.component.css` por componente, con `styles.css` global para variables y reset.
- Datos mockeados centralizados en `EventosService` en lugar de estar duplicados en cada componente.

---

## Pendiente a Mejorar

- **Persistencia real de eventos**: Los eventos creados viven en memoria. Integrar con backend o `localStorage`/`sessionStorage` via `EventosService`.
- **Validación de contraseña**: El backend actual acepta cualquier contraseña para correos válidos.
- **Modificar evento**: El botón de modificar en el modal aún no tiene funcionalidad implementada.
- **Modal QR**: Mejorar el posicionamiento y tamaño del ícono QR en primer plano.
- **Guardados y Reseñas**: Links del sidebar aún sin destino implementado.

## Pendiente a Realizar

- **Integración completa con backend**: Conectar `EventosService` con endpoints REST para CRUD real de eventos.
- **HTTP Interceptor**: Manejo centralizado de headers de autorización y errores HTTP.
- **Módulo de perfil de usuario**: Página de perfil con datos del usuario autenticado.
- **Pre-registro a eventos**: Funcionalidad para que usuarios se inscriban a eventos desde el Home o Dashboard.
- **Generación real de QR**: Integrar librería de generación de códigos QR (ej. `qrcode`, `ngx-qrcode`).
- **Animaciones Angular**: Aprovechar `@angular/animations` para transiciones del modal y sidebar.

---

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Correr la aplicación en modo local
npm start

# Build de producción (aun no disponible)
ng build
```

La aplicación estará disponible en `http://localhost:4200`.

> El módulo de login requiere el backend corriendo en `http://localhost:4000`. Sin backend, el login mostrará "Error de conexión" — el resto de la aplicación funciona de forma independiente,no esta intrada a la api rest.