import {PrismaClient} from '@prisma/client'
import {z} from 'zod'

const prisma = new PrismaClient()

const accountSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    })
        .positive(),
    service: string({
        invalid_type_error: "O nome do serviço deve ser uma string",
        required_error: "O nome do serviço é obrigatório"
    })
        .min(1, { message: "O nome do serviço deve ter ao menos 1 caractere" })
        .max(255, { message: "O nome do serviço deve ter no máximo 255 caracteres" }),
    username: string({
        invalid_type_error: "O nome do serviço deve ser uma string",
        required_error: "O nome do serviço é obrigatório"
    })
        .min(3, { message: "O nome do usuário deve ter ao menos 3 caracteres" })
        .max(255),
    logo_image: string({
        invalid_type_error: "O nome do serviço deve ser uma string",
        required_error: "O nome do serviço é obrigatório"
    })
        .url({ invalid_type_error: "A senha deve ser uma string",
        required_error: "A senha é obrigatória" })
        .min(11, { message: "a URL deve ter no minimo 11 caracteres" })
        .max(1000, { message: "a URL deve ter  no maximo 1000 caracteres" })
        .optional(),
    pass: z.string({ message: "a senha deve ser uma string"})
        .min(6, { message: " A senha deve ter ao menos 6 caracteres"})
        .max(500, { message: "a senha deve ter no maximo 500 caracteres" }),
    user_id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    })
        .positive()
});


export const accountValidateToCreate = (account) => {
    const partialAccountSchema = accountSchema.partial({id: true})
    return partialAccountSchema.safeParse(account)
}

export const accountValidateToUpdate = (account) => {
    return accountSchema.safeParse(account)
}

export const accountValidateId = (id) => {
    const partialAccountSchema = accountSchema.partial({
        service: true,
        username: true,
        pass: true,
        user_id: true
    })
    return partialAccountSchema.safeParse({id})
}

export const listAccounts = async () => {
    const accounts = await prisma.account.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    return accounts
}

export const getByIdAccount = async (id) => {
    const account = await prisma.account.findUnique({
        where: {
            id
        }
    })
    return account
}

export const create = async (account) => {
    const result = await prisma.account.create({
        data: account
    })
    return result
}

export const deleteAccount = async (id) => {
    const account = await prisma.account.delete({
        where: {
            id: id
        }
    })
    return account
}

export const update = async (account) => {
    const result = await prisma.account.update({
        data: account,
        where:{
           id: account.id 
        }
    })
    return result
}