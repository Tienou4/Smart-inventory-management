import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
})

export const RegisterSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
})

export const VerifyEmailSchema = z.object({
    email: z.string().email("Email invalide"),
    token: z.string().min(1, "Code de vérification requis")
})