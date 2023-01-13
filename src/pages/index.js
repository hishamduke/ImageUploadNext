import React, { useState } from "react";
import EasyCrop from "./EasyCrop";
import axios from "axios";
import { imgURL } from "./Crop";

function App() {
  const [image, setImage] = useState(null);
  const [cropped, setCropped] = useState(null);
  const [data, setData] = useState({ name: "", image: null });
  // console.log(imgURL);
  const handleImageUpload = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, image: null });
  };
  if (typeof window == undefined) return <></>;

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      // console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          fileName: file.title,
          base64: reader.result,
        });
      reader.onerror = reject;
    });

  const handleUploadData = async () => {
    const img64 = await convertFileToBase64(imgURL);
    console.log(img64);
    setData({ ...data, image: img64 });
    axios.post("/api/post", { name: data.name, image: img64 });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="_coverImage-holder">
          <label>name </label>
          <input onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>
        <label className="_coverImage-holder">
          Choose image
          <input
            type="file"
            name="cover"
            onChange={handleImageUpload}
            accept="img/*"
            style={{ display: "none" }}
          />
        </label>
        {image && !cropped && (
          <EasyCrop image={image} setCropped={setCropped} />
        )}
        {cropped && (
          <>
            <img src={cropped} className="choosedImage" />
          </>
        )}
        {data.name && cropped ? (
          <>
            <div
              className="_coverImage-holder"
              onClick={() => {
                console.log("hi");
                handleUploadData();
              }}
            >
              upload
            </div>
          </>
        ) : (
          <>
            <p style={{ color: "black" }}>
              Please choose an image and set name to upload
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
