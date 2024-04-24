import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { PORT } from './src/config'

const app = express()

//Routes
import files from './src/routes/files.routes'
import root from './src/routes/main.routes'

type WhiteList = Array<string>
const whiteList: WhiteList = ["http://127.0.0.1:3000", "http://localhost:3000"]

app.use(bodyParser.json({ limit: '500kb' }))

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

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
})
