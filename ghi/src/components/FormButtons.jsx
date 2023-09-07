function FormButtons(props) {
  const { condition1, onClickRemove, onClickAdd, index } = props;
  return (
    <>
      {condition1.length > 1 && (
        <button
          type="button"
          className="btn btn-danger btn-sm "
          onClick={onClickRemove}
        >
          <span>X</span>
        </button>
      )}
      {condition1.length - 1 === index && (
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={onClickAdd}
        >
          <span>+</span>
        </button>
      )}
    </>
  );
}

export default FormButtons;
