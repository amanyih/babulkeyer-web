const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const statement = document.getElementById("statement");

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
