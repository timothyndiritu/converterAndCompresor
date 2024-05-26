import imageIcon from "./assets/image.svg";
import React, { useState, useRef } from "react";
import "./App.css";

function ImageDropZone({ styles, onImageDrop, onRawImageSet }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        onImageDrop(imageDataUrl);
        onRawImageSet(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        onImageDrop(imageDataUrl);
        onRawImageSet(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        ...styles.dropImageArea,
        border: isDragging ? "2px dashed #666" : "1px solid rgb(105 104 109)",
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={inputRef}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={imageIcon} style={{ height: 150 }} alt="Drop Image" />
        <p>Drag and drop your Image here or click to upload</p>
        <button
          onClick={() => inputRef.current.click()}
          className="uploadButton"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default ImageDropZone;
