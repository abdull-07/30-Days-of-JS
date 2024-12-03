const days = document.querySelector("#day")
const hours = document.querySelector("#hour")
const mints = document.querySelector("#minutes")
const seconds = document.querySelector("#seconds")
const data = document.querySelector(".data")


const currentYear = new Date().getFullYear();
let newYearTime = new Date(`January 1 ${currentYear} 00:00:00`)

const happyNewYear = `<div class= "hbd">
                <div class="text">🎈Happy New Year🎈</div>
                <div class="dec">🎈🎆🎉🎊</div>
            </div>`;

const getNewYear = () => {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    data.innerHTML = "";
    if (diff <= 0) {
        // show new Year Massage
        data.innerHTML = happyNewYear;

        //hide the massage after the 1 mint
        setTimeout(() => {
            data.innerHTML = happyNewYear;
        }, 60000)

        // set the target  to next yeat
        const nextYear = newYearTime.getFullYear() + 1;
        newYearTime = new Date(`January 1 ${nextYear} 00:00:00`)

        // set the all element at 0
        days.innerHTML = "0"
        hours.innerHTML = "0"
        mints.innerHTML = "0"
        seconds.innerHTML = "0"

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

setInterval(getNewYear, 1000)