"use server";
import { createSessionClient } from "../../config/appwrite";
import { cookies } from "next/headers";

const deleteSession = async () => {
    
    const session = cookies().get("appwrite-session");
    const {account} = await createSessionClient(session.value);

    if (!session) {
        return { error: "No session found" };
    }

    try {
        await account.deleteSession("current");
        cookies().delete("appwrite-session");
        return { success: true };
    } catch (error) {
        console.log("delete session error", error);
        return { error: "Failed to delete session" };
    }
}

export default deleteSession;