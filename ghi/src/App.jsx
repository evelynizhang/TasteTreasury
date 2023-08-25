
import "./App.css";
import Nav from "./Nav";

import Login from "./Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home"


function App() {
  return (
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
  );
}

export default App;
