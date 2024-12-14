

// Define the DOM Elements
const updateHadithBtn = document.querySelector(".update-btn")
const shareHadithBtn = document.querySelector(".share-btn")
const displayHadith = document.querySelector("#hadith-display")
const nameOfBookHadith = document.querySelector("#hadith-name span")
const numberOfHadith = document.querySelector("#hadith-number span")

// Books and their corresponding number of Hadiths
const books = {
    muslim: 5091,
    bukhari: 2977,
    tirmidzi: 3891,
    "abu-daud": 3999,
    nasai: 5399,
    "ibnu-majah": 4331
};



// Bease URLs
const hadithURL = "https://api.hadith.gading.dev/books" // URL of Hadith


// Get the random Hadith form the random books 
const getHadith = async () => {
    try {

        // select random Hadith
        const bookName = Object.keys(books)// select all books
        console.log(`Name of all books are ${bookName}`)
        const randomBook = bookName[Math.floor(Math.random() * bookName.length)];// select random Book
        console.log(`Selected Book is ${randomBook}`)
        nameOfBookHadith.innerHTML = randomBook.toUpperCase()

        // Selecte a random Hadith from selected Hadith
        const maxHadith = books[randomBook]
        console.log(`max number of Hadith in ${randomBook} are ${maxHadith}`)
        const randomHadith = Math.floor(Math.random() * maxHadith) + 1;
        console.log(`The selected hadith number is ${randomHadith} from ${randomBook}`)
        numberOfHadith.innerHTML = randomHadith

        // get the Selected Hadith from the Selected Book
        const response = await fetch(`${hadithURL}/${randomBook}/${randomHadith}`)
        // Throw Error if the Hadith is not found
        if (!response.ok) {
            displayHadith.innerHTML = "Failed to fetch Hadith."; // Set the error message
            return;
        }

        // Exerct the arabi form the data
        const hadith = await response.json()
        const arabicText = hadith.data.contents.arab // Store arabic data into a variable to translate to urdu
        console.log(hadith.data.contents.arab)

        // Show the Hadith in window
        displayHadith.innerHTML = hadith.data.contents.arab


    } catch (error) {
        console.log("Error")
        displayHadith.innerHTML = "Failed to fetch Hadith.";
    }
}

// Translate the text into Urdu using LibreTranslate API
updateHadithBtn.addEventListener("click", getHadith)
window.onload = getHadith;