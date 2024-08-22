"use client";
import React, { useState } from 'react';
import Input from "@/components/common/Input";
import { Button } from "antd";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

const Register = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const router = useRouter();
    const {data:session} = useSession();
    if(session){
        router.replace("/dashboard");
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            const result = await response.json();
            if(result.message){
                toast.error(result.message);
            }else{
                if(response.ok){
                    router.push("/");
                    toast.success("User registered successfully");
                }
            }

        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex justify-center items-center">
            <div className="border rounded-lg p-10 shadow-2xl bg-white flex flex-col gap-6 max-w-md w-full">
                <h1 className="text-4xl font-sans text-center mb-6">Register Page</h1>
                    <div className="flex flex-col gap-10">
                        <Input
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Surname"
                            type="text"
                            name="surname"
                            value={formValues.surname}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />
                        <Button type="primary" onClick={handleSubmit} htmlType={"submit"}>
                            Register
                        </Button>
                        <span>
                            <Link href={"/"} className="hover:cursor-pointer hover:text-blue-400">
                                Do you have an account?
                            </Link>
                        </span>
                    </div>
            </div>
        </div>
    );
};

export default Register;