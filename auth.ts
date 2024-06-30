import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";

import {AuthOptions, getServerSession} from "next-auth"
import axiosClient from "@/providers/axiosClient";
import {AxiosError} from "axios";


const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                try {
                    const res = await axiosClient.post("/auth/login", {
                        email: credentials?.username,
                        password: credentials?.password,
                    })
                    // console.log("success", res)
                    // console.log(credentials)
                    console.log(res)
                    return res.data

                } catch (err: AxiosError) {
                    console.log(err)
                    return {error: err.response.data};
                    // throw new Error(err.response.data, {
                    //     cause: "ekrjekrj",
                    //
                    // })
                    //     console.error("Error")
                    //     console.error(err.response.data)
                    //     // throw err.response.data
                    //     // return {
                    //     //     message: err?.message,
                    //     // }
                    //     // return err.response.data
                    //     // console.error(err.response.data)
                    //
                }


                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null
                //
                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn(s) {
            if (s.user?.error) {
                console.log("MYCsdifjksdjfkdfjlkajsdfkjskldfj")
                console.log(s.user.error)
                const myError = new Error(JSON.stringify(s.user.error?.validationError))
                throw myError
            }
            return true

        },
        session: async ({session, user, token}) => {
            // console.log("session", session);
            console.log("suer", user);
            // console.log("token", token);
            // if (token.user) {
            session.user = token.user
            // }
            console.log('session callback', session);
            return session;
        },
        async jwt({user, token}) {
            // console.log("user", user);
            // console.log("token", token);
            token.user = user
            return token

        },
    },
    session: {
        strategy: "jwt", //(1)
    },

    pages: {
        signIn: "/auth/login",
    },
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export {authOptions, getSession}