import "./css/Home.css";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice";

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
                    Tasty Treasure
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
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2">
                    <i className="bi-mouse2 fs-1 text-primary" />
                  </div>
                  <h3 className="h4 mb-2">Simple Usage</h3>
                  <p className="text-muted mb-0">
                    Just a few clicks away from what you need.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2">
                    <i className="bi-calendar-check fs-1 text-primary" />
                  </div>
                  <h3 className="h4 mb-2">Up to Date</h3>
                  <p className="text-muted mb-0">
                    All recipes are kept current, or you can make changes.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2">
                    <i className="bi-upload fs-1 text-primary" />
                  </div>
                  <h3 className="h4 mb-2">Ready to Search</h3>
                  <p className="text-muted mb-0">
                    Browse by tag name if you're feeling curious.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2">
                    <i className="bi-heart fs-1 text-primary" />
                  </div>
                  <h3 className="h4 mb-2">Made with Love</h3>
                  <p className="text-muted mb-0">
                    Add more seasoning to your dry chicken now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
export default Home;
