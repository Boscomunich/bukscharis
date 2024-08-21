import NextAuth from "next-auth"
import { NextAuthConfig }from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module 'next-auth' {
    interface session {
        user: {
            id: string,
            email: string,
            token: string
        }
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials ({
            async authorize (credentials) {
                return credentials
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async jwt({ token, user}) {
            return {...token, ...user}
        },
        async session({token, session}) {
            session.user = token as any
            return session
        },
    }
})