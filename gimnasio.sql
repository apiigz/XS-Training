--
-- PostgreSQL database dump
--

\restrict kBisZcVGvTCU30zBIdddD1Q04EZgqSj37CA91NGtYIghapKdaWcweVQ94IF52su

-- Dumped from database version 15.18
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: estadoreserva; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estadoreserva AS ENUM (
    'confirmada',
    'no confirmada',
    'asistió',
    'ausente',
    'cancelada'
);


ALTER TYPE public.estadoreserva OWNER TO postgres;

--
-- Name: estadosuscripcion; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.estadosuscripcion AS ENUM (
    'pago',
    'vencido',
    'pendiente'
);


ALTER TYPE public.estadosuscripcion OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clasesprogramadas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clasesprogramadas (
    id bigint NOT NULL,
    identrenamiento bigint NOT NULL,
    idprofesor bigint NOT NULL,
    fechahora timestamp without time zone NOT NULL,
    cupomaximo integer
);


ALTER TABLE public.clasesprogramadas OWNER TO postgres;

--
-- Name: clasesprogramadas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clasesprogramadas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clasesprogramadas_id_seq OWNER TO postgres;

--
-- Name: clasesprogramadas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clasesprogramadas_id_seq OWNED BY public.clasesprogramadas.id;


--
-- Name: entrenamientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entrenamientos (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text NOT NULL,
    imagen character varying(255) NOT NULL
);


ALTER TABLE public.entrenamientos OWNER TO postgres;

--
-- Name: entrenamientos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entrenamientos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entrenamientos_id_seq OWNER TO postgres;

--
-- Name: entrenamientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entrenamientos_id_seq OWNED BY public.entrenamientos.id;


--
-- Name: estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.estados OWNER TO postgres;

--
-- Name: estados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estados_id_seq OWNER TO postgres;

--
-- Name: estados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_id_seq OWNED BY public.estados.id;


--
-- Name: inscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscripciones (
    id bigint NOT NULL,
    idusuario bigint,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    dni character varying(20) NOT NULL,
    numtelefono character varying(20) NOT NULL,
    correo character varying(150) NOT NULL
);


ALTER TABLE public.inscripciones OWNER TO postgres;

--
-- Name: inscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inscripciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inscripciones_id_seq OWNER TO postgres;

--
-- Name: inscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inscripciones_id_seq OWNED BY public.inscripciones.id;


--
-- Name: perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfiles (
    id bigint NOT NULL,
    idusuario bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    dni character varying(20) NOT NULL,
    numtelefono character varying(20) NOT NULL,
    correo character varying(150) NOT NULL
);


ALTER TABLE public.perfiles OWNER TO postgres;

--
-- Name: perfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfiles_id_seq OWNER TO postgres;

--
-- Name: perfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfiles_id_seq OWNED BY public.perfiles.id;


--
-- Name: profesores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profesores (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    imagen character varying(255)
);


ALTER TABLE public.profesores OWNER TO postgres;

--
-- Name: profesores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profesores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profesores_id_seq OWNER TO postgres;

--
-- Name: profesores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profesores_id_seq OWNED BY public.profesores.id;


--
-- Name: reservas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas (
    id bigint NOT NULL,
    idusuario bigint NOT NULL,
    idclaseprogramada bigint NOT NULL,
    fechareserva timestamp without time zone NOT NULL,
    estado public.estadoreserva DEFAULT 'no confirmada'::public.estadoreserva NOT NULL
);


ALTER TABLE public.reservas OWNER TO postgres;

--
-- Name: reservas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservas_id_seq OWNER TO postgres;

--
-- Name: reservas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservas_id_seq OWNED BY public.reservas.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: suscripciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscripciones (
    id bigint NOT NULL,
    idusuario bigint NOT NULL,
    identrenamiento bigint NOT NULL,
    fechapago date NOT NULL,
    fechavencimiento date NOT NULL,
    monto numeric(10,2) NOT NULL,
    estado public.estadosuscripcion DEFAULT 'pendiente'::public.estadosuscripcion NOT NULL
);


ALTER TABLE public.suscripciones OWNER TO postgres;

--
-- Name: suscripciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suscripciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suscripciones_id_seq OWNER TO postgres;

--
-- Name: suscripciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscripciones_id_seq OWNED BY public.suscripciones.id;


--
-- Name: testimonios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonios (
    id bigint NOT NULL,
    autor character varying(100) NOT NULL,
    contenido text NOT NULL
);


ALTER TABLE public.testimonios OWNER TO postgres;

--
-- Name: testimonios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonios_id_seq OWNER TO postgres;

--
-- Name: testimonios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonios_id_seq OWNED BY public.testimonios.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id bigint NOT NULL,
    correo character varying(150) NOT NULL,
    contrasena character varying(255) NOT NULL,
    idrol integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: clasesprogramadas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clasesprogramadas ALTER COLUMN id SET DEFAULT nextval('public.clasesprogramadas_id_seq'::regclass);


