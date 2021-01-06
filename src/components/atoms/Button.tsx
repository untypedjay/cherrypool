import React, { ReactNode } from 'react';
import './Button.css';

type Props = {
  classSelector: string;
  onClick: () => void;
  children: ReactNode;
};

function Button({ classSelector, onClick, children }: Props) {
  return (
    <button className={`button ${classSelector}`} onClick={onClick}>
      { children }
    </button>
  );
}

export default Button;