// PASSWORD
const PASSWORD = "055724167.!";

const loginScreen = document.getElementById("login-screen");
const notepadScreen = document.getElementById("notepad-screen");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const notepad = document.getElementById("notepad");

const addNoteBtn = document.getElementById("addNote");
const tabsContainer = document.getElementById("tabs");
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");
const themeToggle = document.getElementById("themeToggle");
const logoutBtn = document.getElementById("logoutBtn");
const accentPicker = document.getElementById("accentColor");

let notes = {};
let currentNote = "Note1";
let darkMode = true;

// LOGIN
loginBtn.addEventListener("click", ()=>{
  if(passwordInput.value === PASSWORD){
    loginScreen.style.display = "none";
    notepadScreen.style.display = "flex";
    passwordInput.value = "";
    loadNotes();
    loadAccentColor();
  } else {
    errorMsg.textContent = "❌ Wrong password";
  }
});

// LOGOUT
logoutBtn.addEventListener("click", ()=>{
  notepadScreen.style.display = "none";
  loginScreen.style.display = "flex";
  passwordInput.value = "";
});

// NOTES
function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes(){
  const stored = localStorage.getItem("notes");
  if(stored) notes = JSON.parse(stored);
  if(Object.keys(notes).length === 0) notes["Note1"] = "";
  renderTabs();
  loadCurrentNote();
}

function renderTabs(){
  tabsContainer.innerHTML = "";
  Object.keys(notes).forEach(note=>{
    const tab = document.createElement("div");
    tab.textContent = note;
    tab.classList.add("tab");
    if(note===currentNote) tab.classList.add("active");
    tab.addEventListener("click", ()=>{
      currentNote=note;
      loadCurrentNote();
      renderTabs();
    });
    tabsContainer.appendChild(tab);
  });
}

function loadCurrentNote(){
  notepad.value = notes[currentNote] || "";
}

// ADD NOTE
addNoteBtn.addEventListener("click", ()=>{
  let name = "Note"+(Object.keys(notes).length+1);
  notes[name] = "";
  currentNote = name;
  renderTabs();
  loadCurrentNote();
  saveNotes();
});

// SAVE ON CHANGE
notepad.addEventListener("input", ()=>{
  notes[currentNote] = notepad.value;
  saveNotes();
});

// FORMATTING
function wrapSelection(tag){
  const start = notepad.selectionStart;
  const end = notepad.selectionEnd;
  const text = notepad.value;
  notepad.value = text.slice(0,start)+tag+text.slice(start,end)+tag+text.slice(end);
}

boldBtn.addEventListener("click", ()=>wrapSelection("**"));
italicBtn.addEventListener("click", ()=>wrapSelection("_"));
underlineBtn.addEventListener("click", ()=>wrapSelection("__"));

// THEME TOGGLE
themeToggle.addEventListener("click", ()=>{
  darkMode = !darkMode;
  if(darkMode){
    document.body.style.backgroundColor = "#121212";
    notepad.style.backgroundColor = "#1e1e1e";
    notepad.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "#f5f5f5";
    notepad.style.backgroundColor = "#fff";
    notepad.style.color = "#000";
  }
});

// ACCENT COLOR
