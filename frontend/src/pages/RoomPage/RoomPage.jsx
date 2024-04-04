import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import WhiteBoard from "../../components/WhiteBoard";
const RoomPage = ({ user, socket, users }) => {
  console.log(user);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prev) => [...prev, elements[elements.length - 1]]);
    setElements((prev) => prev.slice(0, prev.length - 1));
  };

  const redo = () => {
    setElements((prev) => [...prev, history[history.length - 1]]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <div className="row">
      <h1 className="text-center py-5">
        Welcome <span className="text-primary">Users Online : {users} </span>
      </h1>

      {user?.presenter && (
        <div className="d-flex align-items-center justify-content-center col-md-8 mt-1 mb-5 gap-5">
          <div className="d-flex col-md-2 justify-content-between gap-2">
            <div className="d-flex">
              <label htmlFor="Pencil">Pencil</label>
              <input
                type="radio"
                name="tool"
                id="pencil"
                value="pencil"
                checked={tool === "pencil"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>

            <div className="d-flex">
              <label htmlFor="Rectangle">Rect</label>
              <input
                type="radio"
                name="tool"
                id="rect"
                value="rect"
                checked={tool === "rect"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>

            <div className="d-flex">
              <label htmlFor="Line">Line</label>
              <input
                type="radio"
                name="tool"
                id="line"
                value="line"
                checked={tool === "line"}
                onChange={(e) => setTool(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex  align-items-center">
              <label htmlFor="color">Select color :</label>
              <input
                type="color"
                name="color"
                className=""
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary mx-2"
              disabled={elements.length == 0}
              onClick={undo}
            >
              Undo
            </button>
            <button
              className="btn btn-outline-primary mt-1"
              disabled={history.length < 1}
              onClick={redo}
            >
              Redo
            </button>
          </div>

          <div className="col-md-3">
            <div className="btn btn-danger" onClick={handleClear}>
              Clear Canvas
            </div>
          </div>
        </div>
      )}

      <div className="col-md-10 border canvas-box mb-4">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
