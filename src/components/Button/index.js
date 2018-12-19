import React from 'react';
import style from './style.scss';

const Button = ({ className, label, type, ...buttonProps }) => (
  <div className={className}>
    <button {...buttonProps} className={style.button} type="button">
      {label}
    </button>
  </div>
);

Button.defaultProps = {
  label: 'button'
};

export default Button;
