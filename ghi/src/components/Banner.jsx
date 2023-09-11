function Banner(props) {
  const { page_name } = props;
  return (
    <header className="all-recipes-image py-5">
      <div className="container px-2 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">{page_name}</h1>
        </div>
      </div>
    </header>
  );
}

export default Banner;
