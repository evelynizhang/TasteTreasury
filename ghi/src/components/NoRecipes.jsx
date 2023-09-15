function NoRecipes(props) {
  const { message } = props;
  return (
    <div className="py-5 centered-div">
      <div className="alert alert-warning text-center" role="alert">
        {message}
      </div>
    </div>
  );
}

export default NoRecipes;
