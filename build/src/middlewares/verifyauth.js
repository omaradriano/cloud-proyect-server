"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyauth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verifyauth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        console.log(token);
        if (!token) {
            throw new Error('Error de autenticacion. Verifica tus credenciales');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, { algorithms: ['RS256'] });
        // (req as CustomRequest).token = decoded;
        console.log('Este es el payload ', decoded);
        console.log(typeof decoded);
        next();
    }
    catch (err) {
        let error = err;
        res.status(401).json({ message: error.message, status: 401 });
    }
};
exports.verifyauth = verifyauth;
//# sourceMappingURL=verifyauth.js.map