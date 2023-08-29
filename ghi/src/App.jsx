import "./App.css";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllRecipes from "./AllRecipes";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recipes">
            <Route index element={<AllRecipes />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
