# Prueba Técnica Backend (Node.js) y Frontend (React.js)

## Instrucciones generales

El objetivo de esta prueba es buscar y resolver los comentarios "TODO" en el código tanto del backend como del frontend. Además, se te solicita implementar la persistencia en MySQL para el backend y agregar headers de seguridad y CORS al API del backend.

## Configuración del entorno

1. Asegúrate de tener Node.js v18 y npm (Node Package Manager) instalados en tu sistema.
2. Para la persistencia en MySQL, asegúrate de tener Docker y Docker Compose instalados en tu sistema.

## Frontend

1. Ve a la carpeta del frontend.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:
    
    ```
    npm install
    ```
3. Ejecuta el siguiente comando para levantar el servidor de desarrollo:

    ```
    npm run dev
    ```
4. Ahora, puedes comenzar a trabajar en los comentarios "TODO" en el código del frontend.

## Backend
El backend viene con una implementación de persistencia en memoria, deberás agregar una implementación de persistencia en MySQL y reemplazar la implementación actual.

Para ello, deberás crear las tablas que consideres necesarias en MySQL segun lo requerido por los
datos que se muestran en el frontend.

1. Ve a la carpeta del backend.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:

    ```
    npm install
    ```
3. Ejecuta el siguiente comando para levantar el servidor de desarrollo:

    ```
    npm run start
    ```

4. Levanta el servidor MySQL utilizando Docker Compose. El archivo necesario se encuentra en la carpeta del backend.

    ```
    docker compose up
    ```

4. Ahora, puedes comenzar a trabajar en los comentarios "TODO" en el código del backend.

## Primmer commit

Antes de comenzar con las tareas requeridas, realiza el primer commit con tu nombre y apellido modificando este README.md

Coloca aquí tu nombre y apellido: Luis Virgilio Guananga Gamarra

Esto nos permitirá identificar tu trabajo.

## Notas adicionales
Recuerda que la implementación de headers de seguridad y CORS son requisitos adicionales que se te solicitan para evaluar tus habilidades más allá de los comentarios "TODO".

¡Buena suerte con la prueba técnica! Esperamos ver tus soluciones.
