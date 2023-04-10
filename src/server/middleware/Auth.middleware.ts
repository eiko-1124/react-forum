import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export function AuthMiddleware(req: Request, res: Response, next: Function) {
    const token: string = req.headers['authorization']
    if (req.url.indexOf('/admin/') != -1) {
        if (token) jwt.verify(token, 'lysmane', err => {
            if (err) {
                console.log(err)
                res.sendStatus(302)
            } else next()
        })
        else res.sendStatus(302)
    }
    else next()
}