import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import fetcher from "./fetcher";
const getUser = async (): Promise<any> => {
  const req = true;
  return req
    ? {
        message: "string",
        code: 200,
        access_token: "",
        refresh_token: "",
      }
    : null;
};
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log(parsedCredentials);
          const user = await getUser();

          if (!user) return null;
          //       const passwordsMatch = await bcrypt.compare(password, user.password);
          return user;
          //   if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
    Credentials({
      id: "BEJAE-auth-login", // <- add this line
      name: "BEJAE-auth-login",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const res = await fetcher("/auth/login", {
            method: "POST",
            body: JSON.stringify({
              principal: email,
              password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          console.log(res);
          return res;
        } else {
          throw new Error("Email and password are required");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "Yo/0duPLAErkzTcBlgWGWR4eaVyivqU6a+M/ot0fo9c=",
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const callbackUrl = new URL(request.nextUrl.href).searchParams.get(
        "callbackUrl"
      );
      if (!isLoggedIn) return false;

      if (isOnLogin && isLoggedIn) {
        if (callbackUrl) {
          return NextResponse.redirect(callbackUrl);
        }
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log({url, baseUrl })
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  logger: {
    error(code, ...message) {
      // console.error(code, message)
    },
    warn(code, ...message) {
      //   console.warn(code, message)
    },
    debug(code, ...message) {
      // console.debug(code, message)
    },
  },
} satisfies NextAuthConfig;
