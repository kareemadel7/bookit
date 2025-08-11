'use server';

import { createSessionClient } from '../../config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { revalidatePath } from 'next/cache';

async function cancelBooking(bookingId) {
  const sessionCookie = cookies().get('appwrite-session');
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
    const userId = user.$id;

    // Fetch users bookings
    const booking = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    revalidatePath('/bookings');

    return {success: 'Booking cancelled successfully'};
  } catch (error) {
    console.log('Failed to cancel booking', error);
    return {error: 'Failed to cancel booking'};
  }
}

export default cancelBooking;