import * as React from 'react';

export interface Props {
  className: string;
  label: number;
}

const Button = ({ className, label, ...buttonProps }: Props) => {
  return (
    <div className={className}>
      <button {...buttonProps}>
        {label}
      </button>
    </div>
  )
}

Button.defaultProps = {
  label: "button"
};

export default Button;
