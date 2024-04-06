var cart = [];

function addToCart(item, price, imageSrc) {
  // Log the imageSrc value
  // Check if the item already exists in the cart
  var existingItem = cart.find(function (cartItem) {
    return cartItem.item === item;
  });

  if (existingItem) {
    // If the item already exists, increase its count
    existingItem.count++;
  } else {
    // If the item doesn't exist, add it to the cart with count 1
    cart.push({ item: item, price: price, count: 1, imageSrc: imageSrc });
  }

  updateCartModal();
}

function updateCartModal() {
  var cartContent = document.getElementById("cartContent");

  cartContent.innerHTML = "";

  cart.forEach(function (cartItem) {
    var listItem = document.createElement("li");
    var div = document.createElement("div");
    div.classList.add("cart-item");
    listItem.appendChild(div);

    // Create img element for product image
    var img = document.createElement("img");
    img.src = cartItem.imageSrc;
    img.alt = cartItem.item;
    div.appendChild(img);

    // Create span element for item and price
    var itemSpanName = document.createElement("span");
    itemSpanName.classList.add("item-name");
    itemSpanName.textContent = cartItem.item;
    div.appendChild(itemSpanName);

    var itemSpan = document.createElement("span");
    itemSpan.classList.add("item-price");
    itemSpan.textContent = cartItem.price;
    div.appendChild(itemSpan);

    // Create div element for quantity input
    var divInput = document.createElement("div");
    divInput.classList.add("qty-input");

    // Create button for decreasing quantity
    var buttonMinus = document.createElement("button");
    buttonMinus.type = "button";
    buttonMinus.classList.add("qty-count");
    buttonMinus.classList.add("qty-count--minus");
    buttonMinus.dataset.action = "minus";
    divInput.appendChild(buttonMinus);

    // Create input element for count
    var countInput = document.createElement("input");
    countInput.min = 1;
    countInput.max = 999;
    countInput.step = 1;
    countInput.classList.add("product-qty");
    countInput.name = "product-qty";
    countInput.autocomplete = "off";
    countInput.type = "number";
    countInput.value = cartItem.count;
    divInput.appendChild(countInput);

    // Create button for increasing quantity
    var buttonPlus = document.createElement("button");
    buttonPlus.type = "button";
    buttonPlus.classList.add("qty-count");
    buttonPlus.classList.add("qty-count--add");
    buttonPlus.dataset.action = "add";
    divInput.appendChild(buttonPlus);

    // Append quantity input elements to cart item div
    div.appendChild(divInput);

    // Create span element for total price
    var totalPriceSpan = document.createElement("span");
    totalPriceSpan.classList.add("total-price");
    totalPriceSpan.textContent =
      cartItem.count * parseInt(cartItem.price) + " Kč";
    div.appendChild(totalPriceSpan);

    // Create SVG element for remove button
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("remove-item-ico");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "red");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "feather feather-x remove-item-ico");

    // Create lines for the "x" icon
    var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "18");
    line1.setAttribute("y1", "6");
    line1.setAttribute("x2", "6");
    line1.setAttribute("y2", "18");
    svg.appendChild(line1);

    var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "6");
    line2.setAttribute("y1", "6");
    line2.setAttribute("x2", "18");
    line2.setAttribute("y2", "18");
    svg.appendChild(line2);

    svg.addEventListener("click", function () {
      cart.splice(cart.indexOf(cartItem), 1);
      updateCartModal();
    });

    div.appendChild(svg);
    cartContent.appendChild(listItem);
    buttonPlus.addEventListener("click", function () {
      if (cartItem.count < 999) {
        cartItem.count++;
        updateCartModal();
      }
    });

    buttonMinus.addEventListener("click", function () {
      if (cartItem.count > 1) {
        cartItem.count--;
        updateCartModal();
      }
    });

    countInput.addEventListener("change", function () {
      var value = parseInt(countInput.value);
      if (!isNaN(value)) {
        if (value < 1) {
          value = 1;
        } else if (value > 999) {
          value = 999;
        }
        cartItem.count = value;
      } else {
        countInput.value = cartItem.count;
      }
      updateCartModal();
    });
  });
}

//#region cart
function closeCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

function openCartModal() {
  if (cart.length == 0) {
    return;
  }
  updateCartModal();
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";
}
function OpenCartModalcheckout() {
  updateCartModal();
  var cartModal = document.getElementById("cartModal-checkout");
  cartModal.style.display = "block";
}
function closeCartModalcheckout() {
  var cartModal = document.getElementById("cartModal-checkout");
  cartModal.style.display = "none";
}
window.onload = function () {
  var cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", openCartModal);

  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    console.log("Checkout button clicked!");
    OpenCartModalcheckout();
    closeCartModal();
  });

  var backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    closeCartModalcheckout();
    openCartModal();
  });

  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var productDetails = event.target.closest(".product-details"); // Find the closest ancestor with class '.product-details'
      var productCard = event.target.closest(".product-card"); // Find the closest ancestor with class '.product-details'
      if (!productDetails) {
        console.error("Product details element not found.");
        return;
      }

      var item = productDetails.querySelector(".product-title");
      var price = productDetails.querySelector(".product-price");
      var img = productCard
        .querySelector(".product-image img")
        .getAttribute("src");

      if (!item || !price) {
        console.error(
          "Item or price element not found within product details."
        );
        return;
      }

      addToCart(item.textContent, price.textContent, img);
      updateCartModal();
      img = "";
    });
  });
};
document.addEventListener("DOMContentLoaded", function (event) {
  const cartButtons = document.querySelectorAll(".cart-button");

  cartButtons.forEach((button) => {
    button.addEventListener("click", cartClick);
  });

  function cartClick() {
    let button = this;
    button.classList.add("clicked");
    setTimeout(function () {
      button.classList.remove("clicked");
    }, 2200);
  }
});

//#endregion

//#region pay
var stripe = Stripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
var elements = stripe.elements();

var card = elements.create("card", {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#666EE8",
      color: "#31325F",
      lineHeight: "40px",
      fontWeight: 300,
      fontFamily: "Helvetica Neue",
      fontSize: "15px",

      "::placeholder": {
        color: "#CFD7E0",
      },
    },
  },
});
card.mount("#card-element");

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var options = {
    name:
      document.getElementById("first-name").value +
      " " +
      document.getElementById("last-name").value,
    address_line1: document.getElementById("address-line1").value,
    address_line2: document.getElementById("address-line2").value,
    address_city: document.getElementById("address-city").value,
    address_state: document.getElementById("address-state").value,
    address_zip: document.getElementById("address-zip").value,
    address_country: document.getElementById("address-country").value,
  };
  stripe.createToken(card, options).then(setOutcome);
});
//#endregion
