import { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import {
  Header,
  Modal,
  Navigator,
  Options,
  Player,
  RangeInput,
} from "./Components";
import * as helpers from "./utils/helpers";
// import demoVideo2 from "./assets/3000kbs_starbucks.mp4";
import demoVideo from "./assets/output2.mp4";
import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FF = createFFmpeg({ log: true }); // add url to ffmpeg

const liveVideo2 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

const liveVideo =
  "https://g.mandela.h.sabishare.com/dl/zJhqauDAd04/fb06ad96c78bd2d4f7672a78e03dc599a23c946cf9f5af228cf717e8e78e1470/BMF_S02E02_-_Family_Business_(NetNaija.com).mkv";

function App() {
  const [videoMeta, setVideoMeta] = useState(null);
  const [trimIsProcessing, setTrimIsProcessing] = useState(false);

  const [rStart, setRstart] = useState(0);
  const [rEnd, setRend] = useState(10);
  const [thumbNails, setThumbNails] = useState([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isShow, setIsShow] = useState(false);

  const onClose = () => {
    setIsShow(false);
  };

  const handleLoadedData = async (el) => {
    // console.dir(ref.current);

    const meta = {
      name: "starbucks.mp4",
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight,
    };

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
    FF.FS("writeFile", "starbucks.mp4", await fetchFile(demoVideo));

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
    // console.log(
    //   startTime,
    //   offset,
    //   helpers.toTimeString(startTime),
    //   helpers.toTimeString(offset)
    // );

    try {
      FF.FS("writeFile", "starbucks.mp4", await fetchFile(demoVideo));
      // await FF.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');
      await FF.run(
        "-ss",
        helpers.toTimeString(startTime),
        "-i",
        "starbucks.mp4",
        "-t",
        helpers.toTimeString(offset),
        "-c",
        "copy",
        "ping.mp4"
      );

      const data = FF.FS("readFile", "ping.mp4");
      const dataURL = await helpers.readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      );

      saveFile(data);

      //setTrimmedVideoFile(dataURL);
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  const saveFile = async (data) => {
    const a = document.createElement("a");
    a.download = "output.mp4";

    a.href = await helpers.readFileAsBase64(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  const makeEntry = () => {
    setIsShow(true);
  };

  const handleUpdateRange = (func) => {
    return ({ target: { value } }) => {
      func(value);
    };
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case " ":
        playPause();
        return;

      case "s":
        makeEntry();
        return;

      case "S":
        makeEntry();
        return;

      // case "s":
      //   handleTrim();
      //   console.log("triming");
      //   return;

      default:
        return "foo";
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
      {isShow && <Modal onClose={onClose} handleTrim={handleTrim} />}
      <SkeletonTheme baseColor="#E3E0F3" highlightColor="#FAF8FF">
        <Header />
        <div id="main">
          <Player
            video={demoVideo}
            loadedData={handleLoadedData}
            isPlaying={isPlaying}
            playPause={playPause}
            rangeUpdateStart={setRstart}
            rangeUpdateEnd={setRend}
          />
          <Options />
          <Navigator
            isLoading={thumbNails.length === 0 ? true : false}
            thumbNails={thumbNails}
          />
        </div>
        <footer>
          <RangeInput
            rEnd={rEnd}
            rStart={rStart}
            handleUpdaterStart={handleUpdateRange(setRstart)}
            handleUpdaterEnd={handleUpdateRange(setRend)}
            loading={thumbnailIsProcessing}
            videoMeta={videoMeta}
            // control={
            //   <div className="u-center">
            //     <button
            //       onClick={handleTrim}
            //       className="btn btn_b"
            //       disabled={trimIsProcessing}
            //     >
            //       {trimIsProcessing ? "trimming..." : ""}
            //     </button>
            //   </div>
            // }
            thumbNails={thumbNails}
          />
        </footer>
      </SkeletonTheme>
    </div>
  );
}

export default App;
