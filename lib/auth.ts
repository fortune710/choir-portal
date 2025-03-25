import jwt from "jsonwebtoken";
import { getServerSession, NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: string;
 }

/**
 * Generate JWT Token
 */
export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

/**
 * Verify JWT Token
 */
export function verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch (error) {
        console.error("Error in GET request:", error);
      return null;
    }
}

interface CustomUser extends NextAuthUser {
  id: string;
  isActive: boolean;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, name: true, email: true, password: true, isActive: true }, // Ensure role is selected
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("User has not registered");
        }

        if (!user.isActive) {
          throw new Error("Account not activated. Check your email.");
        }


        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isActive: user.isActive, // ✅ Fix: Explicitly define isActive
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.isActive = (user as CustomUser).isActive;
  
        // Fetch user roles from database
        const userRoles = await prisma.userRole.findMany({
          where: { userId: user.id },
          include: { role: true },
        });
  
        token.roles = userRoles.map((r) => r.role.name); // ✅ Store roles in JWT
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isActive: token.isActive,
          roles: token.roles || [], // ✅ Ensure roles are included in session
        },
      };
    },
    async signIn() {
      return '/'
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


export async function auth() {
  const session = await getServerSession(authOptions);
  return session;
}