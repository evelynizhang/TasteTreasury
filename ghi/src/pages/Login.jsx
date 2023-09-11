import { useState, useEffect } from "react";
import {
  useLoginMutation,
  useGetAccountsQuery,
  useGetTokenQuery,
} from "../app/recipeApiSlice";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: account } = useGetTokenQuery();
  const getAccounts = useGetAccountsQuery();
  const [login, loginResponse] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) navigate("/recipes/mine");
  }, [account]);

  useEffect(() => {
    if (loginResponse.isSuccess) navigate("/recipes/mine");
    if (loginResponse.status === "rejected") {
      setErrorMessage("incorrect password");
    }
  }, [loginResponse]);

  if (getAccounts.status === "fulfilled") {
    const allUsername = getAccounts.data.map((each) => each.username);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!allUsername.includes(username)) {
        setErrorMessage("incorrect username");
        return;
      }
      login({ username, password });
    };

    return (
      <div className="container">
        <div className="body">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2">
            <div className="col mt-5">
              <h3
                className="align-content-center fw-normal mb-3 pb-3"
                style={{ letterSpacing: 1 }}
              >
                Log in
              </h3>
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {/* <label className="form-label mb-0" htmlFor="Username">
                  Username
                </label> */}
                <FormInput
                  type="text"
                  id="Login_username"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength="50"
                  labelText="Username"
                />
                {/* <label className="form-label mb-0" htmlFor="Password">
                  Password
                </label> */}
                <FormInput
                  id="Login_password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength="50"
                  className="form-control form-control-lg"
                  labelText="Password"
                />

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-primary">
                    Sign up here
                  </Link>
                </p>
              </form>
            </div>

            <div className="col d-none d-md-block mt-2">
              <img
                src="https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Login image"
                className="img-thumbnail"
                style={{ maxHeight: "700px" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
