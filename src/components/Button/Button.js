import React from "react";

const Button = ({ className, label, ...buttonProps }) => (
  <div className={className}>
    <button {...buttonProps}>
      {label}
    </button>
  </div>
);

Button.defaultProps = {
  label: "button"
};

export default Button;