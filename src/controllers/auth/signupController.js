import { signup } from "../../models/authModel.js"

const signupAccount = async (req, res) => {
    const user = req.body

    try {
        const result = await signup(user);

        if (!result) {
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })
        }

        return res.json({
            success: "Conta criada com sucesso!",
            user: result
        })
    } catch (error) {

        console.error(error)
        return res.status(500).json({
            error: `Erro no servidor`
        })


    }
}
export default signupAccount