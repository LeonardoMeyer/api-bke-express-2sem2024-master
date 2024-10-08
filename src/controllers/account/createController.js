import { accountValidateToCreate, create } from "../../models/accountModel.js"

const createController = async (req, res, next) => {
    try{
        const account = req.body

        const accountValidate = accountValidateToCreate(account)
        console.log(accountValidate)

        const result = await create(account)
        if(!accountValidate.success)
        return res.status(401).json({
            error: "Erro ao criar conta!",
            fieldErrors: accountValidate.error.flatten().fieldErrors
        })

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            account: result
        })
    } catch(error) {
        next(error)
    }
}

export default createController