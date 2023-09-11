import "../css/Home.css";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "../app/recipeApiSlice";
import HomeIcon from "../components/HomeIcon";

function Home() {
  const getToken = useGetTokenQuery();
  if (getToken.status === "fulfilled")
    return (
      <>
        <header className="home-page-image py-3">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-center">
                  <h1 className="display-5 fw-bolder text-white mb-2">
                    Tasty Treasury
                  </h1>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Create, update, view, and store any recipe so that you can
                    check them out anytime or anywhere!
                  </p>
                  {getToken.data === null && (
                    <div className="d-grid gap-3 d-sm-flex justify-content-center">
                      <Link to="/signup">
                        <button
                          className="btn btn-primary rounded-pill btn-lg px-4 me-sm-3"
                          href="#features"
                        >
                          Sign Up!
                        </button>
                      </Link>
                      <Link to="/login">
                        <button
                          className="btn btn-secondary rounded-pill btn-lg px-4"
                          href="#!"
                        >
                          Login
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="page-section" id="services">
          <div className="container px-4 px-lg-5">
            <h2 className="text-center mt-0">For your Convenience</h2>
            <hr className="border-secondary border-4 opacity-50" />
            <div className="row gx-4 gx-lg-5">
              <HomeIcon
                iClassName="bi-mouse2 fs-1 text-primary"
                h3Input="Simple Usage"
                pInput="Just a few clicks away from what you need."
              />
              <HomeIcon
                iClassName="bi-calendar-check fs-1 text-primary"
                h3Input="Up to Date"
                pInput="All recipes are kept current, or you can make changes."
              />
              <HomeIcon
                iClassName="bi-upload fs-1 text-primary"
                h3Input="Ready to Search"
                pInput="Browse by tag name if you're feeling curious."
              />
              <HomeIcon
                iClassName="bi-heart fs-1 text-primary"
                h3Input="Made with Love"
                pInput="Add more seasoning to your dry chicken now!"
              />
            </div>
          </div>
        </section>
      </>
    );
}
export default Home;
