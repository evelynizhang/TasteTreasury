import { useState, useEffect } from "react";
import { useLoginMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResponse.isSuccess) navigate("/recipes/mine");
  }, [loginResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h1>Log in </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">username</label>
            <input
              type="text"
              className="form-control"
              id="Login_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="text"
              className="form-control"
              id="Login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
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

export default Login;
