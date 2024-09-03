import { updateAccount } from "../../models/accountModel.js"
const update = async (req, res) => {
    const account  = req .body
    const {id} = req.params

    account.id = +id
    const result = await uptadeAccount (account);
    if(!result){
        return res.status(404).json({message: "conta nao encontrada"})
    }
    return res.json({sucess: "Rota de PUT Account",
        account: result
    })
}

export default update