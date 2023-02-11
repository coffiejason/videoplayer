import React, { useEffect, useState, useRef } from "react";

const Player = ({
  video,
  loadedData,
  isPlaying,
  playPause,
  rangeUpdateStart,
  rangeUpdateEnd,
  moveTo,
  setMoveTo,
}) => {
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    handlePlayPause();
  }, [isPlaying]);

  const passMetaData = () => {
    setVideoReady(true);
    loadedData(videoRef.current);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    playPause;
  };

  const forwaredReverse = (val) => {
    const speed = 0.005 * videoRef.current.duration;

    val === true
      ? (videoRef.current.currentTime += speed)
      : (videoRef.current.currentTime -= speed);
  };

  useEffect(() => {
    //console.log("moved ", videoRef.current.currentTime);
    const move = (parseInt(moveTo) / 55) * videoRef.current.duration;
    console.log(move, videoRef.current.duration);

    videoReady && (videoRef.current.currentTime = move);
  }, [moveTo]);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowRight":
        forwaredReverse(true);
        return;
      case "ArrowLeft":
        forwaredReverse(false);
        return;

      case "ArrowUp":
        const mit =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        rangeUpdateStart(mit);
        return;

      case "ArrowDown":
        const mot =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        rangeUpdateEnd(mot);
        return;

      default:
        return;
    }
  };

  const handleProgress = (e) => {
    if (isNaN(e.target.duration))
      // duration is NotaNumber at Beginning.
      return;
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };

  return (
    <>
      <article>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <div
          className="c-video"
          tabIndex={0}
          onKeyDown={(e) => handleKeyPress(e)}
        >
          <video
            ref={videoRef}
            className="video"
            //onProgress={handleProgress}
            onTimeUpdate={handleProgress}
            crossorigin="anonymous"
            src={video}
            onLoadedMetadata={passMetaData}
          ></video>
          <div className="controls">
            <div className="red-bar">
              <div style={{ width: progress + "%" }} className="red"></div>
            </div>
            <div className="buttons">
              <button
                className={isPlaying ? "play" : "pause"}
                id="play-pause"
                onClick={playPause}
              ></button>
            </div>
            {/* <p style={{ color: "white" }}>12</p> */}
          </div>
        </div>
      </article>
    </>
  );
};

export default Player;
