"use server"

import { createAdminClient } from "../../config/appwrite";
import { redirect } from "next/navigation";

export async function getSingleRoom(id) {
    try {
        const { databases } = await createAdminClient();
        const room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            id
        );
        return room;
    } catch (error) {
        console.error(error);
        redirect("/error?message=Failed to fetch room");
    }
}

