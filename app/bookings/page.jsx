import getMyBookings from "../actions/getMyBookings";
import Heading from "../components/Heading";
import BookingCard from "../components/BookingCard";

const BookingsPage = async () => {
    const bookings = await getMyBookings();
    console.log("bookings",bookings);
    return (
        <>
        <Heading title="Bookings" />
        {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">No bookings found</h1>
            </div>
        ) : (
            <div>
                <div className="">
                    {bookings.map((booking) => (
                        <BookingCard key={booking.$id} booking={booking} />
                    ))}
                </div>
            </div>
        )}
        </>
    );
}

export default BookingsPage;