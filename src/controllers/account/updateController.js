import { update, accountValidateToUpdate } from "../../models/accountModel.js";

const updateController = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const account = req.body;
        account.id = +id; 

        const accountValidated = accountValidateToUpdate(account);

        if (accountValidated?.error) {
            return res.status(401).json({
                error: "Erro ao validar a conta!",
                fieldErrors: accountValidated.error.flatten().fieldErrors
            });
        }

        const result = await update(accountValidated.data);

        if (!result) {
            return res.status(401).json({
                error: "Erro ao atualizar a conta!"
            });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            account: result
        });
    } catch (error) {

        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: `Conta com o ID ${id} não encontrada!`
            });
        }
        next(error); 
    }
};

export default updateController;