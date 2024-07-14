// controllers/noteController.js

const Note = require('../models/Note');

let notes = [
  new Note('Nota 1', 'Contenido de la nota 1', ['tag1', 'tag2']),
  new Note('Nota 2', 'Contenido de la nota 2', ['tag3']),
  new Note('Nota 3', 'Contenido de la nota 3', []),
];

// Obtener todas las notas
exports.getAllNotes = (req, res) => {
  res.json(notes);
};

// Obtener una nota por ID
exports.getNoteById = (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: `Nota con ID ${id} no encontrada` });
  }
};

// Crear una nueva nota
exports.createNote = (req, res) => {
  const { title, content, tags } = req.body;
  //-------
  try {
    // Validar que el título y el contenido no estén vacíos
    if (!title || !content) {
      throw new Error('El título y el contenido son obligatorios');
    }
    // Crear una nueva instancia de Note y agregarla al array de notas
    const newNote = new Note(title, content, tags);
    notes.push(newNote);
    
    // Devolver respuesta con estado 201 (CREATED) y la nueva nota creada
    res.status(201).json({ message: 'Nota creada correctamente', note: newNote });
  } catch (error) {
    // Capturar cualquier error lanzado durante la creación de la nota
    console.error('Error al crear la nota:', error.message);
    res.status(422).json({ error: error.message }); // Devolver estado 422 (UNPROCESSABLE ENTITY) y el mensaje de error
  }
};

// Actualizar una nota existente
// Actualizar una nota existente
exports.updateNote = (req, res) => {
    const id = req.params.id;
    const { title, content, tags } = req.body;
    const noteIndex = notes.findIndex(note => note.id === id);
  
    try {
      // Verificar si la nota existe
      if (noteIndex === -1) {
        throw new Error(`Nota con ID ${id} no encontrada`);
      }
  
      // Validar que el título y el contenido no estén vacíos
      if (!title || !content) {
        throw new Error('El título y el contenido son obligatorios');
      }
  
      // Actualizar los datos de la nota encontrada
      notes[noteIndex].title = title;
      notes[noteIndex].content = content;
      notes[noteIndex].tags = tags;
      notes[noteIndex].updatedAt = new Date(); // Actualizar la fecha de última modificación
  
      // Devolver respuesta con la nota actualizada
      res.json({ message: 'Nota actualizada correctamente', note: notes[noteIndex] });
    } catch (error) {
      // Capturar cualquier error lanzado durante la actualización de la nota
      console.error('Error al actualizar la nota:', error.message);
      res.status(422).json({ error: error.message }); // Devolver estado 422 (UNPROCESSABLE ENTITY) y el mensaje de error
    }
  };

// Eliminar una nota
exports.deleteNote = (req, res) => {
    const id = req.params.id;
    const noteIndex = notes.findIndex(note => note.id === id);
  
    try {
      // Verificar si la nota existe
      if (noteIndex === -1) {
        throw new Error(`Nota con ID ${id} no encontrada`);
      }
  
      // Eliminar la nota del array
      const deletedNote = notes.splice(noteIndex, 1);
  
      // Devolver respuesta con la nota eliminada
      res.json({ message: 'Nota eliminada correctamente', note: deletedNote[0] });
    } catch (error) {
      // Capturar cualquier error lanzado durante la eliminación de la nota
      console.error('Error al eliminar la nota:', error.message);
      res.status(422).json({ error: error.message }); // Devolver estado 422 (UNPROCESSABLE ENTITY) y el mensaje de error
    }
  };
