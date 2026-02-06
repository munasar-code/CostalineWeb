const form = document.getElementById("contact-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const feedback = document.getElementById("form-feedback");


const phoneFeedback = document.getElementById("phone-feedback");
const phoneCounter = document.getElementById("phone-counter");
const messageFeedback = document.getElementById("message-feedback");
const messageCounter = document.getElementById("message-counter");


function validateText(input) {
    if (input.value.trim() === "") {
        input.classList.add("invalid");
        input.classList.remove("valid");
        return false;
    }
    input.classList.add("valid");
    input.classList.remove("invalid");
    return true;
}


function validateEmail() {
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email === "") {
        emailInput.classList.remove("valid", "invalid");
        return false;
    }

    if (!pattern.test(email)) {
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        return false;
    }

    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
    return true;
}


function validatePhone() {
    let phone = phoneInput.value.replace(/\D/g, ""); // remove letters
    phoneInput.value = phone.slice(0, 10); // max 10 digits


    phoneCounter.textContent = `${phone.length}/10 digits`;

    if (phone.length === 0) {
        phoneInput.classList.remove("valid", "invalid");
        phoneFeedback.textContent = "";
        return false;
    }

    if (phone.length < 7) {
        phoneInput.classList.add("invalid");
        phoneInput.classList.remove("valid");
        phoneFeedback.textContent = "Enter at least 7 digits";
        phoneFeedback.style.color = "red";
        return false;
    }

    phoneInput.classList.add("valid");
    phoneInput.classList.remove("invalid");
    phoneFeedback.textContent = "";
    return true;
}


function validateMessage() {
    let msg = messageInput.value;
    msg = msg.slice(0, 100); // max 100 characters
    messageInput.value = msg;

 
    messageCounter.textContent = `${msg.length}/100 characters`;

    if (msg.trim().length < 10) {
        messageInput.classList.add("invalid");
        messageInput.classList.remove("valid");
        messageFeedback.textContent = "Message must be at least 10 characters";
        messageFeedback.style.color = "red";
        return false;
    }

    messageInput.classList.add("valid");
    messageInput.classList.remove("invalid");
    messageFeedback.textContent = "";
    return true;
}


firstName.addEventListener("input", () => validateText(firstName));
lastName.addEventListener("input", () => validateText(lastName));
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
messageInput.addEventListener("input", validateMessage);


phoneInput.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isFirstValid = validateText(firstName);
    const isLastValid = validateText(lastName);
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (isFirstValid && isLastValid && isEmailValid && isPhoneValid && isMessageValid) {
        feedback.textContent = "✅ Form submitted successfully!";
        feedback.style.color = "green";


        form.reset();
        document.querySelectorAll("input, textarea").forEach(el => {
            el.classList.remove("valid", "invalid");
        });

        phoneCounter.textContent = "0/10 digits";
        messageCounter.textContent = "0/100 characters";
        phoneFeedback.textContent = "";
        messageFeedback.textContent = "";
    } else {
        feedback.textContent = "❌ Please fix the errors above.";
        feedback.style.color = "red";
    }
});
