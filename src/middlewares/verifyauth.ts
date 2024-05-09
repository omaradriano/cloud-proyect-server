import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const verifyauth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        console.log(token);

        if (!token) {
            throw new Error('Error de autenticacion. Verifica tus credenciales');
        }
        const decoded = jwt.verify(token, TOKEN_SECRET as string, {algorithms: ['RS256']});
        // (req as CustomRequest).token = decoded;

        console.log('Este es el payload ', decoded);
        console.log(typeof decoded);

        next();
    } catch (err) {
        let error = err as Error
        res.status(401).json({ message: error.message, status: 401 });
    }
}