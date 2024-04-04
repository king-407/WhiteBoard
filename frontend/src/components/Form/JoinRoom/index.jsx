import { useState } from "react";
import { useNavigate } from "react-router-dom";
const JoinRoom = ({ uuid, socket, setUser }) => {
  const [name, setName] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const navigate = useNavigate();
  const handleJoin = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    socket.emit("joined", roomData);
    navigate(`/${roomId}`);
  };
  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control my-2 border-0"
            value={roomId}
            placeholder="generate room code"
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn btn-primary btn-block form-control mt-5"
        onClick={handleJoin}
      >
        Join Room
      </button>
    </form>
  );
};
export default JoinRoom;
