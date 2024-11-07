const notesContainer = document.querySelector(".notes");
const addNotesButton = document.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotesButton);
});

addNotesButton.addEventListener('click', () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener('dblclick', () => {
        const dbDelete = confirm("Are you sure you wish to delete this sticky note?");
        if (dbDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const existingNotes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNotesButton);

    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.find(note => note.id === id);
    if (targetNote) {
        targetNote.content = newContent;
        saveNotes(notes);
    }
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}
