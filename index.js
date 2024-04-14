
// input validation
document.addEventListener('DOMContentLoaded', function () {
    const numberInputs = document.querySelectorAll('.numberInput');

    numberInputs.forEach(function (input) {
        const errorIcon = input.nextElementSibling;

        input.addEventListener('input', function () {
            if (this.value && !/^\d+$/.test(this.value)) {
                errorIcon.classList.add('visible');
            } else {
                errorIcon.classList.remove('visible');
            }
        });

        //Add text on hover on the icon
        errorIcon.setAttribute('title', 'Please enter numbers only.');
    });
});

function calculateTax() {
    // Tax calculation logic

    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const ageGroup = document.getElementById('age').value;
    var tax = 0;

    // Calculate the total income after deductions
    const totalIncome = grossIncome + extraIncome - deductions;

    // Determine the tax rate based on age group
    let taxRate = 0;
    if (ageGroup === '<40') {
        taxRate = 0.30; // 30% tax rate for age < 40
    } else if (ageGroup === '40-59') {
        taxRate = 0.40; // 40% tax rate for age ≥ 40 and < 60
    } else if (ageGroup === '≥60') {
        taxRate = 0.10; // 10% tax rate for age ≥ 60
    }

    // Calculate the tax if the total income is over 8 lakhs
    if (totalIncome > 800000) {
        tax = (totalIncome - 800000) * taxRate;
    }
    const totalIncomeAfterTaxDeduction = totalIncome - tax;
    return totalIncomeAfterTaxDeduction;

}



document.getElementById('taxForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-icon').forEach(function (icon) {
        icon.classList.remove('visible');
    });

    const grossIncome = document.getElementById('grossIncome').value;
    const extraIncome = document.getElementById('extraIncome').value;
    const deductions = document.getElementById('deductions').value;
    const age = document.getElementById('age').value;

    let hasError = false;

    //Validate Gross Income
    if (isNaN(grossIncome) || grossIncome === '') {
        document.getElementById('grossIncomeError').classList.add('visible');
        hasError = true;
    }

    // Validate Extra Income
    if (isNaN(extraIncome) || extraIncome === '') {
        document.getElementById('extraIncomeError').classList.add('visible');
        hasError = true;
    }

    // Validate Deductions
    if (isNaN(deductions) || deductions === '') {
        document.getElementById('deductionsError').classList.add('visible');
        hasError = true;
    }

    // Validate Age
    if (age === '') {
        document.getElementById('ageError').classList.add('visible');
        hasError = true;
    }

    ///If no errors, proceed with tax calculation
    if (!hasError) {
        let totalIncomeAfterDeduction = calculateTax();
        document.getElementById('resultText').innerText = totalIncomeAfterDeduction.toFixed(2);
        document.getElementById('myModal').style.display = 'block';

    }

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
        modal.style.display = 'none';
        location.reload();
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

