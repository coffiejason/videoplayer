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
          {/* <a href="#"><img src="./assets/noise.png" alt="">
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?woman" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?design" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?sky" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?tree" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?cat" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?dog" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?office" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?sea" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?green" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?fashion" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?architecture" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?art" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?style" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?animal" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?home" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?flower" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?grass" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?market" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?street" alt=""></a>
            <a href="#"><img src="https://source.unsplash.com/featured/500x300/?street" alt=""></a> */}
        </div>
      </aside>
    </>
  );
};

export default Navigator;
