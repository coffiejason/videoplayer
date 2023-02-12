import React from "react";
import Skeleton from "react-loading-skeleton";
import ImageSkeleton from "../ImageSkeleton/ImageSkeleton";

const Navigator = ({ isLoading, thumbNails, setMoveTo }) => {
  const handleClick = (e) => {
    console.log(e.currentTarget.id);
    setMoveTo(e.currentTarget.id);
  };

  return (
    <>
      <aside>
        <div className="thumbnails">
          {isLoading ? (
            <ImageSkeleton cards={8} />
          ) : (
            // <p>Loading</p>
            thumbNails.map((imgURL, id) => (
              <div className="a" onClick={handleClick} key={id} id={id}>
                <img
                  src={imgURL}
                  alt={`sample_video_thumbnail_${id}`}
                  key={id}
                />
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default Navigator;
