document.addEventListener("DOMContentLoaded", () => {
  // Array of quotes for the intro page
  const quotes = [
      "“Wealth is what you don't see.” – *The Psychology of Money*",
      "“The hardest financial skill is getting the goalpost to stop moving.”",
      "“Saving is the gap between your ego and your income.”",
      "“Do not save what is left after spending, but spend what is left after saving.”",
      "“You will change your life by changing your spending habits.”"
  ];

  // Randomly select a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = randomQuote;

  const enterButton = document.getElementById("enter-site");
  enterButton.addEventListener("click", () => {
      document.getElementById("intro-page").style.display = "none";
      document.getElementById("main-content").classList.remove("hidden");
  });

  // Initial empty expense data
  const expenseData = [];

  // Populate expense list
  const expenseList = document.getElementById("expense-list");

  // Add expense to the list and chart
  const addExpenseButton = document.getElementById("add-expense");
  addExpenseButton.addEventListener("click", () => {
      const amount = parseFloat(document.getElementById("amount").value);
      const category = document.getElementById("category").value;

      if (amount && category) {
          expenseData.push({ category, amount });
          updateExpenseList();
          updateChart();
      }
  });

  // Update the expense list on the UI
  function updateExpenseList() {
      expenseList.innerHTML = '';
      expenseData.forEach(item => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `${item.category}: ₹${item.amount}`;
          expenseList.appendChild(listItem);
      });
  }

  // Initialize chart variable to ensure it is created only once
  let expenseChart;

  // Update the bar chart with current expenses
  function updateChart() {
      const categories = expenseData.map(item => item.category);
      const amounts = expenseData.map(item => item.amount);

      // Only render the chart when an expense is added
      if (!expenseChart) {
          const ctx = document.getElementById('expense-chart').getContext('2d');
          expenseChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: categories,
                  datasets: [{
                      label: 'Expenses by Category',
                      data: amounts,
                      backgroundColor: '#45a29e',
                      borderColor: '#1f2833',
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              color: '#c5c6c7'
                          }
                      },
                      x: {
                          ticks: {
                              color: '#c5c6c7'
                          }
                      }
                  },
                  plugins: {
                      legend: {
                          labels: {
                              color: '#c5c6c7'
                          }
                      }
                  }
              }
          });
      } else {
          // If chart exists, just update the data
          expenseChart.data.labels = categories;
          expenseChart.data.datasets[0].data = amounts;
          expenseChart.update();
      }
  }

  // Hide chart initially
  const chartSection = document.querySelector('.chart-section');
  chartSection.style.display = 'none';

  // Only show the chart section when an expense is added
  function showChartSection() {
      chartSection.style.display = 'block';
  }

  // Update chart and show it after adding an expense
  function updateAndShowChart() {
      updateChart();
      showChartSection();
  }

  // Initialize chart on the first run, then show it when an expense is added
  updateAndShowChart();
});
