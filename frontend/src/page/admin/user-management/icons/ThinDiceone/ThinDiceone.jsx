/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ThinDiceone = ({ color = "#2B2845", className }) => {
  return (
    <svg
      className={`thin-diceone ${className}`}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M24 5H8C6.34315 5 5 6.34315 5 8V24C5 25.6569 6.34315 27 8 27H24C25.6569 27 27 25.6569 27 24V8C27 6.34315 25.6569 5 24 5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="path"
        d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
        fill={color}
      />
    </svg>
  );
};

ThinDiceone.propTypes = {
  color: PropTypes.string,
};
