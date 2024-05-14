import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { PORT } from './src/config'

const app = express()
app.use(cors({ origin: true, credentials: true }))

//Routes
import files from './src/routes/files.routes'
import root from './src/routes/main.routes'
import auth from './src/routes/auth.routes'
import data from './src/routes/data.routes'

type WhiteList = Array<string>
const whiteList: WhiteList = ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "https://bisondocx.tech"]

app.use(bodyParser.json({ limit: '500kb' }))

const allowedOrigins = ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "https://bisondocx.tech"];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        // Verificar si el origen está en la lista de orígenes permitidos
        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Permitir el acceso desde el origen
        } else {
            callback(new Error('Not allowed by CORS')); // No permitir el acceso desde el origen
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Habilitar CORS con las opciones especificadasc

// Uso de los headers para permitir peticiones de los sitios especificados (Esto es un middleware)
app.use((req: Request, res: Response, next: NextFunction) => {
    const origin: string | undefined = req.headers.origin;
    if (origin && whiteList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/', root) //Rutas de root
app.use('/files', files) //Rutas donde se armar los archivos

//Maneja autenticacion
app.use('/auth', auth)

//Rutas en las que se mueve informacion para cargar los datos en los campos de llenado de archivos
app.use('/data', data)

app.get('/', (req: Request, res: Response) => {
    res.send('From root')
})

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
})
