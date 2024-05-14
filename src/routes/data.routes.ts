import { NextFunction, Request, Response, Router } from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
// import { verifyauth } from '../middlewares/verifyauth';  
const uri = "mongodb+srv://omaradriano:RFtEEFepvBnkAKg2@cluster-1.xsgzofl.mongodb.net/";

const data = Router()

data.get('/', (req: Request, res: Response) => {
    res.send('Desde rutas de data')
})

data.post('/updatetest', async (req: Request, res: Response, next: NextFunction) => {
    const client = new MongoClient(uri);
    const { email } = req.body
    const allData = req.body
    // const {name, n_control, address, age, tel, cel, career, sem, dependency_name, dependency_address, responsable_name, responsable_role, s_d, s_m, s_y, e_d, e_m, e_y, a_d, a_m, a_y, titiular_name, titular_role, program_name, inLocation, location_name} = req.body

    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');

        await users.updateOne({ email: email }, { $set: { ...allData } })

        res.status(200).json({ message: 'Información actualizada' })

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' })
    } finally {
        await client.close();
    }
})

data.post('/updateUserFile/:filename', async (req: Request, res: Response) => {
    //Ruta para modificar la informacion de los archivos de manera unitaria < ----------- AQUI ME QUEDÉ
    const client = new MongoClient(uri);
    const { filename } = req.params
    const { email } = req.body
    const allData = req.body
    delete allData.email
    // const {name, n_control, address, age, tel, cel, career, sem, dependency_name, dependency_address, responsable_name, responsable_role, s_d, s_m, s_y, e_d, e_m, e_y, a_d, a_m, a_y, titiular_name, titular_role, program_name, inLocation, location_name} = req.body

    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');

        await users.updateOne({ email: email }, { $set: { files: { [filename]: { ...allData } } } })

        res.status(200).json({ message: 'Información actualizada' })

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' })
    } finally {
        await client.close();
    }
})

data.get('/getUserData/:email', async (req: Request, res: Response) => {
    const client = new MongoClient(uri);
    const { email } = req.params
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');

        const userdata = await users.findOne({ email: email })

        res.status(200).json({ message: 'Información obtenido', userdata })

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' })
    } finally {
        await client.close();
    }
})

export default data