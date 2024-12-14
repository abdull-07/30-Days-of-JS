

// Define the DOM Elements
const updateQuoteBtn = document.querySelector(".update-btn")
const shareQuoteBtn = document.querySelector(".share-btn")
const displayQuote = document.querySelector("#quote-display")
const quoteAuthor = document.querySelector("#author")


// Define the API endpoint and API key
const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "IQ3RKmBEisapHTm7ZaRN/Q==Cg5zxXuSqwDM6R0p";

// List of categories
const categories = [
  "happiness", "car", "equality", "faith", "family", 
  "health", "history", "knowledge", "learning", 
  "life", "love", "marriage", "money", "success"
];

// Function to get a random quote
async function getRandomQuote() {
  // Select a random category
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  try {
    // Fetch a quote from the selected category
    const response = await fetch(`${API_URL}?category=${randomCategory}`, {
      headers: { "X-Api-Key": API_KEY }
    });

    // Parse the response
    if (response.ok) {
      const data = await response.json();
      console.log(`Category: ${randomCategory}`);
      console.log(`Quote: "${data[0].quote}" - ${data[0].author}`);

      displayQuote.innerHTML = data[0].quote
      quoteAuthor.innerHTML = data[0].author


    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to fetch the quote:", error);
  }
}

// Call the function
updateQuoteBtn.addEventListener("click", getRandomQuote)
window.onload(getRandomQuote())