// models/Note.js

const { v4: uuidv4 } = require('uuid');

class Note {
  constructor(title, content, tags) {
    this.id = uuidv4(); // Genera un ID único usando UUID v4
    this.title = title.substring(0, 200); // Limita el título a 200 caracteres
    this.content = content; // Contenido obligatorio
    this.createdAt = new Date(); // Fecha y hora de creación
    this.updatedAt = new Date(); // Fecha y hora de última modificación inicialmente igual a createdAt
    this.tags = tags.map(tag => tag.substring(0, 100)); // Limita cada etiqueta a 100 caracteres y convierte a arreglo de etiquetas
  }
}

module.exports = Note;
