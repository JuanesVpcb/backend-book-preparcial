# Bookstore Backend/Frontend

La aplicación funciona como un CRUD de autores donde el backend en Spring Boot expone una API REST en http://localhost:8080/api/authors y el frontend en Next.js consume esa API para listar, crear, editar y eliminar autores, gestionando el estado de manera global con un Context de React. 

---

## Objetivo

Proveer una interfaz web moderna para gestionar **autores** de una librería, permitiendo:

- Visualizar el listado de autores registrados
- Crear nuevos autores
- Editar la información de un autor existente
- Eliminar autores del sistema

---

## Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| Next.js 15 | Framework de React para el frontend |
| React | Librería de componentes UI |
| CSS Modules | Estilos por componente |
| Context API | Manejo del estado global |
| Docker | Contenedor del backend |

---

## Estructura del Proyecto

```
bookstore-front/
├── components/
│   ├── AuthorCard.js       # Tarjeta de autor (editar/eliminar)
│   └── AuthorForm.js       # Formulario de creación y edición
├── context/
│   └── AuthorsContext.js   # Estado global y llamadas a la API
├── hooks/
│   └── useAuthors.js       # Hook para acceder al contexto
├── pages/
│   ├── authors.js          # Página principal de autores
│   ├── crear.js            # Página de creación de autor
│   └── editar/[id].js      # Página de edición de autor
├── styles/
│   ├── globals.css         # Estilos globales
│   ├── Card.module.css     # Estilos de la tarjeta
│   ├── Form.module.css     # Estilos del formulario
│   └── Authors.module.css  # Estilos de la página principal
└── public/                 # Archivos estáticos
```

---

## ¿Cómo correr el proyecto?

### Requisitos previos

- Node.js instalado
- Docker instalado
- Backend (`bookstore-back`) disponible como imagen Docker

### 1. Levantar el backend

```bash
# Si el contenedor ya existe
docker start bookstore-back-app

# Si es la primera vez
docker run -it --name bookstore-back-app -p 8080:8080 bookstore-back-image
```

Verifica que el backend esté corriendo:

```bash
curl http://localhost:8080/api/authors
```

### 2. Instalar dependencias del frontend

```bash
cd bookstore-front
npm install
```

### 3. Correr en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Correr en modo producción

```bash
npm run build
npm start
```

---

## Guía de ejecución

### Preparación del entorno

1. Tener Java 17+ y Maven Wrapper disponibles para backend.
2. Tener Node.js 18+ y npm para frontend.
3. Levantar backend en `http://localhost:8080` (con Docker o ejecución local).
4. Instalar dependencias frontend:

```bash
cd bookstore-front
npm install
```

### Ejecutar suite de pruebas

Pruebas backend (JUnit/Spring):

```bash
./mvnw test
```

Pruebas frontend (Jest):

```bash
cd bookstore-front
npm test
```

Ejecución focalizada de pruebas de formulario:

```bash
cd bookstore-front
npx jest test/AuthorForm.test.js --runInBand
```

### Ejecución de la aplicación completa

Backend:

```bash
./mvnw spring-boot:run
```

Frontend (desarrollo):

```bash
cd bookstore-front
npm run dev
```

Frontend (producción):

```bash
cd bookstore-front
npm run build
npm start
```

---

## Reporte de Cambios

La persistencia entre rutas se resolvió centralizando las operaciones de autores en `AuthorsContext`, de forma que `/crear`, `/editar/[id]` y `/authors` consumen el mismo estado global y, tras cada operación `POST/PUT/DELETE`, se refresca el listado desde la API para mantener consistencia con el backend. En paralelo, la lógica de filtrado se integró directamente en la página `authors` aplicando métodos nativos de JavaScript sobre el arreglo (`filter` + `includes`) con comparación case-sensitive y un mensaje explícito cuando no hay coincidencias.

---

## 🔗 Conexión con el Backend

El frontend se comunica con el backend en:

```
http://localhost:8080/api/authors
```

Esto está configurado en `context/AuthorsContext.js`. Asegúrate de que el backend esté corriendo en el puerto `8080` antes de iniciar el frontend.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/authors` | Obtener todos los autores |
| POST | `/api/authors` | Crear un nuevo autor |
| PUT | `/api/authors/:id` | Editar un autor |
| DELETE | `/api/authors/:id` | Eliminar un autor |

---

## ⚠️ Problemas Comunes

### Error: container name already in use

```bash
docker rm -f bookstore-back-app
docker run -it --name bookstore-back-app -p 8080:8080 bookstore-back-image
```

### Error: could not find a production build

```bash
npm run build
npm start
```
