import { useState, useEffect } from "react";
import { useGetAllTagsQuery } from "../app/recipeApiSlice";
import { reset, add, remove } from "../app/filterTagsSlice";
import { useDispatch, useSelector } from "react-redux";

function TagsFilter() {
  const tagsData = useGetAllTagsQuery();
  const [tagOptions, setTagOptions] = useState([""]);
  const selectedTags = useSelector((state) => state.filterTags.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (tagsData.isSuccess) {
      setTagOptions(tagsData.data);
    }
  }, [tagsData, setTagOptions]);

  const filteredOptions = () => {
    if (tagOptions && selectedTags) {
      return tagOptions.filter((tag) => !selectedTags.includes(tag));
    }
    return tagOptions;
  };

  const handleTagSelect = (e) => {
    dispatch(add(e.target.value));
  };

  const handleTagRemove = (e) => {
    dispatch(remove(e.target.value));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <>
      <div className="input-group mt-4 mb-3 ml-5 col-3">
        <select
          onChange={handleTagSelect}
          required
          name="customer"
          id="customer"
          className="form-control"
        >
          <option value="">Filter by tags</option>
          {filteredOptions().map((tag) => {
            return (
              <option key={tag} value={tag}>
                {tag}
              </option>
            );
          })}
        </select>

        <button
          className="btn btn-secondary btn-sm input-group-btn"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="button-group">
        {selectedTags.map((tag, index) => {
          return (
            <button
              key={tag}
              value={index}
              type="button"
              className="btn btn-primary ml-2 mb-1 mr-1 mt-2 btn-sm"
              onClick={handleTagRemove}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default TagsFilter;
