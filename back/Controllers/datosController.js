import db from "../Models/conexion.js";










































const Insertar = async (req, res) => {
    const { valorCompra, fechaCompra } = req.body;
    const foto = req.file ? req.file.path : '';
    const categoria = parseInt(req.body.categoria);
    const colecciones = parseInt(req.body.colecciones);
    try {
        const query = `INSERT INTO pieza (valorCompra,fechaCompra,foto,categoria,colecciones)
        VALUES (?,?,?,?,?)`

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query, [valorCompra, fechaCompra, foto, categoria, colecciones]);

        res.status(200).json({ mensaje: 'Todo ok', productos });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const Actualizar = async (req, res) => {
    const id_pieza = parseInt(req.body.id_pieza);
    const { valorCompra, fechaCompra } = req.body;
    const foto = req.file ? req.file.path : '';
    const categoria = parseInt(req.body.categoria);
    const colecciones = parseInt(req.body.colecciones);
    try {
        const query = `UPDATE pieza SET valorCompra=?,fechaCompra=?,foto=?,categoria=?,colecciones=?
        WHERE id_pieza=?`

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query, [valorCompra, fechaCompra, foto, categoria, colecciones, id_pieza]);

        res.status(200).json({ mensaje: 'Todo ok', productos });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
































export const datosController = {



    Insertar,
    Actualizar,
 
    
};

