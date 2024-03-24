// Define an array to store items in the cart
var cart = [];

// Function to add an item to the cart
function addToCart(item, price) {
  cart.push({ item: item, price: price });
}

// Function to update the cart modal content
function updateCartModal() {
  var cartContent = document.getElementById("cartContent");

  // Clear previous content
  cartContent.innerHTML = "";

  // Create list elements for each item in the cart
  cart.forEach(function (cartItem) {
    var listItem = document.createElement("li");
    listItem.textContent = cartItem.item + " - " + cartItem.price;
    cartContent.appendChild(listItem);
  });
}

// Function to close the cart modal
function closeCartModal() {
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
}

// Function to open the cart modal
function openCartModal() {
  updateCartModal();
  var cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";
}

// Function to initialize the script after the page loads
window.onload = function () {
  // Attach event listener to the "Košík" button to open the cart modal
  var cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", openCartModal);

  // Attach event listener to the "Checkout" button to perform checkout action
  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", function () {
    // Add your checkout functionality here
    // For now, let's just close the cart modal
    closeCartModal();
  });

  // Get all "Add to Cart" buttons and attach event listener to each
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

//
//
//
//
//
//
//
//
