import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "./app/apiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { data: account } = useGetTokenQuery();
  const [logout, logoutResponse] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutResponse.isSuccess) navigate("/");
  }, [logoutResponse]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Home
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
            className="btn btn-outline-primary ml-2"
            onClick={() => navigate("/login")}
          >
            Account
          </button>
        )}
        {account && (
          <button
            className="btn btn-outline-danger ml-2"
            onClick={() => logout()}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
