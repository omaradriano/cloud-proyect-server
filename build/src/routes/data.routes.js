"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
// import { verifyauth } from '../middlewares/verifyauth';  
const uri = "mongodb+srv://omaradriano:RFtEEFepvBnkAKg2@cluster-1.xsgzofl.mongodb.net/";
const data = (0, express_1.Router)();
data.get('/', (req, res) => {
    res.send('Desde rutas de data');
});
data.post('/updatetest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email } = req.body;
    const allData = req.body;
    // const {name, n_control, address, age, tel, cel, career, sem, dependency_name, dependency_address, responsable_name, responsable_role, s_d, s_m, s_y, e_d, e_m, e_y, a_d, a_m, a_y, titiular_name, titular_role, program_name, inLocation, location_name} = req.body
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');
        yield users.updateOne({ email: email }, { $set: Object.assign({}, allData) });
        res.status(200).json({ message: 'Información actualizada' });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' });
    }
    finally {
        yield client.close();
    }
}));
data.post('/updateUserFile/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Ruta para modificar la informacion de los archivos de manera unitaria < ----------- AQUI ME QUEDÉ
    const client = new mongodb_1.MongoClient(uri);
    const { filename } = req.params;
    const { email } = req.body;
    const allData = req.body;
    delete allData.email;
    // const {name, n_control, address, age, tel, cel, career, sem, dependency_name, dependency_address, responsable_name, responsable_role, s_d, s_m, s_y, e_d, e_m, e_y, a_d, a_m, a_y, titiular_name, titular_role, program_name, inLocation, location_name} = req.body
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');
        yield users.updateOne({ email: email }, { $set: { files: { [filename]: Object.assign({}, allData) } } });
        res.status(200).json({ message: 'Información actualizada' });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' });
    }
    finally {
        yield client.close();
    }
}));
data.get('/getUserData/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email } = req.params;
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');
        const userdata = yield users.findOne({ email: email });
        res.status(200).json({ message: 'Información obtenido', userdata });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'No se ha realizado la modificación' });
    }
    finally {
        yield client.close();
    }
}));
exports.default = data;
//# sourceMappingURL=data.routes.js.map