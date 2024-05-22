import React, { useState } from "react";
import axios from "axios";
import loadingGif from "../asessts/images/load-37.gif";

const UploadDashboard = ({ setModels }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    console.log(name, file);
    try {
      await axios.post("http://localhost:5000/api/models", formData);

      axios
        .get("http://localhost:5000/api/models")
        .then((response) => setModels(response.data))
        .catch((error) => console.error(error));

      alert("Model uploaded successfully");
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to upload model");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "100px",
        gap: "9px",
      }}
    >
      <div>
        <label style={{ marginRight: "10px" }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginLeft: "105px" }}>
        <label style={{ marginRight: "10px" }}>File:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Upload</button>
      {uploading ? (
        <div
          style={{
            // width: "70vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100px" }}>
            <img style={{ width: "100%" }} src={loadingGif} alt="loading" />
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default UploadDashboard;
