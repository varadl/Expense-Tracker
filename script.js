const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const paymentModeInput = document.getElementById("payment-mode");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const submitBtn = document.getElementById("submit-btn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

render();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation
  if (titleInput.value.trim() === "" || amountInput.value <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  const expense = {
    id: editId ?? Date.now(),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value),
    paymentMode: paymentModeInput.value
  };

  if (editId) {
    expenses = expenses.map(e => e.id === editId ? expense : e);
    editId = null;
    submitBtn.innerText = "Save Expense";
  } else {
    expenses.push(expense);
  }

  save();
  form.reset();
});

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  list.innerHTML = "";
  let total = 0;

  if (expenses.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  expenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${e.title} - ₹${e.amount} (${e.paymentMode})</span>
      <div class="actions">
        <button class="edit" onclick="editExpense(${e.id})">✏️</button>
        <button class="delete" onclick="deleteExpense(${e.id})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  totalDisplay.innerText = total;
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save();
}

function editExpense(id) {
  const e = expenses.find(exp => exp.id === id);

  titleInput.value = e.title;
  amountInput.value = e.amount;
  paymentModeInput.value = e.paymentMode;

  editId = id;
  submitBtn.innerText = "Update Expense";
}
