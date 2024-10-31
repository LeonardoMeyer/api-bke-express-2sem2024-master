import { listAccounts, accountValidateToList } from "../../models/accountModel.js";

const listController = async (req, res, next) => {
    try {
        const filters = req.body || {};

        const validatedFilters = accountValidateToList(filters);

        if (validatedFilters?.error) {
            return res.status(401).json({
                error: "Erro ao listar contas!",
                fieldErrors: validatedFilters.error.flatten().fieldErrors
            });
        }

        const accounts = await listAccounts(validatedFilters.data);

        if (!accounts || accounts.length === 0) {
            return res.status(404).json({
                error: "Nenhuma conta encontrada!"
            });
        }

        return res.json({
            success: "Contas listadas com sucesso!",
            accounts
        });
    } catch (error) {
        next(error);
    }
};

export default listController;