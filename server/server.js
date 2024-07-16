// server.js

const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors'); // Importa el módulo cors

const app = express();
const PORT = process.env.PORT || 2024;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usa el middleware cors

// Rutas
app.use('/api', noteRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
