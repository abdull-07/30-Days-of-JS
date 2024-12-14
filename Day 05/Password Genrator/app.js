//* Initialize the DOM Elements
const passwordInput = document.querySelector("#password");
const copyPassword = document.querySelector("#copy");
const passwordGenerate = document.querySelector("#generate");
const savePassword = document.querySelector("#save");
const List = document.querySelector("#data2");
const savePasswordList = document.querySelector("#password-list");
const deletePassword = document.querySelector("#delete");
const passwordLable = document.querySelector("#pass-lable");
const passwordSave = document.querySelector("#pass-save");
const passwordLength = 16;

//* Initialize Password Elements
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLowerCase();
const numbers = "0123456789";
const specialChars = "!@#$%^&*_-";

//* Add the allowed chars
const allowedChars = upperCase + lowerCase + numbers + specialChars;

//* Generate Password
const generatePassword = (passwordLength = 16) => {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars.charAt(randomIndex); // Use charAt to get the character
    }
    return password;
};

//* Save Passwoeds to local Storage
const savePasswordToLocalStorage = (passwords) => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
}

//* Lode Passwords form local storage
const loadePasswordToLocalStorage = () => {
    const passwords = localStorage.getItem("passwords");
    return passwords ? JSON.parse(passwords) : []
}

//* Render Save Passwords 
const renderSavePasswords = () => {
    const savePasswords = loadePasswordToLocalStorage();

    if (savePasswords.length > 0) {
        List.classList.remove("display"); // Show the saved passwords list
    } else {
        List.classList.add("display"); // Hide the saved passwords list
    }

    savePasswordList.innerHTML = ""; // Clear existing passwords in the list

    savePasswords.forEach((password, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <p id="pass-lable">${password.label}</p>
                <p id="pass-save">${password.password}</p>
            </div>
            <button id="delete-${index}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </button>
        `;

        savePasswordList.appendChild(li);

        const deleteBtn = li.querySelector(`#delete-${index}`);
        deleteBtn.addEventListener("click", () => {
            const updatedPasswords = savePasswords.filter((_, i) => i !== index);
            savePasswordToLocalStorage(updatedPasswords);
            renderSavePasswords();
        });
    });
};


//* Add EventListener on Generate Password on Button
passwordGenerate.addEventListener("click", () => {
    const password = generatePassword(passwordLength)

    passwordInput.value = password
    console.log("Generated Password:", password);
    passwordInput.disabled = true
})


//* Add EventListener to copy password
copyPassword.addEventListener("click", () => {
    if (passwordInput.value) {

        // Copy the passwrd
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                console.log("Password copy to clipbord")
                alert("Password Copyed!")
            })
            .catch((error) => {
                console.error("Error copying password", error)
                alert("Failed to copy password.")
            })

    }
    else {
        alert("No Password to copy")
    }
})


//* Save and Manage the passsword
const saveGeneratedPassword = () => {
    const password = generatePassword(passwordLength)
    passwordInput.value = password;
    passwordInput.disabled = true;
}

//* Add event listener to the save button and call the handler
savePassword.addEventListener("click", () => {
        // Prompt the user for a label
        const label = prompt("Enter the label for the password:");

        if (label) {
            const savePasswords = loadePasswordToLocalStorage()
            const newPassword = {label, password: passwordInput.value};
            savePasswords.push(newPassword);
    
            savePasswordToLocalStorage(savePasswords)
            renderSavePasswords()
        } else {
            alert("Label is required to save the password.");
        }
});

// TODO: Hide the Save Password List when no password is saved
List.classList.add("display");
renderSavePasswords();