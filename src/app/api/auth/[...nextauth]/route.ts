import userModel from "@/models/users/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/database/mongo";
import NextAuth, {NextAuthOptions, SessionStrategy} from "next-auth";

const authOptions : NextAuthOptions= {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials,req) {
                if (!credentials) {
                    throw new Error("Credentials are missing");
                }
                await dbConnect();
                const email = credentials.email;
                const password = credentials.password;
                const user = await userModel.findOne({ email: email });

                if(!user){
                    return null;
                }

                const isPasswordValid = user.password === password;

                if (!isPasswordValid) {
                    return null;
                }

                if(user){
                    return user;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    pages: {
        signIn: '/login',
        error: '/auth/error'
    },
    secret:process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };