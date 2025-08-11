import Heading from "../../components/Heading";
import getMyRooms from "../../actions/getMyRooms";
import RoomCard from "../../components/RoomCard";

const MyRoomsPage = async () => {
    const rooms = await getMyRooms();
    return (
        <>
            <Heading title="My Rooms" />
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <RoomCard key={room.$id} room={room} from="myRooms" />
                ))
            ) : (
                <div className="mt-4">
                    <p className="text-gray-500">You have no rooms yet.</p>
                </div>
            )}
        </>
    )
}

export default MyRoomsPage;