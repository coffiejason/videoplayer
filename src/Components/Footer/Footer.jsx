import React from "react";
import RangeInput from "../RangeInput/RangeInput";

const Footer = ({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  control,
  videoMeta,
}) => {
  return (
    <>
      <footer>
        <RangeInput
          rEnd={rEnd}
          rStart={rStart}
          handleUpdaterStart={handleUpdaterStart}
          handleUpdaterEnd={handleUpdaterEnd}
          loading={loading}
          videoMeta={videoMeta}
          control={
            <div className="u-center">
              <button
                onClick={handleTrim}
                className="btn btn_b"
                disabled={trimIsProcessing}
              >
                {trimIsProcessing ? "trimming..." : "trim selected"}
              </button>
            </div>
          }
          thumbNails={thumbNails}
        />
      </footer>
    </>
  );
};

export default Footer;
