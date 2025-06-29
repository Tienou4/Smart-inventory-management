// auth.config.ts
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

export default { 
    providers: [
        // Provider de développement local
        ...(process.env.NODE_ENV === "development" ? [
            Credentials({
                id: "dev-login",
                name: "Dev Login",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials) {
                    // En développement, accepter n'importe quel email/mot de passe
                    if (credentials?.email) {
                        return {
                            id: "dev-user-1",
                            email: credentials.email as string,
                            name: "Dev User",
                            role: "USER"
                        }
                    }
                    return null
                }
            })
        ] : []),
        
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ] 
} satisfies NextAuthConfig