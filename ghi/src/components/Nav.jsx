import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "../app/recipeApiSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const logo = process.env.PUBLIC_URL + "/favicon.ico";
  const { data: account } = useGetTokenQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // if (logoutResponse.isSuccess) navigate("/");
    window.location.href = "/module3-project-gamma";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mx-3">
      <NavLink className="navbar-brand" to="/">
        <img className="icon" src={logo} alt="homeIcon" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/recipes">
              All Recipes
            </NavLink>
          </li>
          {account && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipes/mine">
                My Recipes
              </NavLink>
            </li>
          )}
          {account && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/recipes/create">
                Add a Recipe
              </NavLink>
            </li>
          )}
        </ul>
        {!account && (
          <button
            className="btn ml-2 btn-outline-primary"
            onClick={() => navigate("/login")}
          >
            Account
          </button>
        )}
        {account && (
          <button
            className="btn btn-outline-danger ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
