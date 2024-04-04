import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const WhiteBoard = ({
  ctxRef,
  canvasRef,
  elements,
  setElements,
  tool,
  color,
  user,
  socket,
}) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    console.log(img);
    socket.on("response", (data) => {
      setImg(data.imgURL);
    });
  }, []);

  if (!user?.presenter) {
    return (
      <div className="h-100 w-100  border border border-dark border-3">
        <img
          src={img}
          alt="real time white board presented by user"
          className="color-black w-100 h-100"
        />
      </div>
    );
  }

  const roughGenerator = rough.generator();
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    console.log("socket is " + socket);
    if (canvasRef) {
      const roughCanvas = rough.canvas(canvasRef.current);

      if (elements.length > 0) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      // const ctx = ctxRef.current;
      // const roughCanvas = rough.canvas(ctx);

      elements.forEach((element) => {
        if (element.type == "pencil")
          roughCanvas.linearPath(element.path, {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0,
          });
        else if (element.type == "line")
          roughCanvas.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            }
          );
      });
      const canvasImage = canvasRef.current.toDataURL();
      console.log("canvasImage is " + canvasImage);
      socket.emit("whiteboardData", canvasImage);
    }
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (tool == "pencil") {
      setElements((prevElement) => [
        ...prevElement,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool == "line") {
      setElements((prevElement) => [
        ...prevElement,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    }
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      const { path } = elements[elements.length - 1];

      if (tool == "pencil") {
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElement) =>
          prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool == "line") {
        setElements((prevElement) =>
          prevElement.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };
  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };
  if (!user?.presenter) {
    return (
      <div className="h-100 w-100  border border border-dark border-3">
        <img
          src=""
          alt="real time white board presented by user"
          className="color-black w-100 h-100"
        />
      </div>
    );
  }
  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-60 w-100"
      >
        <canvas
          ref={canvasRef}
          className="h-100 w-100  border border border-dark border-3"
        ></canvas>
      </div>
    </>
  );
};

export default WhiteBoard;
