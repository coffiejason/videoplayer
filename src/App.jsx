import { useEffect, useState } from "react";
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
import demoVideo from "./assets/aautv_05.mp4";
import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FF = createFFmpeg({ log: false }); // add url to ffmpeg

const liveVideo = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`;

const liveVideo2 = `https://firebasestorage.googleapis.com/v0/b/maverick-media-kit.appspot.com/o/output2.mp4?alt=media&token=d797eb93-fa2f-4ae2-9697-ba1445c5e2a9`;

function App() {
  const [videoMeta, setVideoMeta] = useState(null);
  const [trimIsProcessing, setTrimIsProcessing] = useState(false);

  const [rStart, setRstart] = useState(0);
  const [rEnd, setRend] = useState(10);
  const [thumbNails, setThumbNails] = useState([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [moveTo, setMoveTo] = useState(null);

  //load video
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(demoVideo);
      const blob = await response.blob();
      const videoBlobUrl = URL.createObjectURL(blob);
      setVideoBlobUrl(videoBlobUrl);
    })();
  }, [demoVideo]);

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
    let MAX_NUMBER_OF_IMAGES = 55;
    let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 55;
    let offset =
      duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

    const arrayOfImageURIs = [];
    FF.FS("writeFile", "starbucks.mp4", await fetchFile(videoBlobUrl));

    for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
      let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));

      try {
        await FF.run(
          "-ss",
          startTimeInSecs,
          "-i",
          "starbucks.mp4", //inputVideoFile.name,
          "-t",
          "00:01:00",
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

    try {
      FF.FS("writeFile", "starbucks.mp4", await fetchFile(videoBlobUrl));
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
      // const dataURL = await helpers.readFileAsBase64(
      //   new Blob([data.buffer], { type: "video/mp4" })
      // );

      saveFile(data);

      //setTrimmedVideoFile(dataURL);
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  const saveFile = async (data) => {
    helpers.download(
      await helpers.readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      )
    );
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
            video={videoBlobUrl}
            loadedData={handleLoadedData}
            isPlaying={isPlaying}
            playPause={playPause}
            rangeUpdateStart={setRstart}
            rangeUpdateEnd={setRend}
            moveTo={moveTo}
            setMoveTo={setMoveTo}
          />
          <Options />
          <Navigator
            isLoading={thumbNails.length === 0 ? true : false}
            thumbNails={thumbNails}
            setMoveTo={setMoveTo}
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
