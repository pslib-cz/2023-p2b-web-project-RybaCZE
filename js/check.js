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

window.onload = function () {
  var cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", openCartModal);

  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    // Add your checkout functionality here
    console.log("Checkout button clicked!");
    closeCartModal();
  });

  var addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var item =
        event.target.parentElement.parentElement.querySelector(
          ".product-title"
        ).textContent;
      var price =
        event.target.parentElement.parentElement.querySelector(
          ".product-price"
        ).textContent;
      addToCart(item, price);
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
