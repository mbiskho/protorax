import * as React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

export default function Button({ children, className, isLoading, ...rest }) {
  if (isLoading)
    return (
      <button
        className={clsx(
          "btn btn-primary d-flex align-items-center justify-content-center disable",
          className
        )}
        type="button"
        disabled
        style={{
          color: "white",
          backgroundColor: "#1c4a78",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "medium",
        }}
        {...rest}
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </button>
    );
  return (
    <button
      className={clsx(
        "btn btn-primary d-flex align-items-center justify-content-center disable",
        className
      )}
      style={{
        color: "white",
        backgroundColor: "#1c4a78",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "medium",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
