import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // or your provider
import dbConnect from "@/lib/database/connection";
import User from "@/lib/database/models/user-model";
import Points from "@/lib/database/models/points-model";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await dbConnect();
      const user_from_db = await User.findOne({
        address: session.user.address,
      });

      if (user_from_db) {
        session.user.id = user_from_db._id;
      }
      return session;
    },
  },
});
