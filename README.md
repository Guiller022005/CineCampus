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
3. Instala las dependencias adicionales con `npm install express mongoose mongodb bcrypt dotenv cookie-parser passport socket.io`.
4. Inicia el servidor con `npm run dev`.

## Estructura del Proyecto

- `config/`: Configuración de la base de datos.
- `controllers/`: Lógica de control para las rutas.
- `models/`: Esquemas de datos (MongoDB).
- `routes/`: Definición de las rutas de la API.
- `views/`: Plantillas EJS.
- `public/`: Archivos estáticos (CSS, JS, imágenes).
- `middlewares/`: Middlewares personalizados.
- `services/`: Servicios adicionales.

# Urls del Proyecto cineCampus

- http://localhost:3000/cineCampus
- http://localhost:3000/cineCampus/CreateAccount
- http://localhost:3000/cineCampus/Log-in
- http://localhost:3000/cineCampus/home
- http://localhost:3000/cineCampus/cinema?movieId=66d0ec62d6820d3b3181a8e1
- http://localhost:3000/cineCampus/seats

## Uso

1. Asegúrate de que MongoDB esté ejecutándose en tu máquina.
2. Creación del Archivo .env
3. Inicia el servidor con `node app.js`.
4. Accede a la API a través de `http://localhost:3000/api/peliculas`.

## Creación del Archivo .env
- **En la raíz del proyecto:** `crea un archivo llamado .env`
- **Escribe las variables de entorno:** `para acceder a la base de datos en el archivo .env`
- **Asegúrate de que no esté incluido en el control de versiones:** `(añádelo al archivo .gitignore)`

### Variables de Entorno `.env`

    ```json
    MONGO_PROTOCOLO="mongodb://"
    MONGO_USER="Karen"
    MONGO_PWD="12345"
    MONGO_HOST="172.16.102.35"
    MONGO_PORT=27017
    MONGO_DB_NAME="cineCampus"


    MONGO_PROTOCOL="mongodb://"
    MONGO_USER="root"
    MONGO_PWD="campus2023"
    MONGO_HOST="172.16.102.28"
    MONGO_PORT=27017
    MONGO_DB_NAME="cineCampus"

    EXPRESS_PROTOCOL="http://" 
    EXPRESS_HOST_NAME="localhost" 
    EXPRESS_PORT=5000 
    EXPRESS_STATIC="/home/camper/CineCampus-2/src" 
    EXPRESS_KEY_SECRET="MyLlaveSecreta"
    ```

    ```json
        MONGO_PROTOCOLO="mongodb://"
        MONGO_USER="root"
        MONGO_PWD="campus2023"
        MONGO_HOST="172.16.102.28"
        MONGO_PORT=27017
        MONGO_DB_NAME="cineCampus"
    ```

    ```json
        MONGO_PROTOCOLO="mongodb://"
        MONGO_USER="nuevoUsuario3"
        MONGO_PWD="contraseñaSegura3"
        MONGO_HOST="172.16.102.28"
        MONGO_PORT=27017
        MONGO_DB_NAME="cineCampus"
    ```

    ```json
        MONGO_PROTOCOLO="mongodb://"
        MONGO_USER="tata"
        MONGO_PWD="contraseñaSegura32"
        MONGO_HOST="172.16.102.28"
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
- **URL:** `http://localhost:3000/api/asientos/asientosByfuncion/66d0ec62d6820d3b3181a8e1`.
- **Descripción:** Devuelve la lista de asientos disponibles para una función específica por pelicula a ver.
- **Parámetros:**
  - **id_funcion**: `string` - El ID de la función para la cual se desean consultar los asientos disponibles.
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los asientos disponibles para la función.
  - **Ejemplo de respuesta:**
    ```json
  {
    "_id": "66d0e536d6820d3b3181a8cd",
    "idPelicula": "66d0ec62d6820d3b3181a8e1",
    "idSala": "66d06ed8a20753a6ddd1559f",
    "fecha": "01/11/2026",
    "hora": "6:00",
    "asientos": [
    {
    "_id": "66fa293ddd0ca099df3acd82",
    "asiento": "66d0c660d6820d3b3181a87b",
    "estado": "ocupado"
    },
    {
    "_id": "66fa293ddd0ca099df3acd83",
    "asiento": "66d0c660d6820d3b3181a87c",
    "estado": "ocupado"
    },
    {
    "_id": "66fa293ddd0ca099df3acd84",
    "asiento": "66d0c660d6820d3b3181a87d",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd85",
    "asiento": "66d0c660d6820d3b3181a87e",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd86",
    "asiento": "66d0c660d6820d3b3181a87f",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd87",
    "asiento": "66d0c660d6820d3b3181a880",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd88",
    "asiento": "66d0c660d6820d3b3181a881",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd89",
    "asiento": "66d0c660d6820d3b3181a882",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8a",
    "asiento": "66d0c660d6820d3b3181a883",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8b",
    "asiento": "66d0c660d6820d3b3181a884",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8c",
    "asiento": "66d0c660d6820d3b3181a885",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8d",
    "asiento": "66d0c660d6820d3b3181a886",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8e",
    "asiento": "66d0c660d6820d3b3181a887",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd8f",
    "asiento": "66d0c660d6820d3b3181a888",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd90",
    "asiento": "66d0c660d6820d3b3181a889",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd91",
    "asiento": "66d0c660d6820d3b3181a88a",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd92",
    "asiento": "66d0c660d6820d3b3181a88b",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd93",
    "asiento": "66d0c660d6820d3b3181a88c",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd94",
    "asiento": "66d0c660d6820d3b3181a88d",
    "estado": "disponible"
    },
    {
    "_id": "66fa293ddd0ca099df3acd95",
    "asiento": "66d0c660d6820d3b3181a88e",
    "estado": "disponible"
    }
  ]}
    ```
  - **Código 404:** Retorna un mensaje de error si la función no es encontrada.
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

