
import "./App.css";
import Nav from "./Nav";

import Login from "./Login"
// import Signup from "./Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home"
// import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";



function App() {

  return (
    // <AuthProvider>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login">
              <Route index element={<Login />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
