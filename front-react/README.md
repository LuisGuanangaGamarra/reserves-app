# 🎨 Frontend — Reservas de Eventos (React + Vite + TypeScript)

Aplicación **SPA** para explorar eventos, ver el detalle con disponibilidad de asientos y **realizar reservas**. Construida con **Vite + React + TypeScript**, manejando datos con **TanStack Query**, peticiones con **Axios**, y pruebas con **Jest + Testing Library** y **Playwright**.

> 💡 Este README está preparado para ejecución local, despliegue en **Render** mediante Docker y pruebas automáticas.

---

## 🧭 Tabla de contenidos
- [Características](#-características)
- [Arquitectura y estructura](#-arquitectura-y-estructura)
- [Requisitos](#-requisitos)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución en local](#-ejecución-en-local)
- [Testing](#-testing)
- [Docker para producción](#-docker-para-producción)
- [Autoría](#-autoría)

---

## 🚀 Características principales

- ⚛️ **React + Vite + TypeScript**
- 📡 **TanStack Query** para caché y fetching de datos reactivo.
- 🔐 **Axios** con baseURL configurable.
- 🧪 **Jest + Testing Library** para tests unitarios e integrados.
- 🧭 **Playwright** para pruebas E2E reales.
- 🐳 **Dockerfile optimizado para Render (Nginx + Node 20 Alpine)**.

---

## 🏗️ Estructura del proyecto

```
src/
├─ api/                  # Configuración del cliente HTTP
├─ feature/              # Features principales (eventos, reservas, etc.)
│  ├─ event-list/
│  ├─ event-book/
│  └─ reserve-detail/
├─ components/           # Layout, Spinner, UI genérica
├─ utils/                # Funciones comunes (fecha, formato, etc.)
└─ main.tsx              # Entrada principal de la app
```

---

## 📋 Requisitos previos

- Node.js >= 22
- npm >= 10
- Docker (opcional, para despliegue)

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001/api
VITE_API_TOKEN_URL=http://localhost:3001/api/csrf-token
```

---

## 🧠 Ejecución en local

```bash
npm ci
npm run dev
# abrir en http://localhost:5173
```

### 🏗️ Build de producción

```bash
npm run build
```

---

## 🧪 Testing

```bash
npm run test              # Unit + Integración
npm run test:coverage     # Cobertura
npm run e2e               # E2E
```

---

## 🌍 Demo en Producción

> **URL del demo:** [DEMO](https://reserves-app-front.onrender.com/)
---
## ✍️ Autoría

**Luis Guananga Gamarra**  
Frontend / Full‑Stack Developer — Ecuador  
🔗 [GitHub](https://github.com/LuisGuanangaGamarra)

Licencia **MIT**
