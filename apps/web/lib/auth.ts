import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      async authorize(credentials, req) {
        const { data } = await axios.post<
          any,
          { data: { user: any; access_token: string } }
        >(
          "http://localhost:9000/api/v1/auth/login",

          credentials
        );

        if (data.user) {
          return { ...data.user, access_token: data.access_token };
        } else {
          return null;
        }
      },
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          placeholder: "Enter Your Password",
        },
      },
      name: "Credentials",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};
