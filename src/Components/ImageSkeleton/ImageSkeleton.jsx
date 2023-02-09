import React from "react";
import Skeleton from "react-loading-skeleton";
import "./image.skeleton.css";

const ImageSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item) => (
      <div className="image-skeleton">
        <Skeleton width={110} height={90} />
      </div>
    ));
};

export default ImageSkeleton;
