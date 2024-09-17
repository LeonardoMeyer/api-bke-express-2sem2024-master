import { update } from "../../models/accountModel.js";

const updateController = async (req, res, next) => {
    const { id } = req.params; // Pegando o ID dos parâmetros da requisição
    try {
        const account = req.body; // Pegando o corpo da requisição, que contém os dados da conta
        account.id = +id; // Convertendo o ID para número (caso seja um número no banco)

        // Chamando a função de atualização no model
        const result = await update(account);

        if (!result) {
            return res.status(401).json({
                error: "Erro ao atualizar a conta!" // Ajustando a mensagem de erro
            });
        }

        return res.json({
            success: "Conta atualizada com sucesso!",
            account: result
        });
    } catch (error) {
        // Tratamento de erro específico do Prisma (P2025)
        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: `Conta com o ID ${id} não encontrada!` // Melhorando a mensagem de erro
            });
        }
        next(error); // Passando o erro para o middleware de erro, se houver
    }
};

export default updateController;
