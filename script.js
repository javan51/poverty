// === Animated Counters ===
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Run counters on page load
window.addEventListener('DOMContentLoaded', function() {
  animateValue("childrenCount", 0, 4800, 2000);
  animateValue("schoolsCount", 0, 24, 2000);
  animateValue("volunteersCount", 0, 180, 2000);

  // Restore saved theme or set default
  const savedThemeIndex = localStorage.getItem("site-theme-index");
  if (savedThemeIndex !== null) {
    currentTheme = parseInt(savedThemeIndex, 10);
  }
  setTheme(themes[currentTheme]);
});

// === Donation Progress Bar ===
let raised = 0;
const goal = 1000;

function donate(amount) {
  raised += amount;
  if (raised > goal) raised = goal;
  let progress = (raised / goal) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  alert("Thank you for donating $" + amount + "!");
}

// === Theme Switcher ===
const themes = ['default', 'vivid', 'candy'];
let currentTheme = 0;

function setTheme(theme) {
  document.body.className = theme + "-theme";
  localStorage.setItem("site-theme", theme);
  localStorage.setItem("site-theme-index", currentTheme);
}

function cycleTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  setTheme(themes[currentTheme]);
}