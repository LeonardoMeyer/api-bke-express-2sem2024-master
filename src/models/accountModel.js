import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define o esquema de validação para Account usando zod
const accountSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    }).positive(),
    service: z.string({
        invalid_type_error: "O nome do serviço deve ser uma string",
        required_error: "O nome do serviço é obrigatório"
    })
        .min(1, { message: "O nome do serviço deve ter ao menos 1 caractere" })
        .max(255, { message: "O nome do serviço deve ter no máximo 255 caracteres" }),
    username: z.string({
        invalid_type_error: "O nome do usuário deve ser uma string",
        required_error: "O nome do usuário é obrigatório"
    })
        .min(3, { message: "O nome do usuário deve ter ao menos 3 caracteres" })
        .max(255),
    logo_image: z.string()
        .url({ message: "A logo deve ser uma URL válida" })
        .min(11, { message: "A URL deve ter no mínimo 11 caracteres" })
        .max(1000, { message: "A URL deve ter no máximo 1000 caracteres" })
        .optional(),
    pass: z.string()
        .min(6, { message: "A senha deve ter ao menos 6 caracteres" })
        .max(500, { message: "A senha deve ter no máximo 500 caracteres" }),
    user_id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    }).positive()
});

// Função de validação para criação de conta, sem o campo id
export const accountValidateToCreate = (account) => {
    const partialAccountSchema = accountSchema.partial({ id: true });
    return partialAccountSchema.safeParse(account);
}

// Função de validação para atualização de conta, com todos os campos obrigatórios
export const accountValidateToUpdate = (account) => {
    return accountSchema.safeParse(account);
}

// Função de validação para o id da conta, apenas o campo id obrigatório
export const accountValidateId = (id) => {
    const partialAccountSchema = accountSchema.partial({
        service: true,
        username: true,
        pass: true,
        user_id: true
    });
    return partialAccountSchema.safeParse({ id });
}

// Função de validação para listagem de contas, com campos parciais
export const accountValidateToList = (account) => {
    const partialAccountSchema = accountSchema.partial({
        id: true,
        service: true,
        username: true,
        user_id: true
    });
    return partialAccountSchema.safeParse(account);
}

// Listar contas, ordenadas por id em ordem decrescente
export const listAccounts = async () => {
    const accounts = await prisma.account.findMany({
        orderBy: {
            id: 'desc'
        }
    });
    return accounts;
}

// Buscar conta por ID
export const getByIdAccount = async (id) => {
    const account = await prisma.account.findUnique({
        where: {
            id
        }
    });
    return account;
}

// Criar nova conta
export const create = async (account) => {
    const result = await prisma.account.create({
        data: account
    });
    return result;
}

// Excluir conta por ID
export const deleteAccount = async (id) => {
    const account = await prisma.account.delete({
        where: {
            id: id
        }
    });
    return account;
}

// Atualizar conta existente
export const update = async (account) => {
    const result = await prisma.account.update({
        data: account,
        where: {
           id: account.id 
        }
    });
    return result;
}
