import { useState, useEffect } from "react";
import { useSignupMutation, useGetAccountQuery } from "./app/apiSlice"
import { useNavigate } from "react-router-dom"




function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [signup, signupResponse] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const getAccount = useGetAccountQuery();
  const navigate = useNavigate();

  console.log(getAccount.status)


  useEffect(() => {
    if (signupResponse.isSuccess) navigate("/");
  } , [signupResponse])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      setErrorMessage("Passwords do not match!")
      return
    }
    signup({username, password});
  }

  return (
    <>
    <div className="col-md-6 offset-md-3">
    <h1>Sign up form</h1>
    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="signup_username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="signup_email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="signup_password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
       <div className="form-group">
        <label htmlFor="exampleInputPassword2">Password confirmation</label>
        <input type="password" className="form-control" id="signup_password_confirmation" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Password Confirmation" />
      </div>
      <button type="submit" className="btn btn-primary">Sign up</button>
   </form>
   </div>
   </>
  )
}

export default Signup
