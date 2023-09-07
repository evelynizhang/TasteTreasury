import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link to="/signup">How it works</Link>
            <Link to="/about">About</Link>
            <Link to="/book">Book</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items-subscription">
            <p className="footer-subscription-text">
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
