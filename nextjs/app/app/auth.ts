import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { addUser, getUser } from './lib/user'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt ({ token, account, profile, session, trigger }){
      if (account) {
        token.provider = account.provider
        token.providerAccountId = account.providerAccountId
      }

      if (trigger === "signUp") {
        console.log("signUp");
      }

      if (trigger === "update" && session) {
        console.log('update', session)
        token.session = session
        return token
      }
      return token
    },
    async session({ session, token }) {

      const { provider, providerAccountId } = token

      if(token.session) {
        return token.session;
      }

      if (session.user) {
        const { id, preferences } = await getUser(`${provider}:${providerAccountId}`)
        session.user.preferences = JSON.parse(preferences)
        session.user.id = id;
      }

      return session
    },
    async signIn ({user, account, profile}) {

      const { provider, providerAccountId } = account
      try{
        await getUser(`${provider}:${providerAccountId}`)
      } catch(error) {
        addUser(profile.name, provider, providerAccountId)
      }
      
      return true
    },
  },
})
