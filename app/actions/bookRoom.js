'use server';

import { createSessionClient } from '../../config/appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import checkRoomAvailability from './checkRoomAvailability';

async function bookRoom(prevState, formData) {
  const sessionCookie = await cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get user's ID
    const {user} = await checkAuth();
    if(!user){
        return {error: 'Unauthorized'};
    }

    const checkInDate = formData.get('check_in_date');
    const checkInTime = formData.get('check_in_time');
    const checkOutDate = formData.get('check_out_date');
    const checkOutTime = formData.get('check_out_time');
    // Add Egypt timezone offset (+2 or +3 depending on DST)
    const checkInDateTime = `${checkInDate}T${checkInTime}+03:00`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}+03:00`;
    const roomId = formData.get('room_id');
    const userId = user.$id;
    
    const bookingData = {
        check_in: checkInDateTime,
        check_out: checkOutDateTime,
        room_id: roomId,
        user_id: userId,
    }
    const isAvailable = await checkRoomAvailability(roomId, checkInDateTime, checkOutDateTime);
    if(!isAvailable){
        return {error: 'Room is not available at this time'};
    }
    const newBooking = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        ID.unique(),
        bookingData
    )
    return {success: 'Booking created successfully'};
    
    
  } catch (error) {
    console.log('Failed to book room', error);
    return {error: 'Failed to book room'};
  }
}

export default bookRoom;