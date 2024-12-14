//* Variable Declarations
const searchBar = document.querySelector('.search-bar input[type="text"]'); // Search bar
const noteInput = document.querySelector('.note-input');
const addNoteButton = document.querySelector('.add-note-btn'); // Button to add notes
const colorPicker = document.querySelector('.color-picker'); // Color picker
const notesList = document.querySelector('.list'); // Notes list container
let selectedColor = '#ffffff'; // Default note background color

// *Main Function
const initializeApp = () => {
    loadNotesFromLocalStorage(); // Load notes on page load
    setColor(); // Setup color picker
    setupAddNoteButton(); // Setup "Add Note" button
    search(); // Setup search functionality
}

// *Color Picker Functionality
const setColor = () => {
    colorPicker.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-circle')) {
            // Remove any existing checkmarks
            document.querySelectorAll('.color-circle').forEach(circle => {
                circle.textContent = ''; // Clear any previous checkmarks
            });

            // Add a checkmark to the selected color
            event.target.textContent = '✔';
            event.target.style.color = '#fff'; // Make the checkmark visible

            // Get the background color of the selected circle
            selectedColor = window.getComputedStyle(event.target).backgroundColor;
        }
    });
}

// *Add Note Functionalit
const addNote = () => {
    const noteInput = document.querySelector('.note-input');
    const noteText = noteInput.value.trim();

    // Prevent adding empty notes
    if (!noteText) {
        alert('Please enter a note!');
        return;
    }

    // Create a new note element
    const noteTemplate = createNoteElement(noteText, selectedColor);

    // Prepend the note to the top of the notes list
    notesList.prepend(noteTemplate);

    // Clear the input field
    noteInput.value = '';

    // Save the note in local storage
    saveNotesToLocalStorage();
}

const setupAddNoteButton = () => {
    addNoteButton.addEventListener('click', addNote);
}

// * create Notes Elements
const createNoteElement = (text, color) => {
    const noteTemplate = document.createElement('div');
    noteTemplate.classList.add('show-container');
    noteTemplate.style.backgroundColor = color; // Set background for the container
    noteTemplate.innerHTML = `
        <textarea class="note-show" style="background-color: ${color};">${text}</textarea>
        <div class="note-controls">
            <button class="det-note-btn">Delete</button>
        </div>
    `;

    // Add delete functionality to the note
    const deleteButton = noteTemplate.querySelector('.det-note-btn');
    deleteButton.addEventListener('click', () => {
        noteTemplate.remove();
        saveNotesToLocalStorage();
    });

    return noteTemplate;
}

//  *Save to local storage
const saveNotesToLocalStorage = () => {
    const notes = [];
    document.querySelectorAll('.list .show-container').forEach(note => {
        const noteText = note.querySelector('.note-show').value;
        const noteColor = window.getComputedStyle(note).backgroundColor; // Get container's background color
        notes.push({ text: noteText, color: noteColor });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// *Load form Local Storage
const loadNotesFromLocalStorage = () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    storedNotes.reverse().forEach(note => {
        const noteTemplate = createNoteElement(note.text, note.color);
        notesList.prepend(noteTemplate);
    });
}

// *Search Bar Functionality
const search = () => {
    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase(); // Get search query in lowercase
        const allNotes = document.querySelectorAll('.list .show-container');

        allNotes.forEach(note => {
            const noteText = note.querySelector('.note-show').value.toLowerCase(); // Get note text in lowercase
            if (noteText.includes(searchQuery)) {
                note.style.display = 'block'; // Show matching notes
            } else {
                note.style.display = 'none'; // Hide non-matching notes
            }
        });
    });
}

// *Call the main Function
document.addEventListener('DOMContentLoaded', initializeApp);