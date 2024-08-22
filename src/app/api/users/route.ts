import dbConnect from '@/database/mongo';
import userModel from '@/models/users/userModel';
import {NextResponse} from "next/server";

export async function POST (request:Request) {
    await dbConnect();
    const data = await request.json();
    try {
        const user = await userModel.findOne({ email: data.email });
        if(user){
            return NextResponse.json({ message: 'User email already exists' });
        }
        const newUser = new userModel(data);
        await newUser.save();
        return NextResponse.json(newUser, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error });
    }
}

export async function GET(request: Request) {
    await dbConnect();
    const users = await userModel.find();
    return NextResponse.json(users);
}


