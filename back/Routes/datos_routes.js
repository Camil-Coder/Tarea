import express from "express";
import upload from "../Models/configMulter.js";
import { datosController } from "../Controllers/datosController.js";

const rutaDatos = express.Router();



rutaDatos.post("/agregar", upload.single('foto'), datosController.Insertar);
rutaDatos.put("/actualizar", upload.single('foto'), datosController.Actualizar);




export default rutaDatos;
