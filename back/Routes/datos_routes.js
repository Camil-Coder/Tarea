import express from "express";
import upload from "../Models/configMulter.js";
import { datosController } from "../Controllers/datosController.js";

const rutaDatos = express.Router();

rutaDatos.get("/leer/", datosController.Datos);
rutaDatos.get("/leer/:tabla", datosController.DatosTablas);
rutaDatos.post("/agregar", upload.single('foto'), datosController.Insertar);
rutaDatos.put("/actualizar", upload.single('foto'), datosController.Actualizar);
rutaDatos.put("/actualizar/foto/:id_pieza", upload.single('foto'), datosController.ActualizarFoto);
rutaDatos.delete("/eliminar/:id_pieza", datosController.Eliminar);


export default rutaDatos;
