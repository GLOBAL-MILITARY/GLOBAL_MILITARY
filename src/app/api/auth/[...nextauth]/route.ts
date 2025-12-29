import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error("❌ Google Login Error: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables.");
} else {
    console.log("✅ Google Client ID loaded:", process.env.GOOGLE_CLIENT_ID.substring(0, 10) + "...");
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("✅ User attempting sign in:", user.email);
            return true;
        },
        async session({ session, token }) {
            return session;
        }
    },
    debug: true, // Enable debug messages in console
})

export { handler as GET, handler as POST }
