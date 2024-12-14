const ageInput = document.querySelector("#date")
const calculateBtn = document.querySelector(".box button")
const result = document.querySelector("#result")

ageInput.max = new Date().toISOString().split("T")[0];

const calculateAge = () => {
    let birthDate = new Date(ageInput.value)
    let currentDate = new Date()

    let diffYear = currentDate.getFullYear() - birthDate.getFullYear();
    let diffMonth = currentDate.getMonth() - birthDate.getMonth();
    let diffDay = currentDate.getDate() - birthDate.getDate();
    

        // Adjust the year if the current month and day are before the birth month and day
        if (diffMonth < 0 || (diffMonth === 0 && diffDay < 0)) {
            diffYear--;
        }

        if (diffDay < 0) {
            diffMonth--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(),0)
            diffDay += lastMonth.getDate()
        }

        if (diffMonth < 0) {
            diffMonth += 12
        }
        result.textContent = `You are ${diffYear} years, ${diffMonth} months, and ${diffDay} Days old.`;
}

calculateBtn.addEventListener("click", calculateAge);