import { useState, useEffect } from "react";
import {
  useSignupMutation,
  useGetAccountsQuery,
  useGetTokenQuery,
} from "../app/recipeApiSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: account } = useGetTokenQuery();
  const getAccounts = useGetAccountsQuery();
  const [signup, signupResponse] = useSignupMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) navigate("/recipes/mine");
  }, [account]);

  useEffect(() => {
    if (signupResponse.isSuccess) navigate("/recipes/mine");
  }, [signupResponse]);

  if (getAccounts.status === "fulfilled") {
    const allUsername = getAccounts.data.map((each) => each.username);
    const allEmail = getAccounts.data.map((each) => each.email);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== password_confirmation) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      if (allUsername.includes(username)) {
        setErrorMessage("Username is taken!");
        return;
      }
      if (allEmail.includes(email)) {
        setErrorMessage("Email is taken!");
        return;
      }
      signup({ username, email, password });
    };

    return (
      <div className="container">
        <div className="body">
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2">
            <div className="col d-none d-md-block mt-2">
              <img
                src="https://s23209.pcdn.co/wp-content/uploads/2017/05/How-to-Make-an-Easy-Cheese-Board-in-10-MinutesIMG_0257edit.jpg"
                alt="Login image"
                className="img-thumbnail"
                style={{ maxHeight: "700px" }}
              />
            </div>
            <div className="col mt-5">
              <h2
                className="align-content-center fw-normal mb-3 pb-3"
                style={{ letterSpacing: 1 }}
              >
                Sign up
              </h2>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <FormInput
                  id="signup_username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  labelText="Username"
                  maxLength="50"
                />
                <FormInput
                  id="signup_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  labelText="Email address"
                  aria-describedby="emailHelp"
                  maxLength="254"
                />
                <FormInput
                  id="signup_password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  labelText="Password"
                  maxLength="50"
                />
                <FormInput
                  id="signup_password_confirmation"
                  type="password"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Password Confirmation"
                  labelText="Password confirmation"
                  maxLength="50"
                />
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
