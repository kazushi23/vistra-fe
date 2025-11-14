import { LoginResponse } from "../types/auth.types";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // base backend url from env variables


export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to login")
    }

    const data: LoginResponse = await res.json();
    return data
}