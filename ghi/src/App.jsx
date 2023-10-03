import "./css/App.css";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import MyRecipes from "./pages/MyRecipes";
import RecipeForm from "./pages/RecipeForm";
import SingleRecipe from "./pages/SingleRecipe";
import UpdateForm from "./pages/UpdateForm";
import Footer from "./components/Footer";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <div id="content-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recipes" element={<AllRecipes />} />
          <Route path="recipes/mine" element={<MyRecipes />} />
          <Route path="recipes/create" element={<RecipeForm />} />
          <Route path="recipes/:recipe_id" element={<SingleRecipe />} />
          <Route path="recipes/:recipe_id/update" element={<UpdateForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
