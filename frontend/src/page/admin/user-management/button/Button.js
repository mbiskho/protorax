/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon3 } from "../icons/Icon3";
import "./style.css";

export const Button = ({ size, color, leftIcon, rightIcon, className, textClassName, text = "Button" }) => {
  return (
    <div className={`button ${size} ${color} right-icon-${rightIcon} left-icon-${leftIcon} ${className}`}>
      <div className={`text ${textClassName}`}>
        {!leftIcon && size === "medium" && !rightIcon && <>{text}</>}

        {rightIcon && (
          <div className="div">
            {size === "medium" && <>{text}</>}

            {size === "small" && <>Small</>}

            {size === "large" && <>Large</>}

            {size === "jumbo" && <>Jumbo</>}
          </div>
        )}

        {(leftIcon || rightIcon) && (
          <Icon3
            className={`${size === "jumbo" ? "class" : "class-2"}`}
            color={color === "white" ? "#4F566B" : "white"}
          />
        )}

        {!leftIcon && size === "small" && !rightIcon && <>Small</>}

        {!leftIcon && size === "large" && !rightIcon && <>Large</>}

        {size === "jumbo" && !leftIcon && !rightIcon && <>Jumbo</>}

        {leftIcon && (
          <div className="text-2">
            {size === "medium" && <>{text}</>}

            {size === "small" && <>Small</>}

            {size === "large" && <>Large</>}

            {size === "jumbo" && <>Jumbo</>}
          </div>
        )}
      </div>
    </div>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["large", "jumbo", "medium", "small"]),
  color: PropTypes.oneOf(["blue", "white", "red"]),
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  text: PropTypes.string,
};
