"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SECRET = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.SERVERPORT || 5007;
exports.TOKEN_SECRET = process.env.TOKEN_SECRET;
//# sourceMappingURL=config.js.map