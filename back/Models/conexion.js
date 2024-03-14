import mysql from 'mysql2/promise'; // Cambiado para importar la versión de promesa

const db = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'productos'
});

db.connect()
    .then(() => console.log('Conexion a la base de datos exitosa'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

process.on('SIGINT', () => {
    db.end();
    process.exit();
});

export default db;
