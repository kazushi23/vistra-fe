'use client'

import Button from "@/components/base/button";
import { LoginResponse } from "@/lib/types/auth.types";
import { useState } from "react"
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/base/toast";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const {showToast} = useToast();

    async function handleLogin() {
        try {
            const res: LoginResponse = await login(email, password);
            localStorage.setItem("token", res.data);
            router.push("/")
        } catch(error: any) {
            showToast("Error", error.message || "Something went wrong, please try again.")
        }
    }

    return (
        <div className="min-h-screen p-8 flex flex-col gap-2 max-w-xl mx-auto">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"/>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"/>
            </div>
            <Button variant="primary" label="Login" onClick={handleLogin} />
        </div>
    )
}