// SHA-256 password hash of Goobinator69
const PASSWORD_HASH = "7ee02841c622e437fb298d26bed728879936d58618dd634f6736e192c3332871";

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

// SHA256 helper
async function sha256Hex(message){
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b=>b.toString(16).padStart(2,"0")).join("");
}

// LOGIN
document.getElementById("loginBtn").addEventListener("click", async ()=>{
  errorMsg.textContent = "";
  const input = passwordInput.value || "";
  const hash = await sha256Hex(input);
  if(hash === PASSWORD_HASH){
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
    tab.addEventListener("click", ()=>{ currentNote=note; loadCurrentNote(); renderTabs(); });
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

// ACCENT COLOR PICKER
accentPicker.addEventListener("input", (e)=>{
  const color = e.target.value;
  document.documentElement.style.setProperty("--accent-color", color);
  localStorage.setItem("accentColor", color);
});

function loadAccentColor(){
  const saved = localStorage.getItem("accentColor");
  if(saved){
    document.documentElement.style.setProperty("--accent-color", saved);
    accentPicker.value = saved;
  }
}
