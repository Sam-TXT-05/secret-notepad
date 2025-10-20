const PASSWORD = "Goobinator69"; // change this to whatever password you want

const loginScreen = document.getElementById("login-screen");
const notepadScreen = document.getElementById("notepad-screen");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const notepad = document.getElementById("notepad");

// Load saved note if it exists
if (localStorage.getItem("note")) {
  notepad.value = localStorage.getItem("note");
}

// Handle login
document.getElementById("loginBtn").addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    loginScreen.style.display = "none";
    notepadScreen.style.display = "block";
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "❌ Wrong password";
  }
});

// Save button
document.getElementById("saveBtn").addEventListener("click", () => {
  localStorage.setItem("note", notepad.value);
  alert("✅ Note saved!");
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  notepadScreen.style.display = "none";
  loginScreen.style.display = "block";
  passwordInput.value = "";
});
