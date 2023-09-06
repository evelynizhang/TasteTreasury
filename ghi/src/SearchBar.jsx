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
      className="form-inline my-2 my-lg-0 float-right"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search recipe"
        aria-label="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        className="btn btn-outline-success my-2 mr-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
      <button
        className="btn btn-outline-danger my-2 mr-2 my-sm-0"
        type="submit"
        onClick={() => {
          dispatch(reset());
          setSearchInput("");
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default SearchBar;
