const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const port = 1234;
const app = express();

// Middleware para servir archivos estáticos directamente desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de la solicitud GET para servir el archivo 'index.html'
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});
