import {Request, Response, Router} from 'express'

const root = Router()

root.get('/', (req: Request, res: Response)=>{
    res.send('From home')
})

export default root