const COLORS = {
    blue_primary: "#0073b7",
    blue_secondary: "#006dad",
    blue_tertiary: "#0067a3",
    blue_quaternary: "#003d61",

    white_primary: "#fdfdfd",
    white_secondary: "#ececec",
    white_tertiary: "#d3d3d3",

    gray_primary: "#ccc",
    gray_secondary: "#606060",

    red_primary: "#d9534f",

    green_primary: "#5cb85c",
}


window.addEventListener('scroll', function () {
    const img = document.getElementById("header-logo-img")
    if (window.pageYOffset > 0) {
        img.style.height = "40px"
    } else {
        img.style.height = "initial"
    }
});

try {
    const passwordShowImg = document.getElementById("password-show");
    passwordShowImg.addEventListener("click", function () {
        const passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordShowImg.src = "/static/media/icon/pass-hide.webp";
        } else {
            passwordInput.type = "password";
            passwordShowImg.src = "/static/media/icon/pass-show.webp";

        }
    });
} catch (e) {
}

try {
    let isPasswordValid = undefined

    const passwordValidation = {
        "length": false,
        "uppercase": false,
        "lowercase": false,
        "number": false,
        "special": false
    }

    const validator = document.getElementById("password-validator");
    const passwordField = document.getElementById("password");

    passwordField.addEventListener("focus", () => {
        validator.hidden = false;

        passwordField.style.border = "none"
        if (passwordField.value.length === 0) {
            passwordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
        } else {
            if (passwordField.value.length !== 0 && isPasswordValid) {
                passwordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
            } else {
                passwordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
            }
        }
    })

    passwordField.addEventListener('input', () => {
        const validatorLength = document.getElementById("password-validator-length");
        const validatorUppercase = document.getElementById("password-validator-uppercase");
        const validatorLowercase = document.getElementById("password-validator-lowercase");
        const validatorNumber = document.getElementById("password-validator-number");
        const validatorSpecialChar = document.getElementById("password-validator-special-char");

        if (passwordField.value.length === 0) {
            const validatorItems = [
                validatorLength,
                validatorUppercase,
                validatorLowercase,
                validatorNumber,
                validatorSpecialChar];

            validatorItems.forEach(item => {
                item.style.color = COLORS.gray_secondary;
            });
            passwordField.style.boxShadow = "none";
            passwordField.style.border = `1px solid ${COLORS.white_tertiary}`

        } else {

            if (passwordField.value.length < 8) {
                validatorLength.style.color = COLORS.red_primary;
                passwordValidation.length = false;
            } else {
                validatorLength.style.color = COLORS.green_primary;
                passwordValidation.length = true;
            }

            const passwordUppercase = passwordField.value.match(/[A-Z]/g);
            if (passwordUppercase == null) {
                validatorUppercase.style.color = COLORS.red_primary;
                passwordValidation.uppercase = false;
            } else {
                validatorUppercase.style.color = COLORS.green_primary;
                passwordValidation.uppercase = true;
            }

            const passwordLowercase = passwordField.value.match(/[a-z]/g);
            if (passwordLowercase == null) {
                validatorLowercase.style.color = COLORS.red_primary;
                passwordValidation.lowercase = false;
            } else {
                validatorLowercase.style.color = COLORS.green_primary;
                passwordValidation.lowercase = true;
            }

            const passwordNumber = passwordField.value.match(/[0-9]/g);
            if (passwordNumber == null) {
                validatorNumber.style.color = COLORS.red_primary;
                passwordValidation.number = false;
            } else {
                validatorNumber.style.color = COLORS.green_primary;
                passwordValidation.number = true;
            }

            const passwordSpecialChar = passwordField.value.match(/[^a-zA-Z0-9]/g);
            if (passwordSpecialChar == null) {
                validatorSpecialChar.style.color = COLORS.red_primary;
                passwordValidation.special = false;
            } else {
                validatorSpecialChar.style.color = COLORS.green_primary;
                passwordValidation.special = true;
            }

            let test = Object.values(passwordValidation).every(item => item)
            if (test) {
                isPasswordValid = true;
                passwordField.style.border = "none";
                passwordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
            } else {
                isPasswordValid = false;
                passwordField.style.border = "none";
                passwordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
            }

            if (isPasswordValid) {
                enablePasswordConfirmInput();
            } else {
                disablePasswordConfirmInput();
            }

        }

    })

    passwordField.addEventListener("focusout", () => {
        validator.hidden = true;
        let test = Object.values(passwordValidation).every(item => item)

        if (passwordField.value.length === 0) {
            Object.keys(passwordValidation).forEach(item => passwordValidation[item] = false);
            passwordField.style.boxShadow = "none";
            passwordField.style.border = `1px solid ${COLORS.white_tertiary}`
        } else if (passwordField.value.length !== 0 && test) {
            passwordField.style.boxShadow = "none";
            passwordField.style.border = `1px solid ${COLORS.white_tertiary}`;
        } else {
            passwordField.style.border = "none";
            passwordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
        }

    })

    let isPasswordConfirmed = undefined;
    const confirmPasswordField = document.getElementById("password-confirm");

    confirmPasswordField.addEventListener("focus", () => {
        if (isPasswordConfirmed == null) {
            confirmPasswordField.style.border = "none"
            confirmPasswordField.style.boxShadow = `0 0  3px ${COLORS.blue_primary}`
        } else {
            if (isPasswordConfirmed) {
                confirmPasswordField.style.border = "none";
                confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
            } else {
                confirmPasswordField.style.border = "none";
                confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
            }
        }
    })

    confirmPasswordField.addEventListener("input", () => {
        const passwordField = document.getElementById("password");
        if (confirmPasswordField.value.length === 0) {
            isPasswordConfirmed = undefined
            confirmPasswordField.style.border = "none";
            confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
        } else {
            if (confirmPasswordField.value === passwordField.value) {
                isPasswordConfirmed = true;
                confirmPasswordField.style.border = "none";
                confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.blue_primary}`
            } else {
                isPasswordConfirmed = false;
                confirmPasswordField.style.border = "none";
                confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
            }
        }
    })

    confirmPasswordField.addEventListener("focusout", () => {
        if (isPasswordConfirmed == null) {
            confirmPasswordField.style.border = `1px solid ${COLORS.white_tertiary}`
            confirmPasswordField.style.boxShadow = "none";
        } else {
            if (isPasswordConfirmed) {
                confirmPasswordField.style.border = `1px solid ${COLORS.white_tertiary}`
                confirmPasswordField.style.boxShadow = "none";
            } else {
                confirmPasswordField.style.border = "none";
                confirmPasswordField.style.boxShadow = `0 0 3px ${COLORS.red_primary}`
            }
        }
    })
} catch (e) {
}


const enablePasswordConfirmInput = () => {
    const confirmPasswordInput = document.getElementById("password-confirm");
    confirmPasswordInput.disabled = false;
    confirmPasswordInput.style.backgroundColor = COLORS.white_primary;
}

const disablePasswordConfirmInput = () => {
    const confirmPasswordInput = document.getElementById("password-confirm");
    confirmPasswordInput.disabled = true;
    confirmPasswordInput.style.backgroundColor = COLORS.white_secondary;
}





