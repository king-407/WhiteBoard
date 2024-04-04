import React, { useEffect, useState } from "react";
import Forms from "./components/Form";
import io from "socket.io-client";

import { Routes, Route } from "react-router-dom";
import RoomPage from "./pages/RoomPage/RoomPage";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 1000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);
const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("confirm", (data) => {
      if (data.success) {
        setUsers(data.users.length);
      } else {
        console.log("not connected");
      }
    });
    socket.on("allusers", (data) => {
      console.log("data of all users " + data.users.length);
      setUsers(data.users.length);
    });
  }, []);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/:roomId"
          element={<RoomPage user={user} socket={socket} users={users} />}
        />
      </Routes>
    </div>
  );
};

export default App;
