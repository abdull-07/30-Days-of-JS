const displayTime = document.querySelector("#display-time");
const stop = document.querySelector("#stop");
const start = document.querySelector("#start");
const restart = document.querySelector("#restart");

let [hours, minutes, secondes] = [0, 0, 0];
let interval;

const startTimer = () => {
    console.log("timer start")
   interval = setInterval(() => {
    secondes += 1;
    if (secondes == 60) {
        console.log("1 minut")
      secondes = 0;
      minutes += 1;
      if (minutes == 60) {
        minutes = 0;
        hours += 1;
      }
    }
    displayTime.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondes.toString().padStart(2, "0")}`;
  }, 1000);
};


const stopTimer = () => {
    clearInterval(interval);
    console.log("timer was stopped");
  };
  
  const restartTimer = () => {
    clearInterval(interval);
    [hours, minutes, secondes] = [0, 0, 0];
    displayTime.textContent = "00:00:00"; // Reset display
    console.log("timer was restarted");
  };

start.addEventListener("click", startTimer)
restart.addEventListener("click", restartTimer)
stop.addEventListener("click", stopTimer)