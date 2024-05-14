"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./src/config");
const app = (0, express_1.default)();
//Routes
const files_routes_1 = __importDefault(require("./src/routes/files.routes"));
const main_routes_1 = __importDefault(require("./src/routes/main.routes"));
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
const data_routes_1 = __importDefault(require("./src/routes/data.routes"));
const whiteList = ["http://127.0.0.1:3000", "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"];
app.use(body_parser_1.default.json({ limit: '500kb' }));
// Uso de los headers para permitir peticiones de los sitios especificados (Esto es un middleware)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && whiteList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/', main_routes_1.default); //Rutas de root
app.use('/files', files_routes_1.default); //Rutas donde se armar los archivos
//Maneja autenticacion
app.use('/auth', auth_routes_1.default);
//Rutas en las que se mueve informacion para cargar los datos en los campos de llenado de archivos
app.use('/data', data_routes_1.default);
app.listen(config_1.PORT, () => {
    console.log(`Running in port ${config_1.PORT}`);
});
//# sourceMappingURL=index.js.map