const donationForm = document.getElementById("donation-form");
const amount = document.getElementById("amount");
const donatorEmail = document.getElementById("donator-email");
const nameOnCard = document.getElementById("name-on-card");
const expMonth = document.getElementById("expmonth");
const cardNumber = document.getElementById("card-number");
const expYear = document.getElementById("exp-year");
const cvv = document.getElementById("cvv");

donationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateDonationForm();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector("#error");
    errorDisplay.style.color = "red";
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector("#error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateDonationForm = () => {
    const amountValue = amount.value;
    const emailValue = donatorEmail.value;
    const cardNameValue = nameOnCard.value;
    const monthValue = expMonth.value;
    const cardNumberValue = cardNumber.value;
    const yearValue = expYear.value;
    const cvvValue = cvv.value;

    if (amountValue === "") {
        setError(amount, "Name is required");
        return false;
    } else {
        setSuccess(amount);
    }

    if (emailValue === "") {
        setError(donatorEmail, "Email is required");
        return false;
    } else if (!isValidEmail(emailValue)) {
        setError(donatorEmail, "Provide a valid email address");
        return false;
    } else {
        setSuccess(donatorEmail);
    }

    if (cardNameValue === "") {
        setError(nameOnCard, "Address is required");
        return false;
    } else {
        setSuccess(nameOnCard);
    }

    if (monthValue === "") {
        setError(expMonth, "Subject is required");
        return false;
    } else {
        setSuccess(expMonth);
    }

    if (cardNumberValue == "") {
        setError(cardNumber, "Statement is required");
        return false;
    } else {
        setSuccess(cardNumber);
    }
    if (yearValue == "") {
        setError(expYear, "Statement is required");
        return false;
    } else {
        setSuccess(expYear);
    }
    if (cvvValue == "") {
        setError(cvv, "Statement is required");
        return false;
    } else {
        setSuccess(cvv);
    }

    alert("Succesfully Completed Donation \n Thank you for your Donation");
    amount.value = "";
    donatorEmail.value = "";
    nameOnCard.value = "";
    expMonth.value = "";
    cardNumber.value = "";
    expYear.value = "";
    cvv.value = "";
};
