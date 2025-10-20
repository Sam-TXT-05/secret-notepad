// script.js - SHA-256 hashed-password check + localStorage notes
// Hash used below is SHA-256("Goobinator69")
const PASSWORD_HASH = "7ee02841c622e437fb298d26bed728879936d58618dd634f6736e192c3332871";

const loginScreen = document.getElementById("login-screen");
const notepadScreen = document.getElementById("notepad-screen");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const notepad = document.getElementById("notepad");

// Helper: compute SHA-256 hex of a string using SubtleCrypto
async function sha256Hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Load saved note if it exists (keeps it in localStorage)
if (localStorage.getItem("note")) {
  notepad.value = localStorage.getItem("note");
}

// Login handler: compare hashed input to stored hash
document.getElementById("loginBtn").addEventListener("click", async () => {
  errorMsg.textContent = "";
  const input = passwordInput.value || "";
  try {
    const inputHash = await sha256Hex(input);
    if (inputHash === PASSWORD_HASH) {
      loginScreen.style.display = "none";
      notepadScreen.style.display = "block";
      passwordInput.value = "";
    } else {
      errorMsg.textContent = "❌ Wrong password";
    }
  } catch (err) {
    console.error("Hash error:", err);
    errorMsg.textContent = "Error checking password";
  }
});

// Save note to localStorage
document.getElementById("saveBtn").addEventListener("click", () => {
  localStorage.setItem("note", notepad.value);
  alert("✅ Note saved!");
});

// Logout: hide notepad, show login
document.getElementById("logoutBtn").addEventListener("click", () => {
  notepadScreen.style.display = "none";
  loginScreen.style.display = "block";
  passwordInput.value = "";
});
