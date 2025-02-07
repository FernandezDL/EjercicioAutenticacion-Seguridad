<!--
PROJECT NAME
-->

# Asegurando una API con OpenID Connect y OAuth usando Keycloak

<a id="readme-top"></a>

<!--
PROJECT DESCRIPTION
-->

## 🔎 Objetivos

Este ejercicio tiene como objetivo proporcionar experiencia práctica en la creación y aseguramiento de una API RESTful utilizando Keycloak, que implementa OpenID Connect (OIDC) y OAuth 2.0. Se desarrollará una API y la protegerán usando autenticación basada en tokens.

## ✨ Prerrequisitos
- Conceptos básicos de APIs RESTful
- Familiaridad con métodos HTTP (GET, POST, PUT, DELETE)
- Fundamentos de OAuth 2.0 y OpenID Connect
- Programación en Node.js, Python (Flask/FastAPI), Java (Spring Boot) o cualquier otro lenguaje compatible


## 🧰 Herramientas requeridas
- Keycloak se recomienda usar la imagen de Docker para una configuración sencilla
- Postman o cURL para probar la API
- Editor de código - VS Code, IntelliJ


## 📖 Descripción de la Tarea
- Keycloak se recomienda usar la imagen de Docker para una configuración sencilla
- Postman o cURL para probar la API
- Editor de código - VS Code, IntelliJ


## 📦 Desarrollo de la API

Se implementará una API simple con los siguientes endpoints:

`GET /public` : Devuelve "Este es un endpoint público." (Accesible sin autenticación).

`GET /private` : Devuelve "Este es un endpoint protegido." (Requiere autenticación con un token válido).

`GET /data` : Acepta datos en formato JSON y devuelve una confirmación (Requiere autenticación con un token válido).

## ⚙️ Configuración de Keycloak 

### Instalación y Ejecución de Keycloak con Docker

Se ejecuta el siguiente comando para iniciar Keycloak en modo de desarrollo:

  ```bash
  docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
  ```

### Configuración

1. Acceder a la consola de Keycloak en `http://localhost:8080` e inicia sesión con usuario admin y contraseña admin.

2. Crear un nuevo reino llamado `CybersecurityRealm`.

3. Agregar un cliente con las siguientes configuraciones:

    * Nombre del cliente: `api-client`

    * Protocolo del Cliente: OpenID Connect

    * Tipo de Acceso: Confidencial

    * Habilitar Concesiones de Acceso Directo

4. Crear un usuario de prueba con nombre de usuario `testuser` y contraseña `password`.

## 🔒 Asegurando la API

Para validar los tokens JWT emitidos por Keycloak:

1. Instalar dependencias necesarias en Node.js:

  ```bash
  npm install express jsonwebtoken axios
  ```

2. Implementar middleware para validar tokens en la API.

3. Configurar la API para:

    * Permitir acceso a `/public` sin autenticación.

    * Requerir un token de acceso válido para los endpoints `/private` y `/data`.

## 🧪 Pruebas

### Obtener un Token de Acceso desde Keycloak

Ejecutar el siguiente comando en cURL para autenticar un usuario y obtener un `access_token`:

  ```bash
    curl -X POST \
    -d "client_id=api-client" \
    -d "username=testuser" \
    -d "password=password" \
    -d "grant_type=password" \
    "http://localhost:8080/realms/CybersecurityRealm/protocol/openid-connect/token"
  ```

El resultado incluirá un campo `access_token`, que se usará para autenticarse en la API.

### Pruebas con la API

* Acceder al endpoint público:
  ```bash 
  curl -X GET http://localhost:3000/public
  ```

* Intentar acceder al endpoint protegido sin token:
  ```bash 
  curl -X GET http://localhost:3000/private
  ```

* Acceder al endpoint protegido con un token válido:
  ```bash 
  curl -X GET http://localhost:3000/private -H "Authorization: Bearer <access_token>"
  ```

* Enviar datos al endpoint protegido:
  ```bash 
  curl -X POST http://localhost:3000/data \
    -H "Authorization: Bearer <access_token>" \
    -H "Content-Type: application/json" \
    -d '{"name": "Diana", "message": "Hola"}'
  ```

## 👥 Contribuciones
- 🍖 Emilio Solano
- 😺 Jennifer Toxcon
- 🐳 Brandon Sicay
- 👀 Diana Fernández
- 🤡 Dariel Villatoro
- 🐶 Daniel Morales

### 🚀 ¡Listo para probar la seguridad del API! 🎯


<p align="left">(<a href="#readme-top">Ir al inicio</a>)</p>

