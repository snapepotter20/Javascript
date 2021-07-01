// Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateresults, 2000);
   e.preventDefault();
});

// Calculate Results
function calculateresults(){
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlypayment = document.getElementById('monthly-payment');
  const totalpayment = document.getElementById('total-payment');
  const totalinterest = document.getElementById('total-interest');
   
  const principal = parseFloat(amount.value);
  const calculatedinterest = parseFloat(interest.value) / 100 / 12;
  const calculatedpayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1+ calculatedinterest, calculatedpayments);
  const monthly = (principal*x*calculatedinterest)/(x-1);

   // To check if monthly value is a finte number or not
   if(isFinite(monthly)){
     monthlypayment.value = monthly.toFixed(2);
     totalpayment.value = (monthly * calculatedpayments).toFixed(2);
     totalinterest.value = ((monthly * calculatedpayments)-principal).toFixed(2);
     // Show results
     document.getElementById('results').style.display = 'block';

     // Hide loading
     document.getElementById('loading').style.display = 'none';

   } else {
      showerror('Please check your numbers');
   }

  // e.preventDefault();
}
 
// Show error
function showerror(error){
    // Hide results
       document.getElementById('results').style.display = 'none';

    // Hide loading
       document.getElementById('loading').style.display = 'none';
    // Create a div
     const errordiv = document.createElement('div');

    // Get elements
     const card = document.querySelector('.card');
     const heading = document.querySelector('.heading');

    // Add class
    errordiv.className = 'alert alert-danger';

    // Create text node and append to div
    errordiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errordiv,heading);

    // Clear error after 3 seconds
    setTimeout(clearerror, 3000);
}

// Clear error
 function clearerror(){
   document.querySelector('.alert').remove();
 }