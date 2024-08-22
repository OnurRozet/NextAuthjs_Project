import dbConnect from "@/database/mongo";
import userModel from "@/models/users/userModel";
import {NextResponse} from "next/server";

export async function GET (request:Request,{params}:{params:{userId:string}}) {
    await dbConnect();
    debugger
    const {method} = request;
    const userId = params.userId;
    if(method == 'GET'){
        const user = await userModel.findById(userId);
        if(!user){
            return NextResponse.json({ message: 'User not found' });
        }
        return NextResponse.json(user);
    }
    // const {searchParams} = new URL(request.url);
    // const email =searchParams.get('email');
    // if(!email){
    //     return NextResponse.json({ message: 'Email is required' });
    // }
    // const user = await userModel.findOne({email:email});
    // if(!user){
    //     return NextResponse.json({ message: 'User not found' });
    // }
    // return NextResponse.json(user);
}