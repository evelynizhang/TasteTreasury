import { useState } from "react";

function RecipeForm() {
  const [formData, setFormData] = useState({
    name: "",
    prep_time: "",
    servings: "",
    picture_url: "",
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,
      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value,
    });
  };

  console.log(formData);
  // onSubmit = { handleSubmit };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new recipe</h1>
          <form id="create-recipe-form">
            <div className="form-floating mb-3">
              <input
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Name your recipe"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="vin">Recipe title</label>
            </div>
            {/* <div className="mb-3">
              <select
                value={formData.name}
                onChange={handleFormChange}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose an automobile VIN...</option>
                {autoVOs
                  // only displays VIN of autoVOs with sold property set to false
                  .filter((auto) => auto.sold === false)
                  .map((auto) => {
                    return (
                      <option key={auto.vin} value={auto.vin}>
                        {auto.vin}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={formData.name}
                onChange={handleFormChange}
                required
                name="name"
                id="name"
                className="form-select"
              >
                <option value="">Choose a salesperson...</option>
                {salespeople.map((salesperson) => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={formData.customer}
                onChange={handleFormChange}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Choose a customer...</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;
