## PASOS PARA CORRER EL PROYECTO

1. Construir la imagen
docker build -t imagen_admin .

2. Crear el contenedor
docker run --name contenedor_admin ^
-e POSTGRES_USER=root ^
-e POSTGRES_PASSWORD=pass ^
-e POSTGRES_DB=admin ^
-p 5432:5432 ^
-d imagen_admin

3. Verificar
docker exec -it contenedor_admin psql -U root -d admin

4. Ejecutar
SELECT * FROM usuario;

5. Colocarse en la carpeta backend ("cd {arrastrar la carpeta backend a la terminal CMD})

6. Ejecutar "npm i"

7. Ejecutar "pnpm approve-builds"

8. Seleccionar "bcrypt" con la barra espaciadora y darle enter

9. En el archivo ".env" de backend completar con los campos dados en el archivo .env.example.

Usuarios:

ROL de ADMIN

"correo": testing@gmail.com // "password": 12345

ROL de USUARIO

"correo": agus@gmail.com // "password": 12345