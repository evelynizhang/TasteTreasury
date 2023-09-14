import { useState, useEffect } from "react";
import { useGetAllTagsQuery } from "../app/recipeApiSlice";
import { reset, add, remove } from "../app/tagsSlice";
import { useDispatch, useSelector } from "react-redux";

function TagsFilter() {
  const tagsData = useGetAllTagsQuery();
  const [tagOptions, setTagOptions] = useState([""]);
  const selectedTags = useSelector((state) => state.filterTags.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

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

  return (
    <>
      <div class="input-group mt-4">
        <div className="mb-3 ml-5">
          <select
            onChange={handleTagSelect}
            required
            name="customer"
            id="customer"
            className="form-select "
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
          {selectedTags.map((tag, index) => {
            return (
              <button
                key={tag}
                value={index}
                type="button"
                className="btn btn-primary mb-1 mr-1 input-group-btn mt-2 btn-sm"
                onClick={handleTagRemove}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {/* <button className="btn btn-secondary" onClick={dispatch(reset())}>
          Reset
        </button> */}
      </div>
    </>
  );
}

export default TagsFilter;
