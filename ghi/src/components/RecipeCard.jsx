import { Link } from "react-router-dom";

function RecipeCard(props) {
  const { imgSrc, h3Input, biAlarmInput, biPeopleInput, pathInput } = props;

  return (
    <>
      <img
        className="card-img-top"
        src={
          imgSrc ||
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
        }
        alt="..."
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&w=1000&q=80";
        }}
      />
      <div className="card-body py-3 card-text-container">
        <div className="text-center">
          <h3 className="fw-medium">{h3Input}</h3>
          <div className="d-flex justify-content-around mt-3">
            <h6 className="m-0">
              <i className="bi bi-alarm"> </i>
              {biAlarmInput}
            </h6>
            <h6 className="m-0">
              <i className="bi bi-people"> </i>
              {biPeopleInput} Servings
            </h6>
          </div>
        </div>
      </div>
      <Link to={pathInput}>
        <div className="d-grid gap-2 col-5 mx-auto">
          <button type="button" className="btn btn-primary">
            View
          </button>
        </div>
      </Link>
    </>
  );
}

export default RecipeCard;
