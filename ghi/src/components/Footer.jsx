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
            <Link to="https://www.linkedin.com/in/jonah-heskje/">
              Jonah Heskje
            </Link>
          </div>
          <div className="col-md-auto">
            <Link to="https://www.linkedin.com/in/ni-evelyn-zhang/">
              Evelyn Zhang
            </Link>
          </div>
          <div className="col-md-auto">
            <Link to="https://www.linkedin.com/in/erick-conners-b5a095276">
              Eric Conners
            </Link>
          </div>
          <div className="col-md-auto">
            <Link to="https://www.linkedin.com/in/john-rangel-10027a18b/">
              John Rangel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