--
-- Name: entrenamientos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrenamientos ALTER COLUMN id SET DEFAULT nextval('public.entrenamientos_id_seq'::regclass);


--
-- Name: estados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados ALTER COLUMN id SET DEFAULT nextval('public.estados_id_seq'::regclass);


--
-- Name: inscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones ALTER COLUMN id SET DEFAULT nextval('public.inscripciones_id_seq'::regclass);


--
-- Name: perfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles ALTER COLUMN id SET DEFAULT nextval('public.perfiles_id_seq'::regclass);


--
-- Name: profesores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesores ALTER COLUMN id SET DEFAULT nextval('public.profesores_id_seq'::regclass);


--
-- Name: reservas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas ALTER COLUMN id SET DEFAULT nextval('public.reservas_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: suscripciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones ALTER COLUMN id SET DEFAULT nextval('public.suscripciones_id_seq'::regclass);


--
-- Name: testimonios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonios ALTER COLUMN id SET DEFAULT nextval('public.testimonios_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: clasesprogramadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clasesprogramadas (id, identrenamiento, idprofesor, fechahora, cupomaximo) FROM stdin;
1	1	1	2024-07-01 10:00:00	20
2	2	2	2024-07-01 15:00:00	15
3	3	3	2024-07-01 18:00:00	15
\.


--
-- Data for Name: entrenamientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entrenamientos (id, nombre, descripcion, imagen) FROM stdin;
2	PREPARACIÓN FÍSICA DEPORTIVA	Es un proceso pedagógico que busca mejorar el rendimiento de un atleta mediante el desarrollo de sus capacidades físicas y psicológicas a través de ejercicios y actividades estructuradas. Se adapta a las necesidades específicas de cada deporte para optimizar el potencial del deportista y prevenir lesiones.	/imagenes/entrenamiento_fisico.webp
3	CLASE GRUPAL CROSS TRAINING	Nuestras clases combinan ejercicios básicos de fuerza, derivados del levantamiento olímpico, cardiovasculares y derivados de la gimnasia para mejorar la condición física general. Una clase típica dura alrededor de una hora e incluye: entrada en calor, una fase de fuerza o técnica, el workout of the day (WOD) y una vuelta a la calma.	/imagenes/entrenamiento_crossfit.jpg
4	ENTRENAMIENTO FUNCIONAL	Se centra en movimientos que preparan el cuerpo para actividades diarias, mejorando fuerza, equilibrio y agilidad. Estás clases suelen durar alrededor de 45 minutos e incluyen una entrada en calor, ejercicios con el propio peso corporal, el uso de implementos como mancuernas o bandas elásticas y una rutina final de estiramientos.	/imagenes/entrenamiento_funcional.jpg
5	ENTRENAMIENTO ADULTOS MAYORES	El entrenamiento para adultos mayores incluye ejercicios de fortalecimiento muscular, de carácter aeróbico y equilibrio para mejorar la salud física y mental. La clave es mantenerse activos, estimular y fortalecer los vínculos afectivos, buscando la variedad y progresión gradual.	/imagenes/entrenamiento_mayores.webp
6	EDUCACIÓN FÍSICA INFANTIL	Se enfoca en el desarrollo integral de los niños mediante ejercicios seguros y adaptados a su edad. Es crucial para mejorar la coordinación, la fuerza, la salud ósea y muscular, así como habilidades sociales y emocionales.	/imagenes/entrenamiento_niños.jpg
1	ENTRENAMIENTO PERSONALIZADO	Se adapta a las necesidades individuales considerando objetivos, nivel físico, tiempo disponible y salud general. Se diseña fijando objetivos claros, con ejercicios específicos determinando la frecuencia e intensidad adecuada y planificando un progreso gradual para optimizar resultados.	/imagenes/entrenamiento-personalizado.jpg
7	PASE LIBREEeeEAFDSA	Acceso libre al gimnasio durante el horario de apertura.	/imagenes/pase_libre.jpg
\.


--
-- Data for Name: estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados (id, nombre) FROM stdin;
1	pago
2	pendiente
\.


--
-- Data for Name: inscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscripciones (id, idusuario, nombre, apellido, dni, numtelefono, correo) FROM stdin;
1	\N	Agostina	Rodriguez	46500500	3515005000	agostina@gmail.com
\.


--
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfiles (id, idusuario, nombre, apellido, dni, numtelefono, correo) FROM stdin;
1	1	Agostina	Rodriguez	46500500	123456789	agostina@gmail.com
\.


--
-- Data for Name: profesores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profesores (id, nombre, descripcion, imagen) FROM stdin;
1	Xavier Santos	Fundador de XS Training. Es profesor y egresado de la Universidad Nacional de Río Cuarto (UNCR) en la carrera de Profesorado de Educación Física.	/imagenes/profe-1.webp
2	Mariana Graciano	Profesora especializada en entrenamiento funcional orientado para quienes buscan un gran físico. Es egresada de la UNCR en la carrera de Profesorado de Educación Física.	/imagenes/profe-2.webp
3	Kevin Torres	Profesor especializado en entrenamiento deportivo orientado a deportistas profesionales o no. Es egresado de la UNCR en la carrera de Profesorado de Educación Física.	/imagenes/profe-3.webp
7	Nuevo Profesor (Click en Editar)	Escribe aquí la especialidad del profesor.	/imagenes/cuadro-subir-imagen.png
\.


--
-- Data for Name: reservas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservas (id, idusuario, idclaseprogramada, fechareserva, estado) FROM stdin;
1	1	1	2024-06-25 10:00:00	confirmada
2	2	2	2024-06-25 18:00:00	no confirmada
4	1	2	2026-06-09 02:40:20.059069	confirmada
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre) FROM stdin;
1	cliente
2	admin
\.


--
-- Data for Name: suscripciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suscripciones (id, idusuario, identrenamiento, fechapago, fechavencimiento, monto, estado) FROM stdin;
1	1	2	2024-06-01	2030-08-01	35000.00	pendiente
2	2	4	2026-06-09	2026-06-09	23000.00	pago
\.


--
-- Data for Name: testimonios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonios (id, autor, contenido) FROM stdin;
2	Lucas Blasco	Las rutinas son prácticas y se adaptan a mi nivel. Noté mejoras sin sentirme sobreexigido.
1	Valentina Rocca	Me siento cómoda entrenando acá. Los profes explican bien y el ambiente motiva a seguir viniendo.
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, correo, contrasena, idrol) FROM stdin;
1	agos@gmail.com	1234	1
2	sophie@gmail.com	12345	2
\.