## API para Comprar Boletos

### 1. Seleccion de la funcion y accion del usuario 'compra' o 'reserva'

- **Endpoint:** `POST /api/movimientos/`
- **URL:** `http://localhost:3000/api/movimientos`
- **Descripción:** Reserva un asiento específico para una película y horario dados.
- **Requiere:** Extension 'PostMan'
- **Método:** POST
- **URL:** `http://localhost:3000/api/movimientos`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {
      "idUser": "66d64e15118f3e19a7eebaab",
      "tipo": "reserva",
      "idFuncion": "66d0e536d6820d3b3181a8cd"
    }
    ```

- **Respuesta:**
  - **Código 200:** Retorna un mensaje de confirmación con los detalles del movimiento.
  - **Ejemplo de respuesta:**
    ```json
    {
      "mensaje": "Movimiento creado con éxito",
      "movimiento": {
          "tipo": "reserva",
          "idFuncion": "66d0e536d6820d3b3181a8cd",
          "idUser": "66d64e15118f3e19a7eebaab",
          "_id": "66d6724bb463264402a1b028",
          "createdAt": "2024-09-03T02:19:55.311Z",
          "updatedAt": "2024-09-03T02:19:55.311Z",
          "__v": 0
      }
    }
    ```
  - **Código 400:** Retorna un mensaje de error si el usuario no esta en la base de datos movimiento no se puede crear o hay un problema con la solicitud.
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Listar todos los movimientos

- **Endpoint:** `GET /api/movimientos/`
- **URL:** `http://localhost:3000/api/movimientos`
- **Descripción:** Lista los movimientos q han hecho los usuarios.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los movimientos de los usuarios.
  - **Ejemplo de respuesta:**
    ```json
    [
      {
      "_id": "66d0ae57d6820d3b3181a85f",
      "tipo": "compra",
      "idFuncion": "66d0e536d6820d3b3181a8cd",
      "idUser": "66d07916a20753a6ddd155d3"
      },
      {
      "_id": "66d0ae57d6820d3b3181a860",
      "tipo": "reserva",
      "idFuncion": "66d0e536d6820d3b3181a8ce",
      "iduser": "66d07916a20753a6ddd155d4"
      }
    ]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

# Caso de uso 3

## API para crear una boleta

### 1. Creacion de la boleta y su descuento para 'VIP' o sino continua al 'estandar'

- **Endpoint:** `POST /api/boletas/`
- **Descripción:** Este endpoint permite agregar una nueva boleta al sistema. Actualiza automaticamente al array de asientos de una funcion de estado 'disponible' a 'ocupado'.
- **Requiere:** Extension 'PostMan'
- **Método:** POST
- **URL:** `http://localhost:3000/api/boletas/`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {
      "idMovimiento": "66d0ae57d6820d3b3181a85f",
      "idUsuario": "66d5a9312d4f9ce31912abc3",
      "asientos":["66d0c660d6820d3b3181a87d", "66d0c660d6820d3b3181a882"],
      "fecha": "01/07/2024"
    }
    ```

- **Respuesta:**
- **Código 200:** Retorna un mensaje de confirmación con los detalles de la boleta.
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "Boleta creado exitosamente"
    {
      "idMovimiento": "66d0ae57d6820d3b3181a861",
      "asientos": [
          "66d0c660d6820d3b3181a87d",
          "66d0c660d6820d3b3181a882"
      ],
      "fecha": "01/07/2024",
      "totalAPagar": 800,
      "estadoCompra": "Completado",
      "_id": "66d7e67120a3d3780e1f8a63",
      "__v": 0
    }
  }
  ```
