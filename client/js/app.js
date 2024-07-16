document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:2024/api/notes'; // URL de la API de notas
    let allNotes = []; // Arreglo para almacenar todas las notas obtenidas

    // Función asincrónica para obtener notas desde la API
    async function fetchNotes() {
        try {
            const response = await fetch(apiUrl); // Hacer solicitud GET a la API
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allNotes = await response.json(); // Convertir respuesta a JSON
            displayNotes(allNotes); // Llamar función para mostrar las notas
        } catch (error) {
            console.error('Error fetching notes:', error); // Manejo de errores
        }
    }

    // Función para mostrar notas en la grilla
    function displayNotes(notes) {
        const notesGrid = document.getElementById('notesGrid'); // Obtener elemento grilla
        notesGrid.innerHTML = ''; // Limpiar contenido previo

        notes.forEach(note => {
            // Crear elemento de tarjeta para cada nota
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card'); // Agregar clase para estilos CSS
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>Contenido: ${note.content}</p>
                <p>Creada: ${new Date(note.createdAt).toLocaleDateString()}</p>
                <p>Modificada: ${new Date(note.updatedAt).toLocaleDateString()}</p>
                <p>${note.tags.join(', ')}</p>
                <button onclick="editNote('${note.id}')">Editar</button>
            `;
            notesGrid.appendChild(noteCard); // Agregar tarjeta a la grilla
        });
    }

    // Función global para editar una nota (vinculada directamente en el HTML)
    window.editNote = function editNote(id) {
        window.location.href = `edit.html?id=${id}`; // Redireccionar a la página de edición con el ID de la nota
    }

    // Función asincrónica para guardar una nueva nota o actualizar una existente
    async function saveNote() {
        const id = new URLSearchParams(window.location.search).get('id'); // Obtener ID de la nota de la URL
        const title = document.getElementById('title').value; // Obtener título del formulario
        const content = document.getElementById('content').value; // Obtener contenido del formulario
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()); // Obtener etiquetas y limpiarlas

        const method = id ? 'PUT' : 'POST'; // Determinar método HTTP (PUT para actualizar, POST para crear)
        const url = id ? `${apiUrl}/${id}` : apiUrl; // Construir URL según la acción

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, tags }) // Convertir datos a JSON y enviar en el cuerpo de la solicitud
            });

            if (response.ok) {
                window.location.href = 'index.html'; // Redireccionar a la página principal si la solicitud fue exitosa
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error saving note:', error); // Manejo de errores
            alert('Error al guardar la nota'); // Mostrar alerta al usuario
        }
    }

    // Función global para eliminar una nota (vinculada directamente en el HTML)
    window.deleteNote = async function deleteNote() {
        const id = new URLSearchParams(window.location.search).get('id'); // Obtener ID de la nota de la URL

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE' // Hacer solicitud DELETE a la API para eliminar la nota
            });

            if (response.ok) {
                window.location.href = 'index.html'; // Redireccionar a la página principal si la solicitud fue exitosa
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting note:', error); // Manejo de errores
            alert('Error al eliminar la nota'); // Mostrar alerta al usuario
        }
    }

    // Obtener formulario de nota y manejar evento submit
    const noteForm = document.getElementById('noteForm');
    if (noteForm) {
        noteForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir envío automático del formulario
            saveNote(); // Llamar función para guardar nota al enviar el formulario
        });
    }

    // Función asincrónica para cargar datos en la página de edición/creación
    async function loadNote() {
        const id = new URLSearchParams(window.location.search).get('id'); // Obtener ID de la nota de la URL
        if (id) {
            try {
                const response = await fetch(`${apiUrl}/${id}`); // Hacer solicitud GET específica para obtener detalles de la nota
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const note = await response.json(); // Convertir respuesta a JSON
                document.getElementById('title').value = note.title; // Llenar formulario con datos de la nota
                document.getElementById('content').value = note.content;
                document.getElementById('tags').value = note.tags.join(', ');
                document.getElementById('formTitle').innerText = 'Editar Nota'; // Cambiar título del formulario
                document.getElementById('deleteBtn').style.display = 'block'; // Mostrar el botón eliminar
            } catch (error) {
                console.error('Error loading note:', error); // Manejo de errores
            }
        }
    }

    // Función para filtrar notas basadas en la búsqueda por título, contenido o etiquetas
    function searchNotes(event) {
        const query = event.target.value.toLowerCase(); // Obtener consulta de búsqueda en minúsculas
        const filteredNotes = allNotes.filter(note => {
            return note.title.toLowerCase().includes(query) || // Filtrar por título que contiene la consulta
                note.content.toLowerCase().includes(query) || // Filtrar por contenido que contiene la consulta
                note.tags.some(tag => tag.toLowerCase().includes(query)); // Filtrar por etiquetas que contienen la consulta
        });
        displayNotes(filteredNotes); // Mostrar notas filtradas
    }

    // Inicializar la página principal al cargar el DOM
    if (document.getElementById('notesGrid')) {
        fetchNotes(); // Llamar función para obtener y mostrar todas las notas
        document.getElementById('search').addEventListener('input', searchNotes); // Escuchar cambios en el campo de búsqueda
    }

    // Inicializar la página de edición/creación al cargar el DOM
    if (document.getElementById('noteForm')) {
        loadNote(); // Llamar función para cargar datos de la nota si se está editando
    }
});
