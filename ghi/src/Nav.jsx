import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from './app/apiSlice';


function Nav(){
  const { data: account } = useGetTokenQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">Home</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/recipes">All Recipes</NavLink>
        </li>
        {account && <li className="nav-item">
          <NavLink className="nav-link" to="/recipes/mine">My Recipes</NavLink>
        </li>}
        {!account && <li className="nav-item">
          <NavLink className="nav-link" to="/login">Log in</NavLink>
        </li>}
        {!account && <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Sign up</NavLink>
        </li>}
        <li className="nav-item">
          <input className="form-control mr-sm-2" type="search" placeholder="Search recipe" aria-label="Search" />
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </li>
      </ul>
      {account && <button className="btn btn-outline-danger" onClick={() => logout()}>Logout</button>}
    </div>
  </nav>
)
}

export default Nav;
