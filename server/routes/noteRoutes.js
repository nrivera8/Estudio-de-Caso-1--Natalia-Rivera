// routes/noteRoutes.js

const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Ruta para obtener todas las notas
router.get('/notes', noteController.getAllNotes);

// Ruta para obtener una nota por ID
router.get('/notes/:id', noteController.getNoteById);

// Ruta para crear una nueva nota
router.post('/notes', noteController.createNote);

// Ruta para actualizar una nota existente
router.put('/notes/:id', noteController.updateNote);

// Ruta para eliminar una nota
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
