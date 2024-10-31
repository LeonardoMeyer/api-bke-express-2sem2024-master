<<<<<<< HEAD
import { deleteByToken } from "../../models/sessionModel.js"

const logout = async (req, res, next) => {
    try{
        const {accessToken} = req.body

        if(!accessToken)    
            return res.status(401).json({
            error: "Erro no logout, accessToken não informado!"
        })

        await deleteByToken(accessToken)

        return res.json({
            success: "Logout efetuado com sucesso!"
        })
    } catch(error) {
        if(error?.code === 'P2025')
            return res.json({
                success: "Logout efetuado com sucesso!"
            })
        next(error)
    }
=======
const logout = (req, res) => {
    res.json({message: "Rota de POST Auth/Logout"})
>>>>>>> 294370bd4740f639a45859462a226cec9c9067ad
}

export default logout