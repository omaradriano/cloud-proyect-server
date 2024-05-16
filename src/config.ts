import { config } from "dotenv";
config()

export const PORT = process.env.SERVERPORT || 5007
export const TOKEN_SECRET = process.env.TOKEN_SECRET

import path from 'path'

let templates_source: string

if (process.env.NODE_ENV === 'production') {
    templates_source = path.join(__dirname,'..','..', 'src', 'templates');
} else {
    templates_source = path.join(__dirname,'..', 'src', 'templates');
    // Ruta diferente para el entorno de desarrollo
}

console.log(templates_source);

export default templates_source
