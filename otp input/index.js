const form = document.querySelector("#otp-form");
const inputs = document.querySelectorAll(".otp-input");
const verifyBtn = document.querySelector("#verify-btn");

const isAllInputFilled = () => {
    return Array.from(inputs).every((item) => item.value);
};

const getOtpText = () => {
    let text = "";
    inputs.forEach((input) => {
        text += input.value;
    });
    return text;
};

const verifyOTP = () => {
    if (isAllInputFilled()) {
        const text = getOtpText();
        alert('your OTP is "${text}".OTP si correct');
    }
};

const toggleFilledClass = (field) => {
    if (field.value) {
        field.classList.add("filled");
    } else {
        field.classList.remove("filled");
    }
};

form.addEventListener("input",(e) => {
    const target = e.target;
    const value = target.value;
    console.log({target,value});
    toggleFilledClass(target);
    if(target.nextElementSibling) {
        target.nextElementSibling.focus();
    }
    verifyOTP();
});

inputs.forEach((input,currentIndex) => {
    // Fill check
    toggleFilledClass(input);
    // paste event
    input.addEventListener("paste", (e) => {
        e.preventDefault();
        const text = e.clipboardData("text");
        console.log(text);
        inputs.forEach((item,index) => {
            if (index >= currentIndex && text[index - currentindex]) {
                item.focus();
                item.value = text[index -currentIndex] || "";
                toggleFilledClass(item);
                verifyOTP();
            }
        });
    });
    
    // backspace event
    input.addEventListener("keydown",(e) => {
        if (e.keycode === 8) {
            e.preventDefault();
            input.value = "";
            // console.log(input.value);
            toggleFilledClass(input);
            if (input.previousElementSibling) {
                input.previousElementSibling.focus();
            }
        } else {
            if (input.value && input.nextElementSibling) {
                input.nextElementSibling.focus()
            }
        }
    });
});

verifyBtn.addEventListener("click" , () => {
    verifyOTP();
});