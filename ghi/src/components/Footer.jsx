import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-link-items">
        <p>
          Development Team <i class="bi bi-linkedin"></i>
        </p>

        <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <Link to="/about">Jonah Heskje</Link>
          </div>
          <div class="col-md-auto">
            <Link to="https://www.linkedin.com/in/ni-evelyn-zhang/">
              Evelyn Zhang
            </Link>
          </div>
          <div class="col-md-auto">
            <Link to="/book">Eric Conners</Link>
          </div>
          <div class="col-md-auto">
            <Link to="/contact-us">John Rangel</Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
