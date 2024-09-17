import { create } from "../../models/accountModel.js";

// Função de criação de conta no controlador
const createController = async (req, res, next) => {
    const accountData = req.body;
    try {
        const newAccount = await create(accountData); // Usando a função 'create' exportada corretamente
        return res.status(201).json({
            success: "Conta criada com sucesso!",
            account: newAccount
        });
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        next(error);
    }
};

export default createController;