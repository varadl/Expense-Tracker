const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const paymentModeInput = document.getElementById("payment-mode");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

render();

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!titleInput.value.trim() || amountInput.value <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  const expense = {
    id: editId ?? Date.now(),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value),
    paymentMode: paymentModeInput.value,
    date: new Date().toISOString().split("T")[0]
  };

  if (editId) {
    expenses = expenses.map(x => x.id === editId ? expense : x);
    editId = null;
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

  expenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${e.title}</strong> - ₹${e.amount.toLocaleString("en-IN")}<br>
        <small>${e.paymentMode} • ${formatDate(e.date)}</small>
      </div>
      <div class="actions">
        <button class="edit" onclick="editExpense(${e.id})">✏️</button>
        <button class="delete" onclick="deleteExpense(${e.id})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  totalDisplay.innerText = total.toLocaleString("en-IN");
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save();
}

function editExpense(id) {
  const e = expenses.find(x => x.id === id);
  titleInput.value = e.title;
  amountInput.value = e.amount;
  paymentModeInput.value = e.paymentMode;
  editId = id;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
