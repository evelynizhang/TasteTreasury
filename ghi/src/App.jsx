
import "./App.css";
import Nav from "./Nav";

import Login from "./Login"
// import Signup from "./Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home"


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
