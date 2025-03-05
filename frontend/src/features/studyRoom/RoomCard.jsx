import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoomCard = ({ room }) => {
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{room.description}</p>
        <Button className="mt-4 w-full">Join Room</Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
