import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import AllRecipes from "./AllRecipes";

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
          <Route path="signup">
            <Route index element={<Signup />} />
          </Route>
          <Route path="recipes" element={<AllRecipes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
