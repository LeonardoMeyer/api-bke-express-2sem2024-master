import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"

export const auth = (req, res, next) => {
    const accessToken = req.headers.autorization
    console.log(accessToken)

    if (!autorization)
        return res.status(403).json({error: 'acessToken nao autorizado'})

    const acessToken = autorization.split(' ')[1]

    if(!accessToken)
        return res.status(403).json({error: 'acessToken nao autorizado'})

    try{
        const result = jwt.verify(accessToken, SECRET_KEY)
    }catch(error) {
        console.log(JSON.stringify.error)
    }
    console.log(acessToken)

    return res.json({teste: "ok"})
}