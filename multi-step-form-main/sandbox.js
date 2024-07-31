const pages = document.querySelectorAll(".pages");
const nextBtns = document.querySelectorAll("button");
const prevBtns = document.querySelectorAll(".go-back");
const inputs = document.querySelectorAll("form input");
const errors = document.querySelectorAll(".error");
const indicators = document.querySelectorAll(".indicator");
const planCards = document.querySelectorAll(".plan-card");
const toggle = document.querySelector("#checkbox");
const addOn = document.querySelectorAll(".select-box");
const planRate = document.querySelector('.plan-rate');
const selectCons = document.querySelectorAll(".select-con");
const totalAmountSpan = document.querySelector(".total-amount");
const planRecheck = document.querySelector('.plan-recheck');
const planPeriod = document.querySelector('.plan-period');
const planAmountPeriod = document.querySelector('.plan-amount-period');
const totalPeriod = document.querySelector('.total-period');

let currentPage = 0;
let currentCircle = 1;

let isPlanSelected = false;
let isOptionSelected = false;

let planAmount = 0;
let optionAmounts = [0, 0, 0]



nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener('click', () => {
        if ((currentPage === 1 && !isPlanSelected) || (currentPage === 2 && !isOptionSelected)) {
            alert("Please select a plan before proceeding to the next page.");
            return;
        }
     ValidateInput()
        nextPage();
    });
});

prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener('click', () => {
        currentPage--;
        nextPage();
        currentCircle--;
        togglecircle(currentCircle);
    });
});

function ValidateInput() {
    let isValid = true;

    inputs.forEach((input, index) => {
        if (input.value === '') {
            errors[index].style.display = 'block';
            isValid = false;
        } else {
            errors[index].style.display = 'none';
        }
    });


    if (isValid) {
        currentPage++;
        currentCircle++;
        nextPage();
        togglecircle(currentCircle);
    }
}


function nextPage() {
    pages.forEach((page) => {
        page.classList.contains('active');
        page.classList.remove('active');
    });
    pages[currentPage].classList.add('active');
}

function togglecircle(element) {
    indicators.forEach((indicator, index) => {
        if (index == element - 1) {
            indicator.classList.add('display');
        } else {
            indicator.classList.remove('display');
        }
    });

}


// Select a plan
planCards.forEach((planCard, index) => {
    planCard.addEventListener("click", function () {
        planCards.forEach(planCard => {
            planCard.style.border = '1px solid hsl(231, 11%, 63%)';
        });
        planCard.style.border = '1px solid hsl(243, 100%, 62%)';
        isPlanSelected = true;

        if (index === 0) {
            planAmount = 9;
            planRate.innerHTML = '9';
            planRecheck.innerHTML = 'Arcade';
        } else if (index === 1) {
            planAmount = 12;
            // planRate.innerHTML = '12';
            planRecheck.innerHTML = 'Advanced';
        } else if (index === 2) {
            planAmount = 15;
            // planRate.innerHTML = '15';
            planRecheck.innerHTML = 'Pro';
        }
        
        planRate.innerHTML = toggle.checked ? planAmount *= 10 : planAmount;
        planPeriod.innerHTML = toggle.checked ? '(Yearly)' : '(Monthly)';
        planAmountPeriod.innerHTML = toggle.checked ? 'yr' : 'mo';

        updateTotalAmount(); // Update the total amount
    });
});


const onlineUpdate = document.querySelector('.online-update');
const storageUpdate = document.querySelector('.storage-update');
const profileUpdate = document.querySelector('.profile-update');


toggle.addEventListener('change', () => {
    planAmount = parseInt(planRate.innerHTML);

    if (toggle.checked) {
        planAmount *= 10;
        onlineUpdate.innerHTML = '10';
        storageUpdate.innerHTML = '20';
        profileUpdate.innerHTML = '20';
        document.querySelector('.plan-period').innerHTML = '(Yearly)';
        yearlyPeriods();
        // updateYearly();
    } else {
        planAmount /= 10;
        onlineUpdate.innerHTML = '1';
        storageUpdate.innerHTML = '2';
        profileUpdate.innerHTML = '2';
        document.querySelector('.plan-period').innerHTML = '(Monthly)';
        monthlyPeriods();
        // updateMonthly();
    }
    planRate.innerHTML = planAmount;
    updateTotalAmount();
});


