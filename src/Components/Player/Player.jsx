import React, { useEffect, useState } from "react";

const Player = ({ video, loadedData, isPlaying, playPause }) => {
  const [progress, setProgress] = useState(0);
  const videoRef = React.createRef();

  useEffect(() => {
    handlePlayPause();
  }, [isPlaying]);

  const passMetaData = () => {
    loadedData(videoRef.current);
  };

  const handlePlayPause = () => {
    console.log(isPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    playPause;
  };

  const handleProgress = (e) => {
    console.log((e.target.currentTime / e.target.duration) * 100);
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
        <div className="c-video">
          <video
            ref={videoRef}
            className="video"
            onProgress={handleProgress}
            crossorigin="anonymous"
            src={video}
            onLoadedMetadata={passMetaData}
          ></video>
          <div className="controls">
            <div className="red-bar">
              <div style={{ width: "1%" }} className="red"></div>
            </div>
            <div className="buttons">
              <button
                className={isPlaying ? "play" : "pause"}
                id="play-pause"
                onClick={handlePlayPause}
              ></button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Player;
