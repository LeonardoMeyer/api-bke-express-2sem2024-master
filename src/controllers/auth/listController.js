import { listAuth } from "../../models/authModel.js"

const list = async (req, res) => {

    try {
        const user = await listAuth()


        return res.json({
            message: "Contas listadas com sucesso!",
            user
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            error: `Erro no servidor`
        })

    }
    
}

export default list