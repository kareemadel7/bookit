"use server";
import { createSessionClient } from "../../config/appwrite";
import { cookies } from "next/headers";

const checkAuth = async () => {
    const session = cookies().get("appwrite-session");
    if (!session) {
        return { isAuthenticated: false };
    }
    try {
        const {account} = await createSessionClient(session.value);
        const user = await account.get();
        return { isAuthenticated: true, user };
    } catch (error) {
        return { isAuthenticated: false };
    }
}   

export default checkAuth;