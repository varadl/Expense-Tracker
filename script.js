const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
// const categoryInput = document.getElementById("category");
const paymentModeInput = document.getElementById("payment-mode");
const dateInput = document.getElementById("expense-date");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const container = document.querySelector(".container");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;
let chart;

// auto set today
date: new Date().toISOString().split("T")[0]



render();

form.addEventListener("submit", e => {
  e.preventDefault();

  const expense = {
    id: editId ?? Date.now(),
    title: titleInput.value,
    amount: Number(amountInput.value),
    // category: categoryInput.value,
    paymentMode: paymentModeInput.value,
    date: dateInput.value
  };

  if (editId) {
    expenses = expenses.map(e => e.id === editId ? expense : e);
    editId = null;
  } else {
    expenses.push(expense);
  }

  save();
  form.reset();
  dateInput.value = new Date().toISOString().split("T")[0];
});

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  list.innerHTML = "";
  let total = 0;

  if (expenses.length > 0) {
    container.classList.add("expanded");
  } else {
    container.classList.remove("expanded");
  }

  expenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${e.title}</strong> - ₹${e.amount}<br>
        <span> ${e.paymentMode} | ${formatDate(e.date)}</span>
      </div>
      <div class="actions">
        <button class="edit" onclick="editExpense(${e.id})">✏️</button>
        <button class="delete" onclick="deleteExpense(${e.id})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  totalDisplay.innerText = total;
  updateChart();
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save();
}

function editExpense(id) {
  const e = expenses.find(x => x.id === id);
  titleInput.value = e.title;
  amountInput.value = e.amount;
  // categoryInput.value = e.category;
  paymentModeInput.value = e.paymentMode;
  dateInput.value = e.date;
  editId = id;
}

function updateChart() {
  if (expenses.length === 0) return;

  const data = {};
  expenses.forEach(e => {
    data[e.category] = (data[e.category] || 0) + e.amount;
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("expenseChart"), {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4caf50",
          "#9c27b0"
        ]
      }]
    }
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
