import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import CryptoJS from "crypto-js"

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const query = { email: credentials.email }
        const res = await fetch(`http://localhost:3000/api/user/login`, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(query),
        }).then((res) => {
          return res.json()
        })

        const { id, userName, email, salt, passwd } = res.data.user
        let user = null

        if (
          CryptoJS.SHA512(salt + credentials.password).toString() === passwd
        ) {
          user = {
            id: id,
            userName: userName,
            email: email,
          }
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: (session, token) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
})
