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
  const [signup, signupResponse] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const getAccounts = useGetAccountsQuery();
  const navigate = useNavigate();
  const { data: account } = useGetTokenQuery();

  useEffect(() => {
    if (account) navigate("/recipes/mine");
  }, [account]);

  useEffect(() => {
    if (signupResponse.isSuccess) navigate("/");
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
      <>
        <div className="col-md-6 offset-md-3">
          <h1>Sign up form</h1>
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
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Signup;
