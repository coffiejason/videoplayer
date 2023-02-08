import React from "react";

const Navigator = ({ thumbNails }) => {
  return (
    <>
      <aside>
        <div className="thumbnails">
          {thumbNails.map((imgURL, id) => (
            <a href="#">
              <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Navigator;
