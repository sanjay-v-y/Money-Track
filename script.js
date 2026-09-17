const expenseFormTrigger = document.querySelectorAll('.add-expense-link');
const expenseForm = document.querySelector('.expense-form');

expenseFormTrigger.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    expenseForm.style.display= 'block';
  });
});

const expenseFormClose = document.querySelector('.close-btn');
expenseFormClose.addEventListener('click', () => {
  expenseForm.style.display = 'none';
});


const form = document.getElementById('expense-form');

const tableBody = document.getElementById('expense-table-body');

const totalExpense = document.getElementById('current-total');
const currentBalance = document.getElementById('current-balance');
const totalCredit = document.getElementById('total-credit');

const totalExpenseContainer = document.querySelector('.total-expense');
const balanceContainer = document.querySelector('.balance');

function renderExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    let currentTotal = 0;
    let balance = 0;
    let credit=0;

  tableBody.innerHTML = '';

  expenses.forEach((item) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.date}</td>
      <td>₹${item.amount.toFixed(2)}</td>
      <td>${item.category}</td>
      <td>${item.paymentType}</td>
    `;
    tableBody.appendChild(row);

    currentTotal += Number(item.amount);

    if(item.paymentType === "Credit card"){
        credit += Number(item.amount);
    }
  });

  totalExpense.textContent = `₹${currentTotal.toFixed(2)}`;

  balance = 50000 - currentTotal;
  currentBalance.textContent = `₹${balance.toFixed(2)}`;

  totalCredit.textContent = `₹${credit.toFixed(2)}`;

  if (currentTotal>=50000){
    totalExpenseContainer.classList.add('total-expense-warn');
  } else{
    totalExpenseContainer.classList.remove('tototal-expense-warn');
  }

  if (balance<1000){
    balanceContainer.classList.add('balance-warn');
  } else{
    balanceContainer.classList.remove('balance-warn');
  }

}

const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const paymentTypeInput = document.getElementById('payment_type');

form.addEventListener('submit', (e) => {
  e.preventDefault();
    
  const expenseData = {
    date: dateInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    paymentType: paymentTypeInput.value
  };

  const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  storedExpenses.push(expenseData);
  localStorage.setItem('expenses', JSON.stringify(storedExpenses));

  form.reset();

  renderExpenses();

});

renderExpenses();

