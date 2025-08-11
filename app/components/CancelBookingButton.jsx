'use client';

import { toast } from "react-toastify";
import cancelBooking from "../actions/cancelBooking";

const CancelBookingButton = ({bookingId}) => {
    const handleCancelBooking = async () => {
        const response = await cancelBooking(bookingId);
        if(response.success){
            toast.success(response.success);
        } else {    
            toast.error(response.error);
        }
    };
    return (
        <button
                onClick={handleCancelBooking}
                className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
            >
                Cancel Booking
            </button>
    );
};

export default CancelBookingButton;