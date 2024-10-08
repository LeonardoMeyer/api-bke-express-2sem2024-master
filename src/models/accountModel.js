import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {z} from 'zod'

const accountSchema = z.object({
    id: z.number().positive(),
    service: z.string().min(1).max(255),
    username: z.string().min(3).max(255),
    pass: z.string().min(6).max(500),
    logo_image: z.string().url(11).max(1000).optional(),
    user_id: z.number()
})

export const accountValidateToCreate = (account) => {
    const partialAccountSchema = account.partial({id: true})
    return partialAccountSchema.safeParse(account)
}
// Função para listar todas as contas
export const listAccounts = async () => {
    try {
        const accounts = await prisma.account.findMany();
        return accounts;
    } catch (error) {
        console.error("Erro ao listar contas:", error);
        throw error;
    }
};

// Função para obter uma conta por ID
export const getByIdAccount = async (id) => {
    try {
        const account = await prisma.account.findUnique({
            where: { id: id },
        });
        return account;
    } catch (error) {
        console.error("Erro ao buscar conta por ID:", error);
        throw error;
    }
};

// Função para criar uma nova conta
export const create = async (account) => {
    try {
        const result = await prisma.account.create({
            data: account,
        });
        return result;
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        throw error;
    }
};

// Função para deletar uma conta por ID
export const deleteAccount = async (id) => {
    try {
        const account = await prisma.account.delete({
            where: { id: id },
        });
        return account;
    } catch (error) {
        console.error("Erro ao deletar conta:", error);
        throw error;
    }
};

// Função para atualizar uma conta existente
export const update = async (account) => {
    try {
        const result = await prisma.account.update({
            data: account,
            where: { id: account.id },
        });
        return result;
    } catch (error) {
        console.error("Erro ao atualizar conta:", error);
        throw error;
    }
};

// Se você precisar da função 'signup', pode adicionar assim:
export const signup = async (userData) => {
    try {
        const newUser = await prisma.account.create({
            data: userData,
        });
        return newUser;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
    }
};
