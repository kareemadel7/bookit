"use server";
import { createAdminClient } from "../../config/appwrite";
import { cookies } from "next/headers";

async function createSession(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const {account} = await createAdminClient();

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("appwrite-session", session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        return { success: true };
    } catch (error) {
        console.log("login error", error);
        return { error: "Invalid email or password" };
    }
}

export default createSession;