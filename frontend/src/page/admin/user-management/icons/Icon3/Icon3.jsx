/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icon3 = ({ color = "#4F566B", className }) => {
  return (
    <svg
      className={`icon-3 ${className}`}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12ZM5.25 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6C2.25 6.41421 2.58579 6.75 3 6.75H5.25V9C5.25 9.41421 5.58579 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9V6.75H9C9.41421 6.75 9.75 6.41421 9.75 6C9.75 5.58579 9.41421 5.25 9 5.25H6.75V3C6.75 2.58579 6.41421 2.25 6 2.25C5.58579 2.25 5.25 2.58579 5.25 3V5.25Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

Icon3.propTypes = {
  color: PropTypes.string,
};
