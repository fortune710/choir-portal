import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session } = useSession();

  return {
    user: session?.user || null,
    isAuthenticated: !!session,
    login: async (email: string, password: string) => {
      return signIn("credentials", { email, password, redirect: false });
    },
    logout: () => signOut(),
  };
}
