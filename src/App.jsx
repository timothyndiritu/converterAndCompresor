import { useState } from "preact/hooks";

//libraries(packages)
import imageCompression from "browser-image-compression";

//components and style
import "./App.css";
import ImageDropZone from "./ImageDropZone";
import ImageDimensions from "./ImageDimensions";
import LottieComponent from "./LottieComponent";
import ConvertImageComponent from "./ImageConvereter";

//constants
import myConstants from "./constants";

//icons
import imageNavIcon from "./assets/image-nav-icon.svg";
import videoNavIcon from "./assets/video.svg";
import menuNavIcon from "./assets/menu.svg";
import clearNavIcon from "./assets/clear.svg";
import convertIcon from "./assets/convert.svg";
import compressIcon from "./assets/compress.svg";

//hover icons
import imageNavIconHover from "./assets/image-nav-icon-hover.svg";
import videoNavIconHover from "./assets/video-hover.svg";
import menuNavIconHover from "./assets/menu-hover.svg";
import clearNavIconHover from "./assets/clear-hover.svg";

function App() {
  const [convertedImageUrl, setConvertedImageUrl] = useState(null);
  const [startConversion, setStartConversion] = useState(false);
  const [format, setFormat] = useState('jpeg');
  const [isCompressing, setCompressing] = useState(false);
  const [rawImage, setRawImage] = useState(null);
  const [image, setImage] = useState(null);
  const [originalUploadedImage, setOriginalUploadedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isImageHovered, setImageHovered] = useState(false);
  const [isVideoHovered, setVideoHovered] = useState(false);
  const [isClearHovered, setClearHovered] = useState(false);
  const [isMenuHovered, setMenuHovered] = useState(true);
  const handleImageDrop = (imageDataUrl) => {
    setImage(imageDataUrl);
    setOriginalUploadedImage(imageDataUrl);
  };
  const handleDimensions = (dims) => {
    setDimensions(dims);
  };

  const handleRawImage = (rawImage) => {
    setRawImage(rawImage);
  };

  const compressImage = async (image) => {
    const options = {
      maxSizeMB: 0.1, // Maximum size of the compressed image in MB
      maxWidthOrHeight: 800, // Max width or height of the output image
      useWebWorker: true, // Use multi-threading for better performance
    };

    const compressedFile = await imageCompression(image, options);
    const compressedImageUrl = URL.createObjectURL(compressedFile);
    return compressedImageUrl;
  };

  const handleConvertedImage = (url) => {
    console.log("converted");
    setConvertedImageUrl(url);
    setImage(url);
    setCompressing(false);
    setStartConversion(false);
  };

  const handleSetFormat = (event) => {
    setFormat(event.target.value);
    console.log(event.target.value);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `downloaded_image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const styles = {
    window: {
      backgroundColor: myConstants.colors.colorPrimaryGray,
      height: "100vh",
      width: "100vw",
      color: myConstants.colors.colorPrimaryWhite,
      display: "flex",
      justifyContent: "space-between",
    },
    navigation: {
      width: "14vw",
      //border: "2px solid white",
      height: "100vh",
      display: "flex",
      marginLeft: myConstants.margin.marginHorizontal,
    },
    navBar: {
      backgroundColor: myConstants.colors.colorPrimaryBlack,
      borderRadius: myConstants.borderRadius.smallBorderRadius,
      //padding: myConstants.padding.primarySmallPadding,
      width: "5vw",
      marginTop: myConstants.margin.marginTopSmall,
      paddingTop: "10px",
      maxHeight: "37vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    imageEditArea: {
      width: "62vw",
      //border: "2px solid white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    dropImageArea: {
      border: "1px solid rgb(105 104 109)",
      height: "60%",
      width: "90%",
      marginTop: myConstants.margin.marginTopBig,
      borderRadius: myConstants.borderRadius.largeBorderRadius,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imagePreview: {
      marginTop: myConstants.margin.marginTopBig,
      borderRadius: myConstants.borderRadius.largeBorderRadius,
      height: "60%",
    },
    editOptions: {
      backgroundColor: myConstants.colors.colorPrimaryBlack,
      height: "17%",
      width: "40%",
      borderRadius: myConstants.borderRadius.largeBorderRadius,
      marginTop: myConstants.margin.marginTopSmall,
      padding: myConstants.padding.primarySmallPadding,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      //flexDirection: "column",
    },
    convertCompress: {
      border: "none",
      //padding: myConstants.padding.buttonPadding,
      width: "110px",
      height: "80px",
      backgroundColor: myConstants.colors.colorPrimaryGray,
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    zoomSection: {
      display: "flex",
      marginTop: myConstants.margin.marginTopSmall,
      justifyContent: "space-between",
      width: "25%",
    },
    zoomIcons: {
      backgroundColor: myConstants.colors.colorPrimaryBlack,
      color: myConstants.colors.colorPrimaryWhite,
      //padding: myConstants.padding.primarySmallPadding,
      padding: myConstants.padding.primarySmallPadding,
      borderRadius: myConstants.borderRadius.smallBorderRadius,
      marginBottom: "10px",
    },
    imageInformation: {
      width: "23vw",
      //border: "2px solid white",
      height: "100vh",
      marginRight: myConstants.margin.marginHorizontal,
      display: "flex",
      justifyContent: "end",
    },
    imageInfo: {
      backgroundColor: myConstants.colors.colorPrimaryBlack,
      height: "94vh",
      width: "100%",
      marginTop: myConstants.margin.marginTopSmall,
      borderRadius: myConstants.borderRadius.largeBorderRadius,
    },
    infoSection: {
      borderTop: `2px solid ${myConstants.colors.colorPrimaryGray}`,
      //height: "40%",
      padding: myConstants.padding.primarySmallPadding,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
  };

  return (
    <div style={styles.window}>
      <div style={styles.navigation}>
        <div style={styles.navBar}>
          <div>
            <img
              src={isMenuHovered ? menuNavIconHover : menuNavIcon}
              className="navIcons"
              onMouseEnter={() => setMenuHovered(true)}
              onMouseLeave={() => setMenuHovered(false)}
            />
          </div>
          <div>
            <img
              src={isVideoHovered ? videoNavIconHover : videoNavIcon}
              className="navIcons"
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
            />
          </div>
          <div>
            <img
              src={isImageHovered ? imageNavIconHover : imageNavIcon}
              className="navIcons"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            />
          </div>
          <div>
            <img
              src={isClearHovered ? clearNavIconHover : clearNavIcon}
              className="navIcons"
              onMouseEnter={() => setClearHovered(true)}
              onMouseLeave={() => setClearHovered(false)}
            />
          </div>
        </div>
      </div>
      <div style={styles.imageEditArea}>
        {!image ? (
          <ImageDropZone
            styles={styles}
            onImageDrop={handleImageDrop}
            onRawImageSet={handleRawImage}
          />
        ) : (
          <div style={styles.imagePreview}>
            {/* Additional conditional check */}
            {isCompressing ? (
              <div style={{ height: "100%" }}>
                <LottieComponent />
              </div>
            ) : (
              <>
                <img src={image} alt="Uploaded" style={{ height: "100%" }} />
                <ImageDimensions
                  imageUrl={image}
                  onDimensions={handleDimensions}
                />
              </>
            )}
          </div>
        )}

        {startConversion && (
          <div style={{ display: "none" }}>
            <ConvertImageComponent
              inputImage={originalUploadedImage}
              outputFormat={format}
              onConvertFunction={handleConvertedImage}
            />
          </div>
        )}
        <div style={styles.editOptions}>
          <button
            style={styles.convertCompress}
            onClick={() => {
              if (!originalUploadedImage) return;
              if (!format) return;
              setCompressing(true);
              setStartConversion(true);
            }}
          >
            Convert
            <img src={convertIcon} alt="nwucni" style={{ height: 30 }} />
          </button>
          <button
            style={styles.convertCompress}
            onClick={async () => {
              if (!rawImage) return;
              console.log("raw image ready");
              setCompressing(true);
              try {
                const compressedImageUrl = await compressImage(rawImage);
                console.log("compressed image exist");
                setCompressing(false);
                setImage(compressedImageUrl);
                console.log("done");
              } catch (error) {
                console.error("Error compressing image:", error);
              }
            }}
          >
            Compress
            <img src={compressIcon} alt="nwucni" style={{ height: 30 }} />
          </button>
        </div>
        <div style={styles.zoomSection}>
          <button
            style={styles.zoomIcons}
            onClick={() => {
              downloadImage();
            }}
          >
            Download
          </button>
        </div>
      </div>

      <div style={styles.imageInformation}>
        <div style={styles.imageInfo}>
          <div
            style={{
              marginTop: myConstants.margin.marginTopSmall,
              marginBottom: "5px",
              //borderBottom: `2px solid ${myConstants.colors.colorPrimaryGray}`,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              // fontSize: myConstants.fonts.fontSizes.small,
            }}
          >
            <div className="titles">Image information</div>
            {/* <div style={{ color: myConstants.colors.colorSecondaryGray }}>
              Animation
            </div> */}
          </div>
          <div style={styles.infoSection}>
            <div className="titles">Layout</div>
            <div className="subTexts">Position</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="subTexts">Size</div>
              <div className="inputValues">{dimensions.width} w</div>
              <div className="inputValues">{dimensions.height} h</div>
            </div>
            <div className="subTexts">Rotate</div>
          </div>
          <div style={styles.infoSection}>
            <div className="titles">Compression Information</div>
            <div className="subTexts">original Size</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="subTexts">Size</div>
              <div>{dimensions.width} w</div>
              <div>{dimensions.height} h</div>
            </div>
            <div className="subTexts">New Size Size</div>
            <div className="subTexts">Rotate</div>
          </div>
          <div style={styles.infoSection}>
            <div className="titles">Convert Options</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <div className="subTexts">Format</div>
              <div>
                <select id="choices" value={format} onChange={handleSetFormat}>
                  <option value="" disabled>
                    Select an output
                  </option>
                  <option value="jpeg">Jpeg</option>
                  <option value="png">PNG</option>
                  <option value="webp">Webp</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
