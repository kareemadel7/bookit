'use server';

import { createAdminClient } from "../../config/appwrite";
import { ID } from "node-appwrite";

const createUser = async (prevState, formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (!name || !email || !password || !confirmPassword) {
        return { error: "Please fill all the fields" };
    }
    if (password.length < 8) {
        return { error: "Password must be at least 8 characters long" };
    }
    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const {account} = await createAdminClient();
        const user = await account.create(ID.unique(), email, password, name);
        return { success: true };
    } catch (error) {
        console.log("create user error", error);
        return { error: "Failed to create user" };
    }
}
export default createUser;