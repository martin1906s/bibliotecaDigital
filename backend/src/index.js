require('dotenv').config();

const libroRoutes = require('./routes/libroRoutes');
const authRoutes = require('./routes/authRoutes')
const express = require('express');
const app = express();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const path = require('path');

const { apiReference } = require('@scalar/express-api-reference');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000' || process.env.CORS_ORIGIN, 
    // OR es para que si no existe la variable de entorno CORS_ORIGIN, se use http://localhost:3000
    credentials: true
};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API backend funcionando');
});
app.use('/api', libroRoutes);
app.use('/api', authRoutes);
app.use('/docs', apiReference({
     theme: 'purple',
     layout: 'modern',
     spec: {
        url: '/api/openapi.yaml'
     },
     configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: {
                token: 'token'
            }
        }
     }
}))

app.get('/api/openapi.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '../docs/openapi.yaml'));
})

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`Documentacion disponible en: http://localhost:${port}/docs`);
});


// back http://localhost:3000
// origen http://localhost:4200, 192.168.1.100
// front http://localhost:4200