import "./Footer.css";
import githubIcon from "../../images/github.png";
import linkedinIcon from "../../images/Union.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <p className="footer__copyr">
          © 2025 NewsExplorer, Powered by News API
        </p>
      </div>

      <div className="footer__right">
        <a href="/" className="footer__link">
          Home
        </a>
        <a
          href="https://tripleten.com"
          target="_blank"
          rel="noreferrer"
          className="footer__link"
        >
          TripleTen
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icon"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icon"
        >
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
