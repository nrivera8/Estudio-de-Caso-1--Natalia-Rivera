# Estudio-de-Caso-1--Natalia-Rivera

# Sistema utilizando HTML5, CSS3, JavaScript y Node.js con Express.js 

La aplicación permite a los usuarios agregar, editar, eliminar y visualizar sus notas. Utilizando datos quemados, almacenados en 
memoria durante la ejecución de la aplicación. 

# Descripción del Servidor de Notas

El servidor de notas implementado en Node.js con Express.js proporciona una API RESTful para gestionar notas en memoria, sin la necesidad de utilizar una base de datos. Aquí están las características y funcionalidades implementadas:

## Funcionalidades Implementadas

1. **Endpoints CRUD:**
   - `GET /notas`: Obtiene todas las notas almacenadas.
   - `GET /notas/:id`: Obtiene una nota específica por su ID.
   - `POST /notas`: Crea una nueva nota.
   - `PUT /notas/:id`: Actualiza una nota existente.
   - `DELETE /notas/:id`: Elimina una nota por su ID.

2. **Modelo de Datos:**
   - Se utiliza la clase `Note.js` para representar cada nota con propiedades como `id`, `title`, `content`, `createdAt`, `updatedAt` y `tags`.
   - Las notas se almacenan en un arreglo en memoria (`notes`).

3. **Generación de IDs Únicos:**
   - Se implementa la generación automática de IDs únicos para cada nota utilizando la biblioteca `uuid`.

4. **Almacenamiento en Memoria:**
   - No se utiliza una base de datos; las notas se mantienen en memoria durante la ejecución de la aplicación.

5. **Actualización de Fechas:**
   - Las fechas de creación (`createdAt`) y última modificación (`updatedAt`) se actualizan automáticamente al crear o actualizar una nota.

6. **Validación Básica de Datos:**
   - Se realiza una validación básica para asegurar que el título no esté vacío antes de crear o actualizar una nota.


# Instrucciones para Levantar el Servidor de Notas

Estas instrucciones te guiarán a través de los pasos para levantar y ejecutar el servidor de notas en tu entorno local.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js 
- npm (administrador de paquetes de Node.js)

## Pasos para Ejecutar el Servidor

1. **Clonar el Repositorio:**

Puedes clonar este repo de la siguiente manera, abre tu terminal, y dirigete a la carpeta donde lo quieras clonar, utiliza el comando:
```bash 
git clone < URL-del-repositorio >
cd nombre-del-repositorio
```
2. **Instalar dependencias:**
```bash 
npm install
```
3. **Ejecutar el Servidor:**

Una vez todo ha sido correctamente instalado, puedes correr el servidor:
```bash 
node server.js 
```
4. **Detener el Servidor.:**

Para detener el servidor, presiona Ctrl + C en la terminal donde se está ejecutando.

5. **Iniciar la app client.:**
Dirigete a la carpeta client, puedes usar live server, das click derecho en index.html y seleccionas open with live server, que es una extension de vscode, o bien solo pulsa la tecla f5

### Nota: para facilitar pruebas con la API vamos a usar "ThunderClient" o "Postman", instalar extensión en Vscode.







