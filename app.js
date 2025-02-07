// app.js
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Configurar la sesión para keycloak-connect
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'some-secret-key',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Configuración de Keycloak
//    Ajusta "realm", "auth-server-url" y "resource" según tu entorno
const keycloakConfig = {
  "realm": "CybersecurityRealm",                    // Nombre del Realm
  "auth-server-url": "http://localhost:8080/auth/", // URL base de Keycloak
  "ssl-required": "none",
  "resource": "api-client",                         // Cliente creado en Keycloak
  "public-client": false,                           // false si es Confidential
  "confidential-port": 0
};

//Crear la instancia de Keycloak
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

// 4. Agregar los middlewares de Keycloak
app.use(keycloak.middleware());


// Endpoint público (SIN autenticación)
app.get('/public', (req, res) => {
  res.send('Este es un endpoint público.');
});

// Endpoint privado (requiere token válido)
app.get('/private', keycloak.protect(), (req, res) => {
  res.send('Este es un endpoint protegido.');
});

// Endpoint que recibe datos por POST (requiere token válido)
app.post('/data', keycloak.protect(), (req, res) => {
  const datos = req.body;
  // Aquí podrías procesar los datos
  res.json({
    message: 'Datos recibidos correctamente',
    datos
  });
});

// 6. Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
