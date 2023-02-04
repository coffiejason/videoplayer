import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Footer, Header, Navigator, Player, RangeInput } from "./Components";
import * as helpers from "./utils/helpers";
import reactLogo from "./assets/react.svg";
import demoVideo from "./assets/3000kbs_starbucks.mp4";
import "./App.css";

const FF = createFFmpeg({ log: true });

const liveVideo =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

function App() {
  const [inputVideoFile, setInputVideoFile] = useState(null);
  const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
  // const ref = useRef();
  const [videoMeta, setVideoMeta] = useState(null);
  const [URL, setURL] = useState([]);
  const [trimIsProcessing, setTrimIsProcessing] = useState(false);

  const [rStart, setRstart] = useState(0);
  const [rEnd, setRend] = useState(10);
  const [thumbNails, setThumbNails] = useState([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChange = async (e) => {
    let file = e.target.files[0];
    console.log(file);
    setInputVideoFile(file);

    setURL(await helpers.readFileAsBase64(file));
  };

  const handleLoadedData = async (el) => {
    // console.dir(ref.current);

    const meta = {
      name: "starbucks.mp4",
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight,
    };

    console.log("video metadata", { meta });
    setVideoMeta(meta);
    const thumbNails = await getThumbnails(meta);
    setThumbNails(thumbNails);
  };

  const getThumbnails = async ({ duration }) => {
    if (!FF.isLoaded()) await FF.load();
    setThumbnailIsProcessing(true);
    let MAX_NUMBER_OF_IMAGES = 15;
    let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
    let offset =
      duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

    const arrayOfImageURIs = [];
    FF.FS("writeFile", "starbucks.mp4", await fetchFile(liveVideo));

    for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
      let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));

      try {
        await FF.run(
          "-ss",
          startTimeInSecs,
          "-i",
          "starbucks.mp4", //inputVideoFile.name,
          "-t",
          "00:00:1.000",
          "-vf",
          `scale=150:-1`,
          `img${i}.png`
        );
        const data = FF.FS("readFile", `img${i}.png`);

        let blob = new Blob([data.buffer], { type: "image/png" });
        let dataURI = await helpers.readFileAsBase64(blob);
        FF.FS("unlink", `img${i}.png`);
        arrayOfImageURIs.push(dataURI);
      } catch (error) {
        console.log({ message: error });
      }
    }
    setThumbnailIsProcessing(false);

    return arrayOfImageURIs;
  };

  const handleTrim = async () => {
    setTrimIsProcessing(true);

    let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
    console.log(
      startTime,
      offset,
      helpers.toTimeString(startTime),
      helpers.toTimeString(offset)
    );

    try {
      FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
      // await FF.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');
      await FF.run(
        "-ss",
        helpers.toTimeString(startTime),
        "-i",
        inputVideoFile.name,
        "-t",
        helpers.toTimeString(offset),
        "-c",
        "copy",
        "ping.mp4"
      );

      const data = FF.FS("readFile", "ping.mp4");
      console.log(data);
      const dataURL = await helpers.readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      );

      setTrimmedVideoFile(dataURL);
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  const handleUpdateRange = (func) => {
    return ({ target: { value } }) => {
      func(value);
    };
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying);
  };

  const forward = (ref) => {
    ref + 5;
  };

  const backward = (ref) => {
    ref + 5;
  };

  const handleKeyPress = (e) => {
    console.log("User Pressed : ", e.key);

    switch (e.key) {
      case " ":
        console.log(" ");
        playPause();

      case "ArrowRight":
        console.log("ArrowRight");

      case "ArrowLeft":
        console.log("ArrowLeft");

      case "ArrowUp":
        console.log("ArrowUp");

      default:
        return "foo";
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
      <Header />
      <div id="main">
        <Player
          video={liveVideo}
          loadedData={handleLoadedData}
          isPlaying={isPlaying}
          playPause={playPause}
        />
        {/* <nav>nav</nav> */}
        <Navigator thumbNails={thumbNails} />
      </div>
      <footer>
        <RangeInput
          rEnd={rEnd}
          rStart={rStart}
          handleUpdaterStart={handleUpdateRange(setRstart)}
          handleUpdaterEnd={handleUpdateRange(setRend)}
          loading={thumbnailIsProcessing}
          videoMeta={videoMeta}
          control={
            <div className="u-center">
              <button
                onClick={handleTrim}
                className="btn btn_b"
                disabled={trimIsProcessing}
              >
                {trimIsProcessing ? "trimming..." : ""}
              </button>
            </div>
          }
          thumbNails={thumbNails}
        />
      </footer>
    </div>
  );
}

export default App;
