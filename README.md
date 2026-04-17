# Evaluación Parcial II - Aplicaciones WEB 🚀

Este repositorio contiene la resolución práctica de la Evaluación Parcial II para el curso de Aplicaciones WEB. Consiste en una aplicación web Full Stack que permite gestionar la autenticación de usuarios y la administración de sus perfiles, aplicando buenas prácticas de desarrollo.

**Universidad Da Vinci de Guatemala** Facultad de Ingeniería, Industria y Tecnología

---

## 🛠️ Tecnologías Utilizadas

El proyecto está dividido en dos capas principales, siguiendo un enfoque de arquitectura limpia y separación de responsabilidades:

* **Frontend:** Angular (Standalone Components, Formularios Reactivos).
* **Backend:** Node.js con Express (Controladores, Rutas y Servicios).
* **Base de Datos:** PostgreSQL.
* **Infraestructura:** Docker (para contenerización de la base de datos).

---

## ⚙️ Funcionalidades Implementadas

1.  **Módulo de Autenticación (Login):**
    * Validación de credenciales contra la base de datos.
    * Manejo de estados y errores (Ej: "Credenciales incorrectas").
2.  **Módulo de Perfil (CRUD):**
    * Creación de perfil para usuarios nuevos.
    * Actualización de perfil para usuarios existentes.
    * Validaciones estrictas tanto en frontend como en backend (campos requeridos, formato de correo, edad numérica, teléfono de 8 dígitos).

---

## 🚀 Instrucciones de Ejecución

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (v18 o superior)
* [Angular CLI](https://angular.io/cli)
* [Docker Desktop](https://www.docker.com/) (Opcional, si se usa el contenedor provisto)

### 2. Base de Datos (PostgreSQL)
El proyecto incluye un archivo `docker-compose.yml` para levantar la base de datos rápidamente.
```bash
# En la raíz del proyecto, ejecutar:
docker-compose up -d