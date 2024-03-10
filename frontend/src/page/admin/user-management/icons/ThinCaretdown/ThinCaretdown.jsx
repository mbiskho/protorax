/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ThinCaretdown = ({ color = "#2B2845", className }) => {
  return (
    <svg
      className={`thin-caretdown ${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="path" d="M26 12L16 22L6 12" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

ThinCaretdown.propTypes = {
  color: PropTypes.string,
};
