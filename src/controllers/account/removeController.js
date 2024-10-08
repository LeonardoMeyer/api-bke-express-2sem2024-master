import { deleteAccount, accountValidateId } from "../../models/accountModel.js";

const removeController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const validatedId = accountValidateId(+id);

        if (validatedId?.error) {
            return res.status(401).json({
                error: "Erro ao validar o ID da conta!",
                fieldErrors: validatedId.error.flatten().fieldErrors
            });
        }

        const account = await deleteAccount(validatedId.data.id);

        if (!account) {
            return res.status(404).json({
                error: `Conta com o ID ${id} não encontrada!`
            });
        }

        return res.json({
            success: "Conta removida com sucesso!",
            account
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

export default removeController;
