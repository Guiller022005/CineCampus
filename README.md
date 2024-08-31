# CineCampus

## Descripción

CineCampus es una aplicación web diseñada para gestionar la selección de películas, compra de boletos, asignación de asientos y descuentos VIP para una empresa de entretenimiento.

## Tecnologías Utilizadas

- Node.js con Express
- MongoDB
- EJS para la renderización del lado del servidor 'proximamente'.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Instala las dependencias adicionales con `npm install express mongoose dotenv passport socket.io`.
4. Inicia el servidor con `npm start`.

## Estructura del Proyecto

- `config/`: Configuración de la base de datos.
- `controllers/`: Lógica de control para las rutas.
- `models/`: Esquemas de datos (MongoDB).
- `routes/`: Definición de las rutas de la API.
- `views/`: Plantillas EJS.
- `public/`: Archivos estáticos (CSS, JS, imágenes).
- `middlewares/`: Middlewares personalizados.
- `services/`: Servicios adicionales.

## Uso

1. Asegúrate de que MongoDB esté ejecutándose en tu máquina.
2. Creación del Archivo .env
3. Inicia el servidor con `node app.js`.
4. Accede a la API a través de `http://localhost:3000/api/movies`.

## Creación del Archivo .env
- **En la raíz del proyecto:** `crea un archivo llamado .env`
- **Escribe las variables de entorno:** `para acceder a la base de datos en el archivo .env`
- **Asegúrate de que no esté incluido en el control de versiones:** `(añádelo al archivo .gitignore)`

### Variables de Entorno `.env`
    ```json
        MONGO_PROTOCOLO="mongodb://"
        MONGO_USER="root"
        MONGO_PWD="campus2023"
        MONGO_HOST="localhost"
        MONGO_PORT=27017
        MONGO_DB_NAME="cineCampus"
    ```

# Caso 1 Selección de Películas

## API para Listar Películas

### 1. Obtener todas las películas

- **Endpoint:** `GET /api/movies`
- **URL:** `http://localhost:3000/api/movies`.
- **Descripción:** Este endpoint devuelve una lista de todas las películas con información adicional de sus horarios.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan las películas con detalles como título, sinopsis, género, reparto, y horarios.
  - **Ejemplo de respuesta:**
    ```json
    [{
        "titulo": "Spider-Man: Beyond the Spider-Verse",
        "genero": [
        "Acción",
        "Animación",
        "Aventura"
        ],
        "sinopsis": "La continuación de las aventuras del Spider-Verse, donde Miles Morales y sus aliados enfrentan nuevas amenazas en múltiples dimensiones.",
        "reparto": [
        {
            "nombre": "Shameik Moore",
            "personaje": "Miles Morales",
            "img": "https://example.com/shameik-moore.jpg"
        },
        {
            "nombre": "Hailee Steinfeld",
            "personaje": "Gwen Stacy",
            "img": "https://example.com/hailee-steinfeld.jpg"
        },
        {
            "nombre": "Oscar Isaac",
            "personaje": "Spider-Man 2099",
            "img": "https://example.com/oscar-isaac.jpg"
        }
        ],
        "trailer": "https://www.youtube.com/watch?v=CPV0--fgbbw",
        "estado": "cartelera",
        "fecha": "01/09/2024",
        "inicio": "6:00"
    }]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Obtener películas en cartelera

- **Endpoint:** `GET /api/movies/cartelera`
- **URL:** `http://localhost:3000/api/movies/cartelera`.
- **Descripción:** Devuelve todas las películas que actualmente están en cartelera.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos con las películas que están en cartelera.
  - **Ejemplo de respuesta:**
    ```json
    [{
        "_id": "66d0ec62d6820d3b3181a8e1",
        "titulo": "Spider-Man: Beyond the Spider-Verse",
        "genero": [
        "Acción",
        "Animación",
        "Aventura"
        ],
        "duracion": null,
        "sinopsis": "La continuación de las aventuras del Spider-Verse, donde Miles Morales y sus aliados enfrentan nuevas amenazas en múltiples dimensiones.",
        "img": "https://qph.cf2.quoracdn.net/main-qimg-b7f7aecf4cbb6896064cb7051dff1def",
        "reparto": [
        {
            "_id": "66d46807a74aed297273d701",
            "nombre": "Shameik Moore",
            "personaje": "Miles Morales",
            "img": "https://example.com/shameik-moore.jpg"
        },
        {
            "_id": "66d46807a74aed297273d702",
            "nombre": "Hailee Steinfeld",
            "personaje": "Gwen Stacy",
            "img": "https://example.com/hailee-steinfeld.jpg"
        },
        {
            "_id": "66d46807a74aed297273d703",
            "nombre": "Oscar Isaac",
            "personaje": "Spider-Man 2099",
            "img": "https://example.com/oscar-isaac.jpg"
        }
        ],
        "trailer": "https://www.youtube.com/watch?v=CPV0--fgbbw",
        "estado": "cartelera"
    }]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

## API para Obtener Detalles de Película

### 1. Obtener película por ID

- **Endpoint:** `GET /api/movies/:id`
- **URL:** `http://localhost:3000/api/movies/66d0ec62d6820d3b3181a8e5`.
- **Descripción:** Obtiene los detalles de una película específica según su ID.
- **Parámetros:**
  - **id:** `string` - El ID de la película que se desea obtener.
