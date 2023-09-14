import { useState, useEffect } from "react";
import { useGetAllTagsQuery } from "../app/recipeApiSlice";
import { reset, add, remove } from "../app/tagsSlice";
import { useDispatch } from "react-redux";

function TagsDropdown() {
  const tagsData = useGetAllTagsQuery();
  const [tagOptions, setTagOptions] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("component log: ", selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (tagsData.isSuccess) {
      setTagOptions(tagsData.data);
    }
  }, [tagsData, setTagOptions]);

  const handleTagSelect = (e) => {
    let options = [...tagOptions];
    let selected = options.splice(e.target.value, 1)[0];
    setTagOptions(options);
    setSelectedTags([...selectedTags, selected]);
    dispatch(add(selected));
  };

  const handleTagRemove = (e) => {
    let oneLessTag = [...selectedTags];
    let deselected = oneLessTag.splice(e.target.value, 1)[0];
    setTagOptions([...tagOptions, deselected]);
    setSelectedTags(oneLessTag);
    dispatch(remove(oneLessTag));
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
            {tagOptions.map((tag, index) => {
              return (
                <option key={tag} value={index}>
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
        {/* <button className="btn btn-secondary" onClick={dispatch(reset)}>
                Reset
              </button> */}
      </div>
    </>
  );
}

export default TagsDropdown;