--
-- Name: clasesprogramadas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clasesprogramadas_id_seq', 3, true);


--
-- Name: entrenamientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entrenamientos_id_seq', 13, true);


--
-- Name: estados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_id_seq', 2, true);


--
-- Name: inscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inscripciones_id_seq', 5, true);


--
-- Name: perfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfiles_id_seq', 1, true);


--
-- Name: profesores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_id_seq', 8, true);


--
-- Name: reservas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservas_id_seq', 4, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: suscripciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscripciones_id_seq', 2, true);


--
-- Name: testimonios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonios_id_seq', 3, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 2, true);


--
-- Name: clasesprogramadas clasesprogramadas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clasesprogramadas
    ADD CONSTRAINT clasesprogramadas_pkey PRIMARY KEY (id);


--
-- Name: entrenamientos entrenamientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrenamientos
    ADD CONSTRAINT entrenamientos_pkey PRIMARY KEY (id);


--
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);


--
-- Name: inscripciones inscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);


--
-- Name: perfiles perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id);


--
-- Name: profesores profesores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesores
    ADD CONSTRAINT profesores_pkey PRIMARY KEY (id);


--
-- Name: reservas reservas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: suscripciones suscripciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT suscripciones_pkey PRIMARY KEY (id);


--
-- Name: testimonios testimonios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonios
    ADD CONSTRAINT testimonios_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: clasesprogramadas fk_clase_entrenamiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clasesprogramadas
    ADD CONSTRAINT fk_clase_entrenamiento FOREIGN KEY (identrenamiento) REFERENCES public.entrenamientos(id) ON DELETE CASCADE;


--
-- Name: clasesprogramadas fk_clase_profesor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clasesprogramadas
    ADD CONSTRAINT fk_clase_profesor FOREIGN KEY (idprofesor) REFERENCES public.profesores(id) ON DELETE CASCADE;


--
-- Name: inscripciones fk_inscripcion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT fk_inscripcion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(id) ON DELETE SET NULL;


--
-- Name: perfiles fk_perfil_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT fk_perfil_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: reservas fk_reserva_clase; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT fk_reserva_clase FOREIGN KEY (idclaseprogramada) REFERENCES public.clasesprogramadas(id) ON DELETE CASCADE;


--
-- Name: reservas fk_reserva_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT fk_reserva_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: suscripciones fk_suscripcion_entrenamiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT fk_suscripcion_entrenamiento FOREIGN KEY (identrenamiento) REFERENCES public.entrenamientos(id) ON DELETE CASCADE;


--
-- Name: suscripciones fk_suscripcion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscripciones
    ADD CONSTRAINT fk_suscripcion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: usuario fk_usuario_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (idrol) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

\unrestrict kBisZcVGvTCU30zBIdddD1Q04EZgqSj37CA91NGtYIghapKdaWcweVQ94IF52su

