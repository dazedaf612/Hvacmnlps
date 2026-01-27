document.addEventListener('DOMContentLoaded', function() {
    // Financing Calculator Elements
    const costSlider = document.getElementById('project-cost');
    const costDisplay = document.getElementById('cost-display');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment');
    
    // Admin Tool Elements
    const dealerFeeInput = document.getElementById('dealer-fee');
    const netTakeHomeDisplay = document.getElementById('net-take-home');
    
    // Constants
    const APR = 8.99;
    const MONTHS = 120; // 10 years is common for lower payments/HVAC financing to make it look attractive
    
    function calculateLoan() {
        const principal = parseFloat(costSlider.value);
        
        // Update Project Cost Display
        costDisplay.textContent = `$${principal.toLocaleString()}`;
        
        // Calculate Monthly Payment
        // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        // i = monthly interest rate (APR / 100 / 12)
        // n = number of months
        
        const monthlyRate = (APR / 100) / 12;
        
        // Handle 0 interest or standard calculation
        let monthlyPayment = 0;
        if (monthlyRate === 0) {
            monthlyPayment = principal / MONTHS;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, MONTHS)) / (Math.pow(1 + monthlyRate, MONTHS) - 1);
        }
        
        monthlyPaymentDisplay.textContent = `$${monthlyPayment.toFixed(2)}`;
        
        calculateAdmin();
    }
    
    function calculateAdmin() {
        const principal = parseFloat(costSlider.value);
        const dealerFeePercent = parseFloat(dealerFeeInput.value) || 0;
        
        const dealerFeeAmount = principal * (dealerFeePercent / 100);
        const netTakeHome = principal - dealerFeeAmount;
        
        if (netTakeHomeDisplay) {
            netTakeHomeDisplay.textContent = `$${netTakeHome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }
    }
    
    // Event Listeners
    if (costSlider) {
        costSlider.addEventListener('input', calculateLoan);
        // Initialize
        calculateLoan();
    }
    
    if (dealerFeeInput) {
        dealerFeeInput.addEventListener('input', calculateAdmin);
    }
});

function showForm(formId) {
    // Hide all forms
    document.querySelectorAll('.form-container form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form
    document.getElementById(formId).classList.add('active');
    
    // Activate corresponding tab
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
        (formId === 'contact-form' && btn.textContent.includes('Inquiry')) || 
        (formId === 'booking-form' && btn.textContent.includes('Book'))
    );
    if (activeBtn) activeBtn.classList.add('active');
}
