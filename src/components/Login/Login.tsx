"use client"
import React, { useState } from 'react';
import Input from "@/components/common/Input";
import { Button } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify";

const Login = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await signIn("credentials", {
            redirect: false,
            email: formValues.email,
            password: formValues.password,
        });
        console.log("response", response);
        if(response?.error){
            toast.error(response.error);
        }
        if (response?.ok) {
            router.replace("/dashboard");
            toast.success("Login successful");
        }else{
            console.error("Login failed:", response?.error);
        }

    };

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex justify-center items-center">
            <div className="border rounded-lg p-10 shadow-2xl bg-white flex flex-col gap-6 max-w-md w-full">
                <h1 className="text-4xl font-sans text-center mb-6">Login Page</h1>
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-10">
                        <Input
                            placeholder={"Email"}
                            type={"email"}
                            name={"email"}
                            value={formValues.email}
                            onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                        />
                        <Input
                            placeholder={"Password"}
                            type={"password"}
                            name={"password"}
                            value={formValues.password}
                            onChange={(e) => setFormValues({...formValues, password: e.target.value})}
                        />
                        <Button type="primary" htmlType={"submit"} >
                            Login
                        </Button>
                        <span>
                        <Link href="/register" className="hover:cursor-pointer hover:text-blue-400">
                            Don&apos;t have an account yet?
                        </Link>
                    </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;