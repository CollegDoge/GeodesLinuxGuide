document.addEventListener("DOMContentLoaded", () => { // theme switching
    const togglebtn = document.getElementById("themeswitch");
    const body = document.body;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(theme) {  // applies the theme
        if (theme === "dark") {
            body.classList.add("darkmode");
        } else {
            body.classList.remove("darkmode");
        }
    }

    if (savedTheme) { // checks local storage, and system preferences
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? "dark" : "light"); 
    }

    togglebtn.addEventListener("click", () => { // theme switching, click script
        const currentTheme = body.classList.contains("darkmode") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => { // live reloading
        if (!localStorage.getItem("theme")) { 
            applyTheme(event.matches ? "dark" : "light");
        }
    });
});

const audio = document.getElementById("audio");
const playButton = document.getElementById("playbtn");

document.getElementById("playbtn").addEventListener("click", function() { // funny audio button
    let audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
        playButton.src = "./img/bsod.png"; 
    } else {
        audio.pause();
        playButton.src = "./img/laptop.png"; // TEMPORARY I SWEAR, stolen from gnome.org
    }
});

document.addEventListener("DOMContentLoaded", function () { // Header scroll blur after y=50
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});

function updateLogoText() {
    const logoText = document.querySelector(".logo-text"); // Header text shorten
    if (window.innerWidth <= 768) {
        logoText.textContent = "GLG";
    } else {
        logoText.textContent = "Geodes Linux Guide";
    }
}
// Check if it starts under 768
updateLogoText();
// Check for resizing
window.addEventListener("resize", updateLogoText);



function updateParaText() {
    const logoText = document.querySelector(".para-text"); // Parahraph text shorten
    const buttonShow = document.querySelector(".para-btn"); // Show read more button
    if (window.innerWidth <= 768) {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
        buttonShow.style.position = "relative";
        buttonShow.style.left = "50%"; // to get it to center
        buttonShow.style.transform = "translateX(-50%)";
        buttonShow.style.display = "block";
    } else {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
        buttonShow.style.display = "none";
    }
}
// Check if it starts under 768
updateParaText();
// Check for resizing
window.addEventListener("resize", updateParaText);