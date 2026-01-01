const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let total = 0;

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = titleInput.value;
  const amount = Number(amountInput.value);

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
    ${title} - ₹${amount}
    <button>❌</button>
  `;

  list.appendChild(li);

  // Update total
  total += amount;
  totalDisplay.innerText = total;

  // Delete expense
  li.querySelector("button").addEventListener("click", function() {
    list.removeChild(li);
    total -= amount;
    totalDisplay.innerText = total;
  });

  // Clear inputs
  titleInput.value = "";
  amountInput.value = "";
});