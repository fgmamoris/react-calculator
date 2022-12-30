import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="text-center">
      <p>
        © {new Date().getFullYear()} Copyright
        <i> Desinged by Federico Mamoris </i>
        <a
          href="https://www.github.com/fgmamoris"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'inherit' }}
        >
          <FaGithub />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
