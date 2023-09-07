function HomeIcon(props) {
  const { iClassName, h3Input, pInput } = props;
  return (
    <div className="col-lg-3 col-md-6 text-center">
      <div className="mt-5">
        <div className="mb-2">
          <i className={iClassName} />
        </div>
        <h3 className="h4 mb-2">{h3Input}</h3>
        <p className="text-muted mb-0">{pInput}</p>
      </div>
    </div>
  );
}

export default HomeIcon;
