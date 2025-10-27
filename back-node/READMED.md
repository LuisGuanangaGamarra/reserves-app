# 🎟️ API Reservas de Eventos — Backend DDD + Clean Architecture + Express + TypeORM

Este proyecto implementa una **API REST modular y escalable** basada en los principios de **Domain-Driven Design (DDD)** y **Clean Architecture**, utilizando **Express**, **TypeORM** y **InversifyJS** para la inyección de dependencias.

La aplicación gestiona **eventos, ubicaciones, asientos y reservas**, manteniendo una separación clara entre capas (Dominio, Aplicación, Infraestructura y Presentación).  
Diseñada para funcionar con **MySQL** o **SQLite**, y preparada para ejecutarse tanto **en entorno local** como dentro de **Docker / Docker Compose**.

---

## 🧠 Arquitectura del Proyecto

El proyecto sigue una estructura limpia, separando las responsabilidades en diferentes capas:

```
src/
├── application/              # Casos de uso (lógica de aplicación)
│   ├── use-cases/            # Ejecución de reglas de negocio
│   └── ILogger.ts            # Abstracción de logging
│
├── domain/                   # Entidades, agregados y contratos
│   ├── aggregates/           # Agregados raíz (EventAggregate, ReserveAggregate, etc.)
│   ├── entities/             # Entidades del dominio (Seat, Location, etc.)
│   ├── repositories/         # Interfaces de persistencia
│   └── value-object/         # Objetos de valor (ID, fechas, etc.)
│
├── infrastructure/
│   ├── api-server/           # Servidor Express y middlewares
│   ├── di/                   # Inversify container y módulos
│   ├── logger/               # Implementación de WinstonLogger
│   └── persistence/          # Adaptadores TypeORM y migraciones
│       ├── typeorm/
│       │   ├── entities/     # Entidades ORM
│       │   ├── migrations/   # Migraciones MySQL
│       │   ├── migrations-sqlite/  # Migraciones SQLite
│       │   ├── data-source.ts
│       │   └── sqlite-data-source.ts
│
├── presentation/
│   ├── dto/                  # DTOs para entrada/salida HTTP
│   └── mapper/               # Mappers automapper
│
└── main.ts                   # Punto de entrada de la aplicación
```

---

## ⚙️ Variables de Entorno (.env)

| Variable          | Descripción                                                   | Ejemplo |
|-------------------|---------------------------------------------------------------|----------|
| `NODE_ENV`        | Entorno de ejecución (`development` / `production`)           | `development` |
| `PORT`            | Puerto del servidor                                           | `3001` |
| `DB_TYPE`         | Tipo de base de datos (`mysql` o `sqlite`)                    | `mysql` |
| `DB_HOST`         | Host de la base de datos                                      | `localhost` |
| `DB_PORT`         | Puerto del servidor de base de datos                          | `3306` |
| `DB_USER`         | Usuario de la base de datos                                   | `root` |
| `DB_PASSWORD`     | Contraseña del usuario de la base de datos                    | `ZrfsMjfBL8j58KjvZDFQKCPL` |
| `DB_NAME`         | Nombre de la base de datos                                    | `events_db` |
| `DB_SSL`          | Indica si HTTPS está habilitado para la db (`true` / `false`) | `false` |
| `FRONTEND_ORIGIN` | Dominio permitido por CORS                                    | `http://localhost:5173` |
| `CSRF_SECRET`     | Clave secreta para el doble envío CSRF                        | `my-secret-token` |
| `ENABLE_HTTPS`    | Indica si HTTPS está habilitado (`true` / `false`)            | `false` |

---

## 💾 Configuración de Base de Datos

### 🐬 Opción 1: MySQL

1. Asegúrate de tener un contenedor o servicio MySQL corriendo.
2. Configura las variables del archivo `.env` con `DB_TYPE=mysql`.
3. Ejecuta las migraciones:

```bash
npm run typeorm migration:run
```

Esto creará todas las tablas y registros iniciales definidos en las migraciones.

---

### 🧱 Opción 2: SQLite (modo liviano)

1. Configura el `.env` con `DB_TYPE=sqlite`.
2. Las migraciones se ejecutan automáticamente al iniciar el servidor.
3. Ideal para desarrollo rápido o testing local (usa base en memoria `:memory:`).

---

## 🚀 Ejecución en Entorno Local

### 🔧 Requisitos Previos

- Node.js >= 22
- npm >= 10
- MySQL >= 8 (solo si usas MySQL)

### ▶️ Pasos

```bash
# 1. Instalar dependencias
npm ci --legacy-peer-deps

# 2. Crear archivo .env y configurar variables
cp .env.example .env

# 3. Ejecutar en modo desarrollo
npm run dev
```

El servidor se iniciará en:  
**http://localhost:3001**

---

## 🐳 Ejecución con Docker / Docker Compose

### 🧩 Dockerfile

El proyecto usa un build multi-stage optimizado:

- **Etapa builder:** compila TypeScript a JavaScript.
- **Etapa runner:** ejecuta la app con usuario no root, limpia caché npm y reduce tamaño.

### 🧰 Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: ./local/Dockerfile
    container_name: back-node
    env_file: .env
    ports:
      - '3001:3001'
    depends_on:
      - db
    networks:
      - app_network

  db:
    image: mysql:lts-oraclelinux9
    container_name: back-db
    restart: on-failure:1
    environment:
      MYSQL_ROOT_PASSWORD: ZrfsMjfBL8j58KjvZDFQKCPL
      MYSQL_DATABASE: events_db
      MYSQL_USER: user
      MYSQL_PASSWORD: userpass
    ports:
      - '3306:3306'
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

### ▶️ Iniciar con Docker Compose

```bash
docker-compose up -d --build
```

Esto levantará tanto la base de datos MySQL como el servidor Node.js.  
El contenedor ejecutará automáticamente las migraciones antes de iniciar la app.

---

## 🧩 Migraciones TypeORM

### Ejecutar migraciones (MySQL)

```bash
npm run typeorm migration:run
```

### Revertir migración

```bash
npm run typeorm migration:revert
```

---

## 🧰 Tecnologías Principales

| Categoría | Librerías / Frameworks |
|------------|------------------------|
| **Servidor HTTP** | Express.js |
| **ORM** | TypeORM |
| **DI Container** | InversifyJS |
| **Logger** | Winston + DailyRotateFile |
| **Seguridad** | Helmet, Rate Limit, CSRF doble envío |
| **Validación** | express-validator |
| **Arquitectura** | DDD + Clean Architecture |
| **Base de Datos** | MySQL / SQLite |
| **Contenedores** | Docker + Docker Compose |

---

## 🌍 Demo en Producción

> **URL del demo:** [DEMO](https://reserves-app-back.onrender.com/api/events)
---

## Coleccion de Postman
Se incluye la coleccion de postman en la carpeta root del proyecto.

---
## 🧾 Licencia

Este proyecto está licenciado bajo la licencia MIT.  
Puedes usarlo libremente para aprendizaje o referencia arquitectónica.

---

**Autor:**  
**Luis Guananga Gamarra** — *Frontend / Full-Stack Developer*  
📍 Ecuador  
🔗 [GitHub](https://github.com/LuisGuanangaGamarra)
