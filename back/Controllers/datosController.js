import db from "../Models/conexion.js";


const Datos = async (req, res) => {
    try {
        const query = `SELECT p.*, col.descripcion AS descripcion_coleccion, cat.descripcion AS descripcion_categoria
        FROM pieza p
        INNER JOIN colecciones col ON p.colecciones = col.id_coleccion
        INNER JOIN categorias cat ON p.categoria = cat.id_categoria`;

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query);

        // Enviar respuesta con los productos encontrados
        res.status(200).json({ productos });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const DatosUno = async (req, res) => {
    const id_pieza = parseInt(req.params.id_pieza);
    try {
        const query = `SELECT p.*, 
        col.descripcion AS descripcion_coleccion, cat.descripcion AS descripcion_categoria
        FROM pieza p
        INNER JOIN colecciones col ON p.colecciones = col.id_coleccion
        INNER JOIN categorias cat ON p.categoria = cat.id_categoria
        WHERE p.id_pieza=?
        `;

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query, [id_pieza]);

        // Enviar respuesta con los productos encontrados
        res.status(200).json({ productos });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const Insertar = async (req, res) => {
    const { valorCompra, fechaCompra, nombre } = req.body;
    const foto = req.file ? req.file.path : '';
    const categoria = parseInt(req.body.categoria);
    const colecciones = parseInt(req.body.colecciones);
    try {
        const query = `INSERT INTO pieza (nombre,valorCompra,fechaCompra,foto,categoria,colecciones)
        VALUES (?,?,?,?,?,?)`

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query, [nombre, valorCompra, fechaCompra, foto, categoria, colecciones]);

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

const ActualizarFoto = async (req, res) => {
    const id_pieza = parseInt(req.params.id_pieza);
    const foto = req.file ? req.file.path : '';
    try {
        const query = `UPDATE pieza SET foto=?
        WHERE id_pieza=?`

        // Ejecutar consulta a la base de datos
        const [productos] = await db.query(query, [foto, id_pieza]);

        res.status(200).json({ mensaje: 'Todo ok', productos });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const Eliminar = async (req, res) => {
    const id_pieza = parseInt(req.params.id_pieza);

    try {
        const query = `DELETE FROM pieza WHERE id_pieza=?`
        const [productos] = await db.query(query, [id_pieza]);

        res.status(200).json({ mensaje: 'Todo ok' });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const datosController = {
    DatosUno,
    Datos,
    Insertar,
    Actualizar,
    ActualizarFoto,
    Eliminar,
};

