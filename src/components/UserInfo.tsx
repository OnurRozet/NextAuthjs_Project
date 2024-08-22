'use client'
import React from 'react'
import {signOut, useSession} from "next-auth/react";
import {Button} from "antd";
import {useRouter} from "next/navigation";

const UserInfo = () => {
    const router = useRouter();
    const {data:session} = useSession();
    console.log(session);

    const handleSignOut = async() =>{
        await signOut({
            redirect: false,
            callbackUrl: '/'
        });
        router.push('/');
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-10">
            <h1 className="text-2xl font-bold mb-5">Welcome {session?.user?.name}</h1>
            <div className="text-xl">
                Name : <span>{session?.user?.name}</span>
            </div>
            <div className={"text-xl"}>
                email : <span>{session?.user?.email}</span>
            </div>
            <Button type={"primary"} onClick={handleSignOut}>Sign Out</Button>
        </main>
    )
}
export default UserInfo
