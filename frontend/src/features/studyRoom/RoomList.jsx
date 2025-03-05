import RoomCard from "./RoomCard";

const rooms = [
  {
    id: 1,
    name: "Frontend Masters",
    description: "Discuss React, Tailwind, and more!",
  },
  {
    id: 2,
    name: "Backend Wizards",
    description: "Dive into Node.js, Express, and databases.",
  },
  {
    id: 3,
    name: "AI Enthusiasts",
    description: "Explore machine learning and AI topics.",
  },
];

const RoomList = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
