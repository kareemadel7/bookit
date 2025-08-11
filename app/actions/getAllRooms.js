"use server"

import { createAdminClient } from "../../config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function getAllRooms() {
    try {
        const { databases } = await createAdminClient();
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
        );
        
        return rooms;
    } catch (error) {
        console.error(error);
        redirect("/error?message=Failed to fetch rooms");
    }
}