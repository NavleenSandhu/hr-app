import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';
const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) {
                    return null;
                }
                const isPasswordValid = await compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    return null;
                }
                return { id: user.userId, userId: user.userId, email: user.email, name: user.name };
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    userId: token.userId
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const { userId } = user as unknown as User;
                return { ...token, userId };
            }
            return token;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };