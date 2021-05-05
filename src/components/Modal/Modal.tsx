import React, { ReactNode, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside';
import './Modal.css';

interface Props {
  close: () => any;
  children: ReactNode;
};

export default function Modal({ close, children }: Props) {
  const clickRef = useRef<HTMLDivElement>(null);
  useClickOutside(clickRef, close);

  return (
    <div className="modal">
      <div className="modal__card" ref={clickRef}>
        <button className="modal__close-button" onClick={close}>
          <FaTimes size="30px"/>
        </button>
        { children }
      </div>
    </div>
  );
};