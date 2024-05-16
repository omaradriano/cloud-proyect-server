import path from 'path'

let templates_source: string

if (process.env.NODE_ENV === 'production') {
    templates_source = path.join(__dirname,'..','src', 'templates');
} else {
    // Ruta diferente para el entorno de desarrollo
    templates_source = path.join(__dirname, '..', 'templates');
}

export default templates_source