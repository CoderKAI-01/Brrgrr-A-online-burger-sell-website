const ingredients = [
  { name: "lettuce", price: 0.5 },
  { name: "tomato", price: 0.75 },
  { name: "cheese", price: 1.0 },
  { name: "bacon", price: 1.5 },
  { name: "onion", price: 0.5 },
  { name: "mushroom", price: 0.75 },
];

const renderIngredients = () => {
  const ingredientsContainer = document.getElementById("ingredients-container");

  ingredients.forEach((ingredient) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" name="${ingredient.name}" value="${
      ingredient.price
    }">
      ${ingredient.name} ($${ingredient.price.toFixed(2)})
    `;
    ingredientsContainer.appendChild(label);
  });
};

const renderCustomInputs = () => {
  const customInputsContainer = document.getElementById(
    "custom-inputs-container"
  );
  customInputsContainer.innerHTML = `
    <div class="form-group">
      <label for="custom-name">Custom Ingredient Name:</label>
      <input type="text" name="custom-name" id="custom-name">
    </div>
    <div class="form-group">
      <label for="custom-price">Custom Ingredient Price:</label>
      <input type="text" name="custom-price" id="custom-price">
    </div>
  `;
};

const getSelectedIngredients = () => {
  const form = document.getElementById("burger-builder-form");
  const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
  const customName = form.querySelector('input[name="custom-name"]').value;
  const customPrice = parseFloat(
    form.querySelector('input[name="custom-price"]').value
  );

  const selectedIngredients = [];

  checkboxes.forEach((checkbox) => {
    selectedIngredients.push({
      name: checkbox.name,
      price: parseFloat(checkbox.value),
    });
  });

  if (customName !== "" && !isNaN(customPrice)) {
    selectedIngredients.push({
      name: customName,
      price: customPrice,
    });
  }

  return selectedIngredients;
};

const calculateTotalPrice = (selectedIngredients) => {
  let totalPrice = 0;

  selectedIngredients.forEach((ingredient) => {
    totalPrice += ingredient.price;
  });

  return totalPrice;
};

const generateOrderSummary = (selectedIngredients, totalPrice) => {
  let summaryHTML = "<h2>Your Order:</h2>";

  selectedIngredients.forEach((ingredient) => {
    summaryHTML += `
      <p>${ingredient.name} ($${ingredient.price.toFixed(2)})</p>
    `;
  });

  summaryHTML += `
    <p>Total Price: $${totalPrice.toFixed(2)}</p>
  `;

  return summaryHTML;
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const selectedIngredients = getSelectedIngredients();
  const totalPrice = calculateTotalPrice(selectedIngredients);
  const orderSummaryHTML = generateOrderSummary(
    selectedIngredients,
    totalPrice
  );

  const orderSummary = document.createElement("div");
  orderSummary.innerHTML = orderSummaryHTML;

  const app = document.getElementById("app");
  app.appendChild(orderSummary);
};

const init = () => {
  renderIngredients();
  renderCustomInputs();

  const form = document.getElementById("burger-builder-form");
  form.addEventListener("submit", handleFormSubmit);
};

init();
