function Header(props) {
  const { h1Input } = props;
  return (
    <header className="all-recipes-image py-5">
      <div className="container px-2 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">{h1Input}</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
