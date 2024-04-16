import express, { Request, Response } from 'express'

import { PORT } from './src/config'

const app = express()

//Routes
import files from './src/routes/files.routes'
import root from './src/routes/main.routes'


app.use('/',root) //Rutas de root

app.use('/files',files) //Rutas donde se armar los archivos

app.listen(PORT, ()=>{
    console.log(`Running in port ${PORT}`);
})