- **Respuesta:**
  - **Código 200:** Retorna un objeto que representa la película.
  - **Ejemplo de respuesta:**
    ```json
    [{
        "_id": "66d0ec62d6820d3b3181a8e5",
        "titulo": "Dune: Part Two",
        "genero": [
            "Ciencia Ficción",
            "Aventura"
        ],
        "duracion": null,
        "sinopsis": "La continuación de la adaptación de la novela 'Dune', siguiendo a Paul Atreides en su lucha por el control de Arrakis.",
        "img": "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
        "reparto": [
            {
            "_id": "66d46af0ead6d7592861da42",
            "nombre": "Timothée Chalamet",
            "personaje": "Paul Atreides",
            "img": "https://example.com/timothee-chalamet.jpg"
            },
            {
            "_id": "66d46af0ead6d7592861da43",
            "nombre": "Zendaya",
            "personaje": "Chani",
            "img": "https://example.com/zendaya.jpg"
            },
            {
            "_id": "66d46af0ead6d7592861da44",
            "nombre": "Rebecca Ferguson",
            "personaje": "Lady Jessica",
            "img": "https://example.com/rebecca-ferguson.jpg"
            }
        ],
        "trailer": "https://www.youtube.com/embed/Way9Dexny3w",
        "estado": "proximamente"
    }]
    ```
  - **Código 404:** Retorna un mensaje de error si la película no es encontrada.
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

# Caso 2 Compra de Boletos

## API para Verificar Disponibilidad de Asientos:

### 1. Obtener todos los asientos

- **Endpoint:** `GET /api/asientos/asiento`
- **URL:** `http://localhost:3000/api/asientos/asiento`.
- **Descripción:** Devuelve una lista de todos los asientos disponibles en la base de datos.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los asientos.
  - **Ejemplo de respuesta:**
    ```json
    [
      {
        "_id": "66d0c660d6820d3b3181a87b",
        "id_sala": "66d06ed8a20753a6ddd1559f",
        "tipo": "estandar",
        "fila": "A",
        "codigo": "A1"
      },
      {
        "_id": "66d0c660d6820d3b3181a87c",
        "id_sala": "66d06ed8a20753a6ddd1559f",
        "tipo": "preferencial",
        "fila": "A",
        "codigo": "A2"
      }
    ]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Obtener asientos disponibles por función

- **Endpoint:** `GET /api/asientos/asientos-disponibles-por-funcion/:id_funcion`
- **URL:** `http://localhost:3000/api/asientos/asientos-disponibles-por-funcion/66d0e536d6820d3b3181a8cd`.
- **Descripción:** Devuelve la lista de asientos disponibles para una función específica.
- **Parámetros:**
  - **id_funcion**: `string` - El ID de la función para la cual se desean consultar los asientos disponibles.
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los asientos disponibles para la función.
  - **Ejemplo de respuesta:**
    ```json
    {
    "message": "Asientos disponibles obtenidos",
    "asientos": [
      {
        "_id": "66d0c660d6820d3b3181a87c",
        "codigo": "A2"
      },
      {
        "_id": "66d0c660d6820d3b3181a87d",
        "codigo": "A3"
      }
      ]
    }
    ```
  - **Código 404:** Retorna un mensaje de error si la función no es encontrada.
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.
