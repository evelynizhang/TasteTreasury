import { useState } from "react";
import { useLoginMutation } from "./app/apiSlice"
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";



function Login(){
  // const { token } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();

  console.log(loginResponse)
  // console.log(username)

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("login");
    console.log({username, password})
    login({username, password});
  }

  return (
    <>
    <h1>Login form</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">username</label>
        <input type="text" className="form-control" id="Login_username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="text" className="form-control" id="Login_password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-success">Login</button>
    </form>
    </>
  )
}

export default Login
