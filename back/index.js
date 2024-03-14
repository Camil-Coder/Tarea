import express from "express";
import urlencoded from "express";
import cors from "cors";
import datosRouter from "./Routes/datos_routes.js";
import bodyParser from "body-parser";

const app = express(); // inicialización de express

// cors sirve para solucionar los problemas de comunicación entre puertos
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200,
};

// configuraciones iniciales de middlewares
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de rutas iniciales
app.use("/datos", datosRouter);

// configuración del puerto del servidor
const PORT = process.env.PORT || 4000;

// envío de información por sí todo salio bien
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

