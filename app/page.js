import RoomCard from "./components/RoomCard";
import Heading from "./components/Heading";
import getAllRooms from "./actions/getAllRooms";

export default async function Home() {
  const rooms = await getAllRooms();
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? 
      rooms.map((room) => (
        <RoomCard key={room.$id} room={room} />
      ))
      :
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold">No rooms found</h2>
      </div>
    }
    </>
  );
}