// Update the display to monthly
function monthlyPeriods() {
    document.querySelectorAll(".online-period, .storage-period, .profile-period, .profile-update-period, .plan-amount-period, .online-update-period, .storage-update-period, .profile-update-period, .total-update-period").forEach(monthlyPeriod => {
        monthlyPeriod.innerHTML = 'mo';
    });
    document.querySelector('.total-period').innerHTML = '(per month)';
    updateAmounts(1 / 10);
}

// Update the display to yearly
function yearlyPeriods() {
    document.querySelectorAll(".online-period, .storage-period, .profile-period, .profile-update-period, .plan-amount-period, .online-update-period, .storage-update-period, .profile-update-period, .total-update-period").forEach(yearlyPeriod => {
        yearlyPeriod.innerHTML = 'yr';
    });
    document.querySelector('.total-period').innerHTML = '(per year)';
    updateAmounts(10);
}


// Update add-on amounts based on the selected period
function updateAmounts(multiplier) {
    optionAmounts = optionAmounts.map(amount => amount * multiplier);
    document.querySelectorAll(".online-amount, .storage-amount, .profile-amount").forEach((element, index) => {
        element.innerHTML = parseInt(element.innerHTML) * multiplier;
    });
}

// function updateYearly() {
//     document.querySelectorAll(".online-update, .storage-update, .profile-update, .online-amount, .storage-amount, .profile-amount").forEach(updateYear => {
//         updateYear.innerHTML = parseInt(updateYear.innerHTML) * 10;
//     });
//     planAmount *= 10; // Adjust the plan amount if toggled
//     optionAmounts = optionAmounts.map(amount => amount * 10); // Adjust all option amounts if toggled
//     updateTotalAmount(); // Update the total amount
// }

// function updateMonthly() {
//     document.querySelectorAll(".online-update, .storage-update, .profile-update, .online-amount, .storage-amount, .profile-amount").forEach(updateYear => {
//         updateYear.innerHTML = parseInt(updateYear.innerHTML) / 10;
//     });
//     planAmount /= 10; // Adjust the plan amount if toggled back
//     optionAmounts = optionAmounts.map(amount => amount / 10); // Adjust all option amounts if toggled back
//     updateTotalAmount(); // Update the total amount
// }


document.querySelectorAll(".invisible-text").forEach(hidden => {
    document.querySelectorAll(".plan-yearly").forEach(yearlyText => {
        document.querySelectorAll(".plan-monthly").forEach(monthlyText => {
            toggle.addEventListener('change', function () {
                if ((toggle).checked) {
                    hidden.style.display = 'block';
                    yearlyText.style.display = 'block';
                    monthlyText.style.display = 'none';
                } else {
                    hidden.style.display = 'none';
                    yearlyText.style.display = 'none';
                    monthlyText.style.display = 'block';
                }
            });
        });
    });
});




function toggleDiv(index) {
    const divs = document.querySelectorAll('.select-con');
    const checkboxes = document.querySelectorAll('.select-con input[type = "checkbox"]');
    const displaySelect = document.querySelectorAll(".onclick-online, .onclick-storage, .onclick-profile");

    divs[index].classList.toggle('clicked');
    checkboxes[index].checked = !checkboxes[index].checked;
    displaySelect[index].classList.toggle('show-active');

    isOptionSelected = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (checkboxes[index].checked) {
        if (index === 0) {
            optionAmounts[index] = toggle.checked ? 10 : 1;
        } else if (index === 1) {
            optionAmounts[index] = toggle.checked ? 20 : 2;
        } else if (index === 2) {
            optionAmounts[index] = toggle.checked ? 20 : 2;
        }
    } else {
        optionAmounts[index] = 0;
    }

    updateTotalAmount(); // Update the total amount
}
// }
function updateTotalAmount() {
    let totalAmount = planAmount + optionAmounts.reduce((acc, amount) => acc + amount, 0);
    totalAmountSpan.innerHTML = totalAmount;
}







































