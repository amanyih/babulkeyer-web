// window.onscroll = function () {
//     myFunction();
// };

// // Get the navbar
// var navbar = document.getElementsByTagName("header");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky");
//     } else {
//         navbar.classList.remove("sticky");
//     }
// }
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const statement = document.getElementById("statement");

const donationForm = document.getElementById("donation-form");
const amount = document.getElementById("amount");
const donatorEmail = document.getElementById("donator-email");
const nameOnCard = document.getElementById("name-on-card");
const expMonth = document.getElementById("expmonth");
const cardNumber = document.getElementById("card-number");
const expYear = document.getElementById("exp-year");
const cvv = document.getElementById("cvv");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateContactForm();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateContactForm = () => {
    console.log("called by form");
    const nameValue = nameInput.value.trim();
    const addressValue = address.value.trim();
    const emailValue = email.value.trim();
    const statementValue = statement.value.trim();
    const subjectValue = subject.value.trim();

    if (nameValue === "") {
        setError(nameInput, "Name is required");
        return false;
    } else {
        setSuccess(nameInput);
    }

    if (emailValue === "") {
        setError(email, "Email is required");
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
        return false;
    } else {
        setSuccess(email);
    }

    if (addressValue === "") {
        setError(address, "Address is required");
        return false;
    } else {
        setSuccess(address);
    }

    if (subjectValue === "") {
        setError(subject, "Subject is required");
        return false;
    } else {
        setSuccess(subject);
    }

    if (statementValue == "") {
        setError(subject, "Statement is required");
        return false;
    } else {
        setSuccess(statement);
    }

    alert("Email successfully sent!");
    nameInput.value = "";
    address.value = "";
    email.value = "";
    subject.value = "";
    statement.value = "";
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

function handleMenu(e) {
    console.log("hellos");
    const header = document.getElementsByTagName("header")[0];
    const menu = document.getElementById("menu");
    const close = document.getElementById("close");

    if (header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        menu.style.display = "block";
        close.style.display = "none";
    } else {
        header.classList.add("nav-open");
        close.style.display = "block";
        close.style.backgroundColor = "black";
        menu.style.display = "none";
    }
}
