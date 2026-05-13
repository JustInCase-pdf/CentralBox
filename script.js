let cartItems = [];

function addItem(item) {
  cartItems.push(item);
  alert(item + " added to cart!");
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function payNow() {
  alert("Payment successful! 🎉");
  localStorage.removeItem("cart");
  document.getElementById("cart").innerHTML = "";
}

window.onload = function() {
  if (document.getElementById("cart")) {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart").innerHTML = savedCart.map(i => `<li>${i}</li>`).join("");
  }
};
