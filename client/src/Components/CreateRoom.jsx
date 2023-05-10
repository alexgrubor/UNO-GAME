import { useContext } from "react";
import { socket } from "../socket";
import { MyContext } from "../context/context";

const CreateRoom = () => {
    const { user } = useContext(MyContext);
    const createRoom = (e) => {
        e.preventDefault();
        socket.emit("create_room", {
            roomName: e.target.room.value,
            password: e.target.password.value,
            userId: user._id,
        });
    };

    return (
        <form onSubmit={createRoom}>
            <input type="text" name="room" placeholder="Room name" />
            <input type="password" name="password" placeholder="password" />
            <button>Create a Room</button>
        </form>
    );
};

export default CreateRoom;
