import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { search, reset } from "./app/searchSlice";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchInput));
  };

  return (
    <form
      className="d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 float-right"
      onSubmit={handleSubmit}
    >
      <div className="input-group mt-2">
        <input
          className="form-control"
          type="search"
          placeholder="Search Recipe..."
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-search" />
        </button>
        <button
          className="btn btn-secondary"
          type="submit"
          onClick={() => {
            dispatch(reset());
            setSearchInput("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
