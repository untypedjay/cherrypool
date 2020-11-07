import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

function Modal({ close, children }) {
  return (
    <div className="modal">
      <div className="modal__card">
        <button className="modal__close-button" onClick={close}><FaTimes size="30px"/></button>
        { children }
      </div>
    </div>
  );
}

export default Modal;