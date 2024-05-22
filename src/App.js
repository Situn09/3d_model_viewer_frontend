import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import ModelViewer from "./components/ModelViewer";
import UploadDashboard from "./components/UploadDashboard";
import leftArrow from "./asessts/images/Left Arrow.svg";
import rightArrow from "./asessts/images/Right Arrow.svg";
import loadingGif from "./asessts/images/load-37.gif";
import "./App.css";

const App = () => {
  const [models, setModels] = useState([]);
  let [index, setIndex] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/models")
      .then((response) => setModels(response.data))
      .catch((error) => console.error(error.message));
  }, []);

  const length = models.length;
  const shiftRight = () => {
    if (index + 1 < length) {
      setIndex((prev) => ++prev);
    } else {
      setIndex(0);
    }
  };
  const shiftLeft = () => {
    if (index === 0) {
      setIndex(length - 1);
    } else {
      setIndex((prev) => --prev);
    }
  };
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* <div className="overlay"></div> */}
      <div className="backgroundCircleL"></div>
      <div className="backgroundCircleM"></div>
      <div className="backgroundCircleR"></div>
      <div style={{ position: "relative", zIndex: "2" }}>
        <h1 style={{ textAlign: "center", marginTop: "0", paddingTop: "20px" }}>
          3D Model Viewer
        </h1>
        <UploadDashboard setModels={setModels} />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div onClick={() => shiftLeft()}>
            <img src={leftArrow} alt="left_arrow" />
          </div>
          <Suspense
            fallback={
              <div
                style={{
                  width: "70vw",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "100px" }}>
                  <img
                    style={{ width: "100%" }}
                    src={loadingGif}
                    alt="loading"
                  />
                </div>
              </div>
            }
          >
            {models[index]?.url ? (
              <div>
                <div style={{ width: "70vw" }}>
                  <ModelViewer url={models[index].url} />
                </div>
                <h3
                  style={{ textAlign: "center", textTransform: "capitalize" }}
                >
                  {models[index].name}
                </h3>
              </div>
            ) : (
              ""
            )}
          </Suspense>
          <div onClick={() => shiftRight()}>
            <img src={rightArrow} alt="right_arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
