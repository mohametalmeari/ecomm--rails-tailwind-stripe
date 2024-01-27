import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      return;
    }

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.classList.add("mt-2");
      div.innerHTML = `Item:  ${item.name} - $${item.price / 100.0} - Size: ${
        item.size
      } - Quantity: ${item.quantity}`;
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Remove";
      deleteButton.value = item.id;
      deleteButton.classList.add(
        "bg-gray-500",
        "rounded",
        "text-white",
        "px-2",
        "py-1",
        "ml-2"
      );
      deleteButton.addEventListener("click", this.removeFromCart);
      div.appendChild(deleteButton);
      this.element.prepend(div); // prepend adds the div to the top of the list
    }

    const totalEl = document.createElement("div");
    totalEl.innerHTML = `Total: $${total / 100.0}`;
    let totalContainer = document.getElementById("total");
    totalContainer.appendChild(totalEl);
  }

  clear() {
    localStorage.removeItem("cart");
    window.location.reload();
  }

  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const id = parseInt(event.target.value);
    const index = cart.findIndex((item) => item.id === id);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  }
}
