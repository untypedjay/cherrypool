import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

function Modal({ closeModal, children }) {
  return (
    <div className="modal">
      <div className="modal__card">
        <button className="modal__close-button" onClick={closeModal}><FaTimes/></button>
        { children }
      </div>
    </div>
  );
}

export default Modal;