const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const port = 1234;
const app = express();

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de la solicitud GET para servir el archivo 'index.html'
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo del envío del formulario
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configuración del transportador de Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Servidor SMTP para Hotmail/Outlook
        port: 587, // Puerto para TLS/STARTTLS
        secure: false, // True para puerto 465, false para otros puertos
        auth: {
            user: 'luquiminer@hotmail.com', // Tu dirección de correo
            pass: 'tu_contraseña_segura'  // Tu contraseña
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Opciones del correo
    const mailOptions = {
        from: 'luquiminer@hotmail.com', // Usa tu propia dirección de correo
        to: 'luquiminer@hotmail.com', // Envíate el correo a ti mismo
        subject: `Nuevo mensaje de ${name}`, // Asunto del correo
        text: `Has recibido un nuevo mensaje de tu formulario de contacto.\n\n` +
              `Nombre: ${name}\n` +
              `Email: ${email}\n` +
              `Teléfono: ${phone}\n\n` +
              `Mensaje:\n${message}` // Cuerpo del correo con los datos del formulario
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.redirect('/?message=error'); // Redirige al inicio con un mensaje de error
        }
        console.log('Correo enviado:', info.response);
        return res.redirect('/?message=success'); // Redirige al inicio con un mensaje de éxito
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});
