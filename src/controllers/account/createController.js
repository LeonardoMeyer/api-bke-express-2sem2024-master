import { create  } from "../../models/accountModel.js"


const createA  = async (req, res) => {
    const account = req.body
    const result = await create(account)

    if(!result)
        return res.status(401).json({
            message: "erro ao criar conta!"
        })
    return res.json({
        sucess:"conta criada com sucesso",
        account: result
    })
}

export default createA