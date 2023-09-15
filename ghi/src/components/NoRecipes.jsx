function NoRecipes(props) {
  const { message } = props;
  return (
    <section className="py-5">
      <div className="alert alert-warning text-center" role="alert">
        {message}
      </div>
    </section>
  );
}

export default NoRecipes;
