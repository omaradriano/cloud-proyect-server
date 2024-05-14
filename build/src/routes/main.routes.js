"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const root = (0, express_1.Router)();
root.get('/', (req, res) => {
    res.send('From home');
});
exports.default = root;
//# sourceMappingURL=main.routes.js.map