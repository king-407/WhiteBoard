import "./index.css";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
const Forms = ({ uuid, socket, setUser }) => {
  return (
    <div className="row h-100 pt-5">
      <div className="col-md-4 mx-auto form-box py-3 px-5 border border-2 mt-5 d-flex flex-column align-items-center">
        <h1 className="text-primary fw-bold">Create Room</h1>
        <CreateRoom uuid={uuid} socket={socket} setUser={setUser} />
      </div>
      <div className="col-md-4 mx-auto form-box  py-3 px-5 border border-2 mt-5 d-flex flex-column align-items-center">
        <h1 className="text-primary fw-bold">Join Room</h1>
        <JoinRoom uuid={uuid} socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};

export default Forms;
