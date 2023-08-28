
import "./App.css";
import Nav from "./Nav";
import Login from "./Login"
import Signup from "./Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home"
// import AllRecipeCard from "./AllRecipeCard"
// import MineRecipeCard from "./MineRecipeCard"


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
          {/* <Route path="recipes">
            <Route index element={ <AllRecipeCard />} />
          </Route>
          <Route path="recipes/mine">
            <Route index element={ <MineRecipeCard />} />
          </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
