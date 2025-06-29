// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import Resend from "next-auth/providers/resend";

export const { 
  auth, 
  handlers, 
  signIn, 
  signOut 
} = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET, 
  pages: {
    signIn: '/sign-in',
    error: '/error',
    verifyRequest: '/verify-request',
  },
  events: {
    async linkAccount({ user }) {
      console.log("Compte lié:", user.email);
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    },
    async createUser({ user }) {
      console.log("Nouvel utilisateur créé:", user.email);
    },
    async signIn({ user, account, profile, isNewUser }) {
      console.log("Connexion utilisateur:", { 
        email: user.email, 
        provider: account?.provider,
        isNewUser 
      });
    }
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // Autoriser la connexion dev en local
      if (account?.provider === "dev-login" && process.env.NODE_ENV === "development") {
        return true;
      }
      if (account?.provider === "resend") return true;
      if (account?.provider !== "credentials") return true;
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (user) {
        console.log("JWT callback - user:", user.email);
      }
      
      // Gestion spéciale pour le mode développement
      if (account?.provider === "dev-login" && process.env.NODE_ENV === "development") {
        token.role = "USER";
        return token;
      }
      
      if (!token.sub) return token;

      const dbUser = await db.user.findUnique({
        where: { id: token.sub }
      });

      if (!dbUser) return token;

      token.role = dbUser.role;
      return token;
    }
  },
  // Adapter conditionnel selon l'environnement
  ...(process.env.NODE_ENV === "production" ? {
    adapter: PrismaAdapter(db)
  } : {}),
  
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  providers: [
    // Resend uniquement en production
    ...(process.env.NODE_ENV === "production" ? [
      Resend({
        apiKey: process.env.RESEND_API_KEY,
        from: "tienova@prepa3il-1a.online",
      })
    ] : []),
    ...authConfig.providers,
  ],
  debug: process.env.NODE_ENV === "development",
});