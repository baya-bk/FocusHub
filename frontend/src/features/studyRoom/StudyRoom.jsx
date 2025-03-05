import RoomList from "./RoomList";

const StudyRoom = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Available Study Rooms</h1>
      <RoomList />
    </div>
  );
};

export default StudyRoom;
