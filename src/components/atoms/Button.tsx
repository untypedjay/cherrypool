import React, { ReactNode } from 'react';
import './Button.css';

interface Props {
  classSelector: string;
  onClick: () => void;
  children: ReactNode;
}

export default function Button({ classSelector, onClick, children }: Props) {
  return (
    <button className={`button ${classSelector}`} onClick={onClick}>
      { children }
    </button>
  );
}