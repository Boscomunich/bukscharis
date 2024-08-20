import NextAuth from "next-auth"
import { NextAuthConfig }from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials ({
            async authorize (credentials) {
                if (credentials) return credentials
                return null
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user}) {
            return { ...token, ...user }
        },
        async session({token, session}) {
            return session
        },
    }
})