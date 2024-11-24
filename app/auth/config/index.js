// app/auth/config/index.js
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"  // Utilisation de l'alias @/

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/account',
    verifyRequest: '/account/verify',
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })
      return !!existingUser
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
      }
      return session
    }
  }
}