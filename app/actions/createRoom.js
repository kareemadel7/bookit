"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "../../config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";

const createRoom = async (prevState, formData) => {
    const {databases,storage} = await createAdminClient();
    
    try {
        const {user} = await checkAuth();
        console.log("user",user);
        if (!user) {
            return { error: "Unauthorized" };
        }
        let image = formData.get('image');
        let imageId;
        if (image) {
            try {
                const response = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
                    ID.unique(),
                    image
                );
                imageId = response.$id;
                //console.log("response", response);
            } catch (error) {
                console.log("upload file error", error);
                return { error: "Failed to upload image" };
            }
        } else {
            return { error: "Image is required" };
        }

        const room = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            ID.unique(),
            {
                user_id: user.$id,
                name: formData.get('name'),
                description: formData.get('description'),
                sqft: formData.get('sqft'),
                capacity: formData.get('capacity'),
                location: formData.get('location'),
                address: formData.get('address'),
                availability: formData.get('availability'),
                price_per_hour: formData.get('price_per_hour'),
                amenities: formData.get('amenities'),
                image: imageId
            }
        )
        revalidatePath("/","layout");
        return { success: true };
    } catch (error) {
        console.log("create room error", error);
        return { error: "Failed to create room" };
    }
}
export default createRoom;