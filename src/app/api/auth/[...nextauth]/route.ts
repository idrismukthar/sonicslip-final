import NextAuth, { type DefaultSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          // Added user-library-read for Albums/Podcasts
          scope: "user-read-email user-top-read user-read-recently-played user-library-read",
        },
      },
    }),
  ],
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: { httpOnly: true, sameSite: 'lax', path: '/', secure: true }
    }
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) { token.accessToken = account.access_token; }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };