-- Conectar a la base de datos 'tienda'
\c gimnasio;

CREATE TABLE profesor(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(300),
    imagen VARCHAR(100)
);

CREATE TABLE testimonios(
    id SERIAL PRIMARY KEY,
    idUsuario INT,
    mensaje VARCHAR(100)
);

INSERT INTO entrenamientos(plan, nombre, descripcion, imagen) VALUES
    ("plan-1", "ENTRENAMIENTO PERSONALIZADO", "Se adapta a las necesidades individuales considerando objetivos, nivel físico, tiempo disponible y salud general. Se diseña fijando objetivos claros, con ejercicios específicos determinando la frecuencia e intensidad adecuada y planificando un progreso gradual para optimizar resultados.", "/imagenes/entrenamiento-personalizado.jpg"),
    ("plan-2", "PREPARACIÓN FÍSICA DEPORTIVA", "Es un proceso pedagógico que busca mejorar el rendimiento de un atleta mediante el desarrollo de sus capacidades físicas y psicológicas a través de ejercicios y actividades estructuradas. Se adapta a las necesidades específicas de cada deporte para optimizar el potencial del deportista y prevenir lesiones.", "/imagenes/entrenamiento_fisico.webp"),
    ("plan-3", "CLASE GRUPAL CROSS TRAINING", "Nuestras clases combinan ejercicios básicos de fuerza, derivados del levantamiento olímpico, cardiovasculares y derivados de la gimnasia para mejorar la condición física general. Una clase típica dura alrededor de una hora e incluye: entrada en calor, una fase de fuerza o técnica, el workout of the day (WOD) y una vuelta a la calma.", "/imagenes/entrenamiento_crossfit.jpg"),
    ("plan-4", "ENTRENAMIENTO FUNCIONAL", "Se centra en movimientos que preparan el cuerpo para actividades diarias, mejorando fuerza, equilibrio y agilidad. Estás clases suelen durar alrededor de 45 minutos e incluyen una entrada en calor, ejercicios con el propio peso corporal, el uso de implementos como mancuernas o bandas elásticas y una rutina final de estiramientos.", "/imagenes/entrenamiento_funcional.jpg"),
    ("plan-5", "ENTRENAMIENTO ADULTOS MAYORES", "El entrenamiento para adultos mayores incluye ejercicios de fortalecimiento muscular, de carácter aeróbico y equilibrio para mejorar la salud física y mental. La clave es mantenerse activos, estimular y fortalecer los vínculos afectivos, buscando la variedad y progresión gradual.", "/imagenes/entrenamiento_mayores.webp"),
    ("plan-6", "EDUCACIÓN FÍSICA INFANTIL", "Se enfoca en el desarrollo integral de los niños mediante ejercicios seguros y adaptados a su edad. Es crucial para mejorar la coordinación, la fuerza, la salud ósea y muscular, así como habilidades sociales y emocionales.", "/imagenes/entrenamiento_niños.jpg",);

INSERT INTO testimonios(descripcion, autor) VALUES
    ("Me siento cómoda entrenando acá. Los profes explican bien y el ambiente motiva a seguir viniendo.", "— Valentina Rocca"),
    ("Las rutinas son prácticas y se adaptan a mi nivel. Noté mejoras sin sentirme sobreexigido.", "— Lucas Blasco");

INSERT INTO profesor(nombre, descripcion, imagen) VALUES
    ("Xavier Santos", "Fundador de XS Training. Es profesor y egresado de la Universidad Nacional de Río Cuarto (UNCR) en la carrera de Profesorado de Educación Física. ", "/imagenes/profe-1.webp"),
    ("Mariana Graciano", "Profesora especializada en entrenamiento funcional orientado para quienes buscan un gran físico. Es egresada de la UNCR en la carrera de Profesorado de Educación Física.", "/imagenes/profe-2.webp",),
    ("Kevin Torres", "Profesor especializado en entrenamiento deportivo orientado a deportistas profesionales o no. Es egresado de la UNCR en la carrera de Profesorado de Educación Física.", "/imagenes/profe-3.webp",);

INSERT INTO usuarios(usuario, correo, contraseña, tipoUsuario) VALUES /*tipoUsuario => tabla aparte*/
    ("usuario1", "usuario@gmail.com", "1234", "usuario"), /*=> reemplazar usuario por id*/
    ("admin1", "admin@gmail.com", "1234", "admin");

INSERT INTO inscripcion(nombre, apellido, dni, numTelefono, correo) VALUES
("Agus", "Benitez", "44500500", "+3581234232", "aguselmascapo@gmail.com"),
("Gasti", "Paz", "45400400", "+3582356811", "gastielmascapo@gmail.com");