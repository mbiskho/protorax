/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ThinDotsthreevertical = ({ color = "#2B2845", className }) => {
  return (
    <svg
      className={`thin-dotsthreevertical ${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8C15 8.55228 15.4477 9 16 9Z"
        fill={color}
      />
      <path
        className="path"
        d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
        fill={color}
      />
      <path
        className="path"
        d="M16 25C16.5523 25 17 24.5523 17 24C17 23.4477 16.5523 23 16 23C15.4477 23 15 23.4477 15 24C15 24.5523 15.4477 25 16 25Z"
        fill={color}
      />
    </svg>
  );
};

ThinDotsthreevertical.propTypes = {
  color: PropTypes.string,
};
