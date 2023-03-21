import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export function AuthMiddleware(req: Request, res: Response, next: Function) {
    const token: string = req.headers['authorization']
    const paths: string[] = req.url.split('/').filter(path => path.length > 0)
    if (paths[0] === 'login') next()
    else {
        if (token) jwt.verify(token, 'lysmane', err => {
            if (err) {
                console.log(err)
                res.redirect('http://localhost:3000/login')
            } else next()
        })
        else res.redirect('http://localhost:3000/login')
    }
}