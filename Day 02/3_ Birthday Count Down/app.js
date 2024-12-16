const days = document.querySelector("#day")
const hours = document.querySelector("#hour")
const mints = document.querySelector("#minutes")
const seconds = document.querySelector("#seconds")
const data = document.querySelector("#data")
const card = document.querySelector(".cards")


const currentYear = new Date().getFullYear();
let birthDay = new Date(`Feb 12 ${currentYear} 00:00:00`); // Enter Your Birthday;

const happyBirthDay = `<div class="card-container">
        <div class="birthday-card">
            <!-- Front side of the card -->
            <div class="front">
                <h1>Happy Birthday! <span class="emoji">🎈🎈🎈</span></h1>
                <p class="highlight">Arslan jani</p>
                <img src="https://i.pinimg.com/564x/e4/f4/f9/e4f4f9b84658035404d04b48eaf7ddef.jpg" alt="Birthday Cake" class="cake">
                <p class="hover-text">Hover to see the full message!</p>
            </div>

            <!-- Back side of the card (detailed message) -->
            <div class="back">
                <p>May this year be filled with joy, laughter, and countless blessings. You deserve all the happiness in the world.</p>
                <p class="cheers">Here's to another fantastic year ahead! Cheers to you, my dear friend.</p>
                <p class="pubg-wish">Do no thing, only play PUBG. I hope you get 6 conquer this year 😏🙄</p>
            </div>
        </div>
    </div>`;

    const getNewYear = () => {
        const currentTime = new Date();
    const diff = birthDay - currentTime;
    
    if (diff <= 0) {
        // Append the happy birthday message to the data element
        data.innerHTML = happyBirthDay;

        // Set the height of the data element to 100%
        data.style.height = "90%";
        
        // Hide the countdown elements
        card.classList.add("hide")
    
        // Show the message for 10 minutes
        setTimeout(() => {
            data.innerHTML = ""; // Clear the message after 10 minutes
            data.style.height="50%"
            // Show the countdown elements again after clearing the message
            card.classList.remove("hide")
        }, 1 * 60 * 1000); // 10 minutes in milliseconds
    
        // Set the target to next year
        const nextHbd = birthDay.getFullYear() + 1;
        birthDay = new Date(`Feb 12 ${nextHbd} 00:00:00`); // Enter Your Birthday;
    
        // Set all elements to 0
        days.innerHTML = "0";
        hours.innerHTML = "0";
        mints.innerHTML = "0";
        seconds.innerHTML = "0";
    
        return;
    }

    const d = Math.floor(diff / 1000 / 60 / 60 / 24)
    const h = Math.floor(diff / 1000 / 60 / 60) % 24
    const m = Math.floor(diff / 1000 / 60) % 60
    const s = Math.floor(diff / 1000) % 60

    // console.log(d)
    // console.log(h)
    // console.log(m)
    // console.log(s)

    days.innerText = d
    hours.innerText = h < 10 ? '0' + h : h;
    mints.innerText = m < 10 ? '0' + m : m
    seconds.innerText = s < 10 ? '0' + s : s

}

if (new Date() > birthDay){
    // If it has passed, set the birthday to next year
    birthDay.setFullYear(currentYear+1)
}

setInterval(getNewYear, 1000)