- **Código 400:** Retorna un mensaje de error si el asiento ya esta ocupado en la funcion, no se puede crear o hay un problema con la solicitud.
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Listar todos las boletas

- **Endpoint:** `GET /api/boletas/`
- **URL:** ` http://localhost:3000/api/boletas/`
- **Descripción:** Lista lAS boletas con estado 'Completado' o 'Cancelado'.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan las boletas de los usuarios.
  - **Ejemplo de respuesta:**
    ```json
    [
      {
        "asientos": [],
        "_id": "66d0b0f1d6820d3b3181a86d",
        "idMovimiento": "66d0ae57d6820d3b3181a85f",
        "idAsiento": "66d07688a20753a6ddd155a2",
        "fecha": "01/07/2024",
        "totalAPagar": 200,
        "estadoCompra": "Completado"
        },
        {
        "asientos": [],
        "_id": "66d0b0f1d6820d3b3181a86e",
        "idMovimiento": "66d0ae57d6820d3b3181a860",
        "idAsiento": "66d07688a20753a6ddd155a3",
        "fecha": "01/07/2024",
        "totalAPagar": 200,
        "estadoCompra": "Cancelado"
      }
    ]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.


### 1. Obtener Boleta por ID

- **Endpoint:** `GET /api/boletas/:id`
- **URL:** `http://localhost:3000/api/boletas/66d0b0f1d6820d3b3181a86f`.
- **Descripción:** Obtiene los detalles de una boleta específica según su ID.
- **Parámetros:**
  - **id:** `string` - El ID de la boleta que se desea obtener.
- **Respuesta:**
  - **Código 200:** Retorna un objeto que representa la película.
  - **Ejemplo de respuesta:**
    ```json
    [{
      "asientos": [],
      "estadoCompra": "Completado",
      "_id": "66d0b0f1d6820d3b3181a86f",
      "idMovimiento": "66d0ae57d6820d3b3181a861",
      "idAsiento": "66d07688a20753a6ddd155a4",
      "fecha": "01/07/2024",
      "totalAPagar": 200
    }]
    ```
  - **Código 404:** Retorna un mensaje de error si la boleta no es encontrada.
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.


### 3. Actualizacion de la informacion de la Boleta 

- **Endpoint:** `PUT /api/boletas/:id`
- **Descripción:** Este endpoint permite actualizar una boleta al sistema. 
- **Requiere:** Extension 'PostMan'
- **Método:** PUT
- **URL:** `http://localhost:3000/api/boletas/66d0b0f1d6820d3b3181a86f`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {
      "idMovimiento": "66d0ae57d6820d3b3181a861",
      "asientos":["66d0c660d6820d3b3181a87d", "66d0c660d6820d3b3181a882"],
      "fecha": "01/07/2024"
    }

    ```

- **Respuesta:**
- **Código 200:** Retorna un mensaje de confirmación con la actulizacion de la boleta. 
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "Boleta Actualizada exitosamente"
    {
      "estadoCompra": "Completado",
      "_id": "66d0b0f1d6820d3b3181a86f",
      "idMovimiento": "66d0ae57d6820d3b3181a861",
      "idAsiento": "66d07688a20753a6ddd155a4",
      "fecha": "01/07/2024",
      "totalAPagar": 200,
      "asientos": [
          "66d0c660d6820d3b3181a87d",
          "66d0c660d6820d3b3181a882"
      ]
    }
  }
  ```
- **Código 400:** Retorna un mensaje de error si la boleta no esta en la base de datos no se puede actualizar o hay un problema con la solicitud.
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.


# Caso de uso 5 Roles Definidos

## API para Crear Usuarios

### 1. Creacion del usuario y su rol 'VIP' o 'estandar'

- **Endpoint:** `POST /api/users/`
- **Descripción:** Este endpoint permite agregar un nuevo usuario al sistema.
- **Requiere:** Extension 'PostMan'
- **Método:** POST
- **URL:** `http://localhost:3000/api/users/`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {    "user": "nuevoUsuario42",   
         "pwd": "contraseñaSegura32",   
         "rol": "estandar"
    }
    ```

- **Respuesta:**
- **Código 200:** Retorna un mensaje de confirmación con los detalles del movimiento.
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "Usuario creado exitosamente"
  }
  ```
