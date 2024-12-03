const apiKey = "68a5724de7700250763ae70dc756a1f4"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric"
const cityName = document.querySelector("#city")
const temp = document.querySelector("#temp")
const temp2 = document.querySelector("#temp2")
const desc = document.querySelector("#desc")
const humidty = document.querySelector("#humidty")
const speed = document.querySelector("#speed")
const feelsLike = document.querySelector("#fells")
const searchBar = document.querySelector("#searchbar")
const searchBtn = document.querySelector("button")
const tempBg = document.querySelectorAll(".temp")
// const tempBg2 = document.querySelector(".tempt")
const image = document.querySelector("#img")
const description = document.querySelector(".desc")



const getWeather = async (city) => {
    try {
        const response = await fetch(`${apiURL}&q=${city}&&appid=${apiKey}`)
        const data = await response.json()
        console.log(data)
        cityName.innerText = data.name
        temp.innerText = Math.round(data.main.temp)
        temp2.innerText = Math.round(data.main.temp)
        humidty.innerText = data.main.humidity + ` %`
        desc.innerText = data.weather[0].description
        speed.innerText = Math.round(data.wind.speed) + ` km/h`
        feelsLike.innerText = Math.round(data.main.feels_like)

        // Convert innerText to numbers for comparison
        const currentTemp = Number(temp.innerText);
        const currentTemp2 = Number(temp2.innerText);
        tempBg.forEach(bg => {
            if (currentTemp >= 35 && currentTemp2 >= 35) {
                bg.style.backgroundColor = "rgb(255, 69, 0)";
            } else if ((currentTemp >= 15 && currentTemp <= 35) || (currentTemp2 >= 15 && currentTemp2 <= 35)) {
                bg.style.backgroundColor = "rgb(34, 139, 34)";
            } else if (currentTemp <= 15 && currentTemp2 <= 15) {
                bg.style.backgroundColor = "rgb(0, 191, 255)"; // Corrected the space
            }
        })

        if (data.weather[0].description === "clear sky") {
            image.src = "images/clear.png";
        } else if (data.weather[0].description === "clouds") {
            image.src = "images/clouds.png";
        } else if (data.weather[0].description === "rain") {
            image.src = "images/rain.png";
        } else if (data.weather[0].description === "mist") {
            image.src = "images/mist.png";
        } else if (data.weather[0].description === "drizzle") {
            image.src = "images/drizzle.png";
        } else if (data.weather[0].description === "snow") {
            image.src = "images/snow.png";
        } else if (data.weather[0].description === "fog") {
            image.src = "images/foggy.png";
        } else if (data.weather[0].description === "smoke") { // Corrected to "smoky"
            image.src = "images/smoke.png";
        }else if (data.weather[0].description === "broken clouds") {
            image.src = "images/broken.png";
        }else if (data.weather[0].description === "overcast clouds") {
            image.src = "images/clouds.png";
        }else if (data.weather[0].description === "haze") {
            image.src = "images/haze.png";
        } else {
            image.src = "images/unknown.png"; // Handle unknown weather
        }

    } catch (error) {
        console.error(error)
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBar.value)
})