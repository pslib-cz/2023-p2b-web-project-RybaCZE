var cart = [];

function addToCart(item, price) {
  cart.push({ item: item, price: price });
}

function updateCartModal() {
  var cartContent = document.getElementById("cartContent");

  cartContent.innerHTML = "";

  cart.forEach(function (cartItem) {
    var listItem = document.createElement("li");
    listItem.textContent = cartItem.item + " - " + cartItem.price;
    cartContent.appendChild(listItem);
  });
}

function closeCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

function openCartModal() {
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
    // Add your checkout functionality here
    console.log("Checkout button clicked!");
    OpenCartModalcheckout();
    closeCartModal();
  });

  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var productDetails = event.target.closest(".product-details"); // Find the closest ancestor with class '.product-details'
      if (!productDetails) {
        console.error("Product details element not found.");
        return;
      }

      var item = productDetails.querySelector(".product-title");
      var price = productDetails.querySelector(".product-price");

      if (!item || !price) {
        console.error(
          "Item or price element not found within product details."
        );
        return;
      }

      addToCart(item.textContent, price.textContent);
      updateCartModal();
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
