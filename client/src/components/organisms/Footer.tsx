import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__link" to="/terms-of-use">Terms of use</Link>
      <p className="footer__paragraph">Made with <FaHeart className="footer__icon"/> in Austria.</p>
    </footer>
  );
}

export default Footer;