import React from "react";
import Skeleton from "react-loading-skeleton";
import ImageSkeleton from "../ImageSkeleton/ImageSkeleton";

const Navigator = ({ isLoading, thumbNails }) => {
  return (
    <>
      <aside>
        <div className="thumbnails">
          {isLoading ? (
            <ImageSkeleton cards={8} />
          ) : (
            // <p>Loading</p>
            thumbNails.map((imgURL, id) => (
              <a href="#">
                <img
                  src={imgURL}
                  alt={`sample_video_thumbnail_${id}`}
                  key={id}
                />
              </a>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default Navigator;
