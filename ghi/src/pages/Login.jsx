import { useState, useEffect } from "react";
import {
  useLoginMutation,
  useGetAccountsQuery,
  useGetTokenQuery,
} from "../app/recipeApiSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const getAccounts = useGetAccountsQuery();
  const { data: account } = useGetTokenQuery();

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
      <>
        <div className="col-md-6 offset-md-3">
          <h1>Log in </h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <FormInput
              id="Login_username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              labelText="Username"
              maxLength="50"
            />
            <FormInput
              id="Login_password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              labelText="Password"
              maxLength="50"
            />
            <div className="d-flex justify-content-around">
              <button type="submit" className="btn btn-success">
                Login
              </button>
              <button
                type="submit"
                className="btn btn-primary "
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
