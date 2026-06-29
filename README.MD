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