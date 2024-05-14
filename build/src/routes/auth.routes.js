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
// const { MongoClient } = require("mongodb");
const mongodb_1 = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://omaradriano:RFtEEFepvBnkAKg2@cluster-1.xsgzofl.mongodb.net/";
// import {v4 as uuid} from 'uuid'
const auth = (0, express_1.Router)();
auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    try {
        const database = client.db('bisondocx');
        const users = database.collection('users');
        const { email } = req.body;
        const userExists = yield users.findOne({ "email": email });
        // console.log(userExists);
        if (!userExists) {
            const data = yield users.insertOne({ "email": email });
            res.status(200).json({ message: 'Usuario registrado |', userData: data });
            console.log('usuario registrado');
        }
        else {
            res.json({ message: "Loggeado con exito" });
            console.log('usuario loggeado');
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.close();
    }
}));
exports.default = auth;
//# sourceMappingURL=auth.routes.js.map