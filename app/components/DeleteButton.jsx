'use client';

import { toast } from "react-toastify";
import deleteRoom from "../actions/deleteRoom";
import Link from "next/link";

const DeleteButton = ({ roomId }) => {

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this room?");
        if (!confirm) return;
        const response = await deleteRoom(roomId);
        if (response.success) {
            toast.success("Room deleted successfully");
        } else {
            toast.error(response.error);
        }
    }
    return (
        <button
            onClick={() => handleDelete(roomId)}
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-green-700"
        >Delete Room</button>
    )
}

export default DeleteButton;    