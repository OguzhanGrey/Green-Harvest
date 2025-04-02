document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-list");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  function initializeShopNowButtons() {
    const shopNowButtons = document.querySelectorAll(
      ".shop-now-btn, .shop-now-hero"
    );
    shopNowButtons.forEach((button) => {
      button.addEventListener("click", openShoppingCart);
    });
  }

  initializeShopNowButtons();

  const observer = new MutationObserver(initializeShopNowButtons);
  observer.observe(document.body, { childList: true, subtree: true });
});

let cart = [];

function openShoppingCart() {
  const modal = document.createElement("div");
  modal.className = "shopping-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "shopping-modal-content";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => modal.remove();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  const title = document.createElement("h2");
  title.className = "modal-title";
  title.textContent = "Fresh Vegetable Shop";

  const subtitle = document.createElement("p");
  subtitle.className = "modal-subtitle";
  subtitle.textContent = "Select your fresh organic vegetables";

  const vegetables = [
    {
      name: "Eggplant",
      price: 60,
      image: "./images/eggplant.png",
      description: "Fresh organic eggplant, perfect for Mediterranean dishes",
    },
    {
      name: "Leek",
      price: 50,
      image: "./images/leek.png",
      description: "Crisp and fresh leeks, ideal for soups and stews",
    },
    {
      name: "Mushrooms",
      price: 40,
      image: "./images/mushrooms.png",
      description: "Premium quality mushrooms, rich in flavor",
    },
    {
      name: "Corn",
      price: 60,
      image: "./images/corn.png",
      description: "Sweet and tender corn, perfect for grilling",
    },
    {
      name: "Sweet Potatoes",
      price: 50,
      image: "./images/sweetpotatoes.png",
      description: "Nutritious sweet potatoes, great for healthy meals",
    },
    {
      name: "Carrot",
      price: 40,
      image: "./images/carrot.png",
      description: "Fresh organic carrots, rich in vitamins",
    },
  ];

  const vegGrid = document.createElement("div");
  vegGrid.className = "vegetable-grid";

  vegetables.forEach((veg) => {
    const vegCard = document.createElement("div");
    vegCard.className = "vegetable-card";

    const imgContainer = document.createElement("div");
    imgContainer.className = "veg-img-container";

    const img = document.createElement("img");
    img.src = veg.image;
    img.alt = veg.name;
    imgContainer.appendChild(img);

    const vegInfo = document.createElement("div");
    vegInfo.className = "veg-info";

    const namePrice = document.createElement("div");
    namePrice.className = "name-price";

    const name = document.createElement("h3");
    name.textContent = veg.name;

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `${veg.price} USD/kg`;

    namePrice.appendChild(name);
    namePrice.appendChild(price);

    const description = document.createElement("p");
    description.className = "veg-description";
    description.textContent = veg.description;

    const controls = document.createElement("div");
    controls.className = "veg-controls";

    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.min = "0";
    quantity.value = "0";
    quantity.className = "quantity-input";

    const addButton = document.createElement("button");
    addButton.className = "add-to-cart";
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => {
      if (quantity.value > 0) {
        addButton.textContent = "Added ✓";
        addButton.classList.add("added");
        setTimeout(() => {
          addButton.textContent = "Add to Cart";
          addButton.classList.remove("added");
        }, 1000);
      }
    };

    controls.appendChild(quantity);
    controls.appendChild(addButton);

    vegInfo.appendChild(namePrice);
    vegInfo.appendChild(description);
    vegInfo.appendChild(controls);

    vegCard.appendChild(imgContainer);
    vegCard.appendChild(vegInfo);
    vegGrid.appendChild(vegCard);
  });

  const cartSummary = document.createElement("div");
  cartSummary.className = "cart-summary";

  const orderButton = document.createElement("button");
  orderButton.textContent = "Proceed to Checkout";
  orderButton.className = "order-button";
  orderButton.onclick = () => {
    const selectedItems = [];
    document.querySelectorAll(".quantity-input").forEach((input, index) => {
      if (input.value > 0) {
        selectedItems.push({
          name: vegetables[index].name,
          quantity: input.value,
          price: vegetables[index].price,
        });
      }
    });

    if (selectedItems.length > 0) {
      cart = selectedItems;
      const total = selectedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      alert(
        `Order Summary:\n\n${selectedItems
          .map(
            (item) =>
              `${item.name}: ${item.quantity}kg x ${item.price}USD = ${
                item.quantity * item.price
              }USD`
          )
          .join("\n")}\n\nTotal: ${total}USD`
      );

      window.location.href = "#reviews";
      modal.remove();
    } else {
      alert("Please select at least one item");
    }
  };

  cartSummary.appendChild(orderButton);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(title);
  modalContent.appendChild(subtitle);
  modalContent.appendChild(vegGrid);
  modalContent.appendChild(cartSummary);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Alert button functionality
document.querySelector(".alert-btn").addEventListener("click", () => {
  alert("Hi everyone from javascript");
});

// Hamburger menü linklerine tıklandığında menüyü kapat
document.addEventListener("DOMContentLoaded", function () {
  const menuCheckbox = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuCheckbox.checked = false;
    });
  });
});
