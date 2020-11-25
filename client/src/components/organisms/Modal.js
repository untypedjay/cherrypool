import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../../styles/Modal.css';

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

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default Modal;