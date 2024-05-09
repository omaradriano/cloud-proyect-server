import { Request, Response, Router } from 'express'
// const { MongoClient } = require("mongodb");
import {MongoClient} from 'mongodb'
// Replace the uri string with your connection string.
const uri = "mongodb+srv://omaradriano:RFtEEFepvBnkAKg2@cluster-1.xsgzofl.mongodb.net/";
// import {v4 as uuid} from 'uuid'

const auth = Router()

auth.post('/register', async (req: Request, res: Response) => {
    const client = new MongoClient(uri);
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');

        const { email } = req.body

        const userExists = await users.findOne({"email":email}) 
        // console.log(userExists);
        if(!userExists){
            const data = await users.insertOne({ "email": email});
            res.status(200).json({message:'Usuario registrado |', userData: data})
            console.log('usuario registrado');
        }else{
            res.json({message: "Loggeado con exito"})
            console.log('usuario loggeado');
        }

    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
})

export default auth