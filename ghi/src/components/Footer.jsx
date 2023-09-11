import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-link-items">
        <p>
          Development Team <i className="bi bi-linkedin"></i>
        </p>

        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Link
              to="https://www.linkedin.com/in/jonah-heskje/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jonah Heskje
            </Link>
          </div>
          <div className="col-md-auto">
            <Link
              to="https://www.linkedin.com/in/ni-evelyn-zhang/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Evelyn Zhang
            </Link>
          </div>
          <div className="col-md-auto">
            <Link
              to="https://www.linkedin.com/in/erick-conners-b5a095276"
              target="_blank"
              rel="noopener noreferrer"
            >
              Erick Conners
            </Link>
          </div>
          <div className="col-md-auto">
            <Link
              to="https://www.linkedin.com/in/john-rangel-10027a18b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              John Rangel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