- **Código 400:** Retorna un mensaje de error si el usuario ya esta en la base de datos no se puede crear o hay un problema con la solicitud.
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Listar todos los usuarios

- **Endpoint:** `GET /api/users/`
- **URL:** `http://localhost:3000/api/users/`
- **Descripción:** Lista los usuarios q existen en la base de datos.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los usuarios.
  - **Ejemplo de respuesta:**
    ```json
    [
      {
        "_id": "66d5a9312d4f9ce31912abc3",
        "user": "VIP1",
        "pwd": "passwordVIP1",
        "rol": "VIP"
      },
      {
        "_id": "66d5a9312d4f9ce31912abc4",
        "user": "VIP2",
        "pwd": "passwordVIP2",
        "rol": "estandar"
      }
    ]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

# Caso de uso 5 Roles Definidos

## API para Crear Usuarios

### 1. Creacion del usuario y su rol 'VIP' o 'estandar'

- **Endpoint:** `POST /api/users/`
- **Descripción:** Este endpoint permite agregar un nuevo usuario al sistema.
- **Requiere:** Extension 'PostMan'
- **Método:** POST
- **URL:** `http://localhost:3000/api/users/`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {    
      "user": "karen",   
      "pwd": "contraseñaSegura32",   
      "rol": "adminRole"
    }
    ```

- **Respuesta:**
- **Código 200:** Retorna un mensaje de confirmación con los detalles del movimiento.
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "Usuario creado exitosamente"
  }
  ```
- **Código 400:** Retorna un mensaje de error si el usuario ya esta en la base de datos no se puede crear o hay un problema con la solicitud.
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Listar todos los usuarios

- **Endpoint:** `POST /api/users/`
- **URL:** `http://localhost:3000/api/users/`
- **Descripción:** Lista los usuarios q existen en la base de datos.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos que representan los usuarios.
  - **Ejemplo de respuesta:**
    ```json
    [
      {
        "_id": "66d5a9312d4f9ce31912abc3",
        "user": "VIP1",
        "pwd": "passwordVIP1",
        "rol": "VIP"
      },
      {
        "_id": "66d5a9312d4f9ce31912abc4",
        "user": "VIP2",
        "pwd": "passwordVIP2",
        "rol": "estandar"
      }
    ]
    ```
  - **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

### 2. Obtener usuarios por rol 'VIP' o 'estandar'

- **Endpoint:** `GET /api/users/rol`
- **URL:** `http://localhost:3000/api/users/rol`.
- **Descripción:** Devuelve todas usuarios que tienen el rol definido por la variable value, actualemnte esta predefinida en 'estandar', para filtrar 'VIP' solo cambia el dato a 'VIP' o descomenta value = VIP y comenta value = estandar.
- **Parámetros:** Ninguno
- **Respuesta:**
  - **Código 200:** Retorna un array de objetos con las películas que están en cartelera.
  - **Ejemplo de respuesta:**
    ```json
    [{
      "_id": "66d5a9622d4f9ce31912abcd",
      "user": "estandar1",
      "pwd": "passwordEstandar1",
      "rol": "estandar"
      },
      {
      "_id": "66d5a9622d4f9ce31912abce",
      "user": "estandar2",
      "pwd": "passwordEstandar2",
      "rol": "estandar"
    }]
    ```
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.

## API para Actualizar Usuarios

### 1. Actualizacion del usuario y su rol 'VIP' o 'estandar'

- **Endpoint:** `POST /api/users/`
- **Descripción:** Este endpoint permite actualizar un nuevo usuario al sistema. Si lo q deseas actualizar es la password el usuario actualiza aumaticamente su rol y contraseña, si deseas actualizar el nombre del usuario, se eliminara el actual y se creara uno nuevo, debido a q mongo por seguridad lo maneja asi no se actualizan user, entonces se vuelve a crear con el cuerpo de la solicitud.
- **Requiere:** Extension 'PostMan'
- **Método:** PUT
- **URL:** `http://localhost:3000/api/users/66d64faabc9c716b2bc08cde`
- **Headers:** Content-Type: application/json
- **Body (en formato JSON):**
- **Parámetros:**
  - **body:**
    ```json
    {   "user": "tato",
        "pwd": "newpasswore",
        "rol": "estandar"
    }
    ```

- **Respuesta:**
- **Código 200:** Retorna un mensaje de confirmación con la actulizacion del usuario. 
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "Usuario creado exitosamente"
  }
  ```
- **Código 400:** Retorna un mensaje de error si el usuario no esta en la base de datos no se puede actualizar o hay un problema con la solicitud.
- **Código 500:** Retorna un mensaje de error si ocurre un problema en el servidor.