import { Request, Response, Router } from 'express'
import createDocx from '../utils/generateDocs'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import templates_source from '../templates_path'

const files = Router()

files.post('/download/:file/:type', async (req: Request, res: Response) => {

    const info = req.body //La entrada de informacion va a ser valorada por el lado del usuario, de este lado se da por hecho que se envía la información correcta.
    let { file, type } = req.params

    try {
        await createDocx(file, info)

        const entryFilePath = path.resolve(templates_source, 'autogenerated', 'auto_generated.docx');

        if (!fs.existsSync(entryFilePath)) {
            throw new Error('El archivo docx no existe o no se generó correctamente');
        }
        console.log('Archivo docx generado');

        if (type === 'docx') {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${file}.docx`);

            const docxBuffer = fs.readFileSync(entryFilePath);
            res.status(200).send(docxBuffer);
        } else if (type === 'pdf') {

            /** Establece headers en caso de enviar un pdf (Estos headers son necesarios en caso de enviar un archivo pdf como respuesta, este no es el caso pero aqui los voy a dejar por si acaso. NO BORRAR)*/
            // res.setHeader("Content-Type", "application/pdf");
            // res.setHeader("Content-Disposition", `attachment; filename=${file}.pdf`);

            // // Convertir a Base64
            const base64String = Buffer.from(fs.readFileSync(entryFilePath)).toString('base64');

            if (!base64String || typeof base64String !== 'string') throw new Error('No se ha podido generar el formato base64')

            var options = {
                method: 'POST',
                url: 'https://api.apyhub.com/convert/word-base64/pdf-url',
                params: { output: 'test-sample.pdf', landscape: 'false' },
                headers: {
                    'apy-token': 'APY0QZXu17wejUg6UBftUUSdp42D2IsVdw8uhAjQIXXqTOeAAgCsWbdqxmEZDmrbiqiejZEz',
                    'Content-Type': 'application/json'
                },
                data: { base64: base64String }
            };

            axios.request(options).then(function (response) {
                console.log(response.data.data);
                res.status(200).json({ message: 'Archivo generado satisfactoriamente', url: String(response.data.data) })
                // console.log("Lectura para borrar los archivos");
                fs.readdir(path.resolve(templates_source, 'autogenerated'), (err, archivos) => {
                    if (err) throw new Error('Error al leer el directorio autogenerated')
                    // Itera sobre cada archivo en el directorio
                    archivos.forEach(nombreArchivo => {
                        // Obtiene la ruta completa del archivo
                        const rutaArchivo = path.join(path.resolve(templates_source, 'autogenerated'), nombreArchivo);
                        // Borra el archivo
                        fs.unlink(rutaArchivo, err => {
                            if (err) throw new Error('Error al borrar un archivo')
                            console.log(`Archivo ${nombreArchivo} eliminado`);
                        });
                    });
                });
            }).catch(function (error) {
                let errorMessage = 'Error desconocido'
                if (error instanceof Error) errorMessage = error.message
                res.status(500).json({ message: errorMessage })
            });

        }
    } catch (error) {
        let errorMessage = 'Error desconocido'
        if (error instanceof Error) errorMessage = error.message
        console.log(error);
        res.status(500).json({ message: errorMessage });
    }
})

export default files
