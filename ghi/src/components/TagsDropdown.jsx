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
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Select your tags</h1>
            <form
              //  onSubmit={handleSubmit}
              id="select-tags-form"
            >
              <div className="mb-3">
                <select
                  onChange={handleTagSelect}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a tag...</option>
                  {tagOptions.map((tag, index) => {
                    return (
                      <option key={tag} value={index}>
                        {tag}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                {selectedTags.map((tag, index) => {
                  return (
                    <button
                      key={tag}
                      value={index}
                      type="button"
                      className="btn btn-danger mb-1 mr-1"
                      onClick={handleTagRemove}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TagsDropdown;
