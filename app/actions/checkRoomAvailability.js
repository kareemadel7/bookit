'use server';

import { createSessionClient } from '../../config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

async function checkRoomAvailability(roomId, checkIn, checkOut) {
    // Convert dates to UTC for comparison
    const checkInDateTime = DateTime.fromISO(checkIn, { zone: 'utc' }).toUTC();
    const checkOutDateTime = DateTime.fromISO(checkOut, { zone: 'utc' }).toUTC();

  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(
      sessionCookie.value
    );

    const { documents: bookings } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        [Query.equal('room_id', roomId)]
      );

      for (const booking of bookings) {
        const bookingCheckIn = DateTime.fromISO(booking.check_in, { zone: 'utc' }).toUTC();
        const bookingCheckOut = DateTime.fromISO(booking.check_out, { zone: 'utc' }).toUTC();
        
        // Check for overlapping date ranges
        if (checkInDateTime < bookingCheckOut && checkOutDateTime > bookingCheckIn) {
          return false;
        }
      }

    return true;

   
  } catch (error) {
    console.log('Failed to check room availability', error);
    return false;
  }
}

export default checkRoomAvailability;