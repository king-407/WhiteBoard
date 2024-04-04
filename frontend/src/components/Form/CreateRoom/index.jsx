import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateRoom = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState(null);

  const navigate = useNavigate();
  const handleRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
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
          value={name}
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            defaultValue={roomId}
            className="form-control my-2 border-0"
            placeholder="generate room code"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-sm me-1"
              type="button"
              onClick={() => {
                setRoomId(uuid());
              }}
            >
              generate
            </button>
            <button className="btn btn-danger btn-sm me-1" type="button">
              copy
            </button>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary btn-block form-control mt-5"
        onClick={handleRoom}
      >
        Generate Room
      </button>
    </form>
  );
};
export default CreateRoom;
