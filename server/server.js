// server.js

const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 2024;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', noteRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
