import React from "react";
import ConvertImage from "react-convert-image";

const ConvertImageComponent = ({
  inputImage,
  outputFormat,
  onConvertFunction,
}) => {
  console.log("try");
  return (
    <ConvertImage
      image={inputImage}
      onConversion={onConvertFunction}
      format={outputFormat}
    />
  );
};

export default ConvertImageComponent;
