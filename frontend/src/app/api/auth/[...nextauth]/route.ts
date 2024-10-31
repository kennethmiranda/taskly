import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import pool from "@/src/app/database/mysql";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const [rows]: any = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        const user = rows[0];

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        if (!user.password) {
          throw new Error("No password found");
        }

        const isPasswordValid = await compare(
          String(credentials.password),
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  events: {
    async signIn({ user, account }) {
      if (account && user) {
        const providerId = account.providerAccountId;
        const provider = account.provider;

        // check if user exists in the `users` table
        let [existingUser]: any = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        );

        // if user doesn't exist, create new user
        if (existingUser.length === 0) {
          await pool.query(
            "INSERT INTO users (email, name, image) VALUES (?, ?, ?)",
            [user.email, user.name, user.image]
          );

          // fetch newly created user for linking provider data
          [existingUser] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [user.email]
          );
        }

        // link user to provider in `user_providers` table
        const [existingProvider]: any = await pool.query(
          "SELECT * FROM user_providers WHERE providerId = ? AND provider = ?",
          [providerId, provider]
        );

        if (existingProvider.length === 0) {
          await pool.query(
            "INSERT INTO user_providers (userId, provider, providerId) VALUES (?, ?, ?)",
            [existingUser[0].id, provider, providerId]
          );
        }
      }
    },
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || token.image;
      }
      return session;
    },
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        if (account?.provider === "google" && profile?.picture) {
          token.picture = profile.picture;
        } else {
          token.picture = user.image;
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
