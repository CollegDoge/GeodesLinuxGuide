// THEME SWITCH
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


// LAPTOP BUTTON
const audio = document.getElementById("audio");
const playButton = document.getElementById("playbtn");

document.getElementById("playbtn").addEventListener("click", function() { // funny audio button
    let audio = document.getElementById("audio"); // play audio (kinda buggy but it works)
    if (audio.paused) {
        audio.play();
        playButton.src = "./img/bsod.png";  // changes image to bsod funny
    } else {
        audio.pause();
        playButton.src = "./img/laptop.png"; // TEMPORARY I SWEAR, stolen from gnome.org, slightly edited
    }
});

// HEADER SCROLL + MENU
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const menunav = document.getElementById('menunav');
    const menutitle = document.querySelector('.menu-title');
    const navItems = document.querySelectorAll('.nav-item');
    const overlay = document.getElementById('page-overlay'); // overlay element
    let isMenuOpen = false;

    function openMenu(title, selectedItem) { 
        menutitle.textContent = title; // gets title from nav-item
        menunav.style.height = '40%'; // shows the menu
        header.classList.remove("scrolled");
        overlay.classList.add('active'); // show overlay effect
        isMenuOpen = true; // adds open flag

        navItems.forEach(nav => nav.classList.remove('selected')); // for colour hover
        selectedItem.classList.add('selected');
    }

    function closeMenu() {
        menunav.style.height = '0%'; // hides menu
        overlay.classList.remove('active'); // remove overlay effect
        isMenuOpen = false; // removes open flag

        if (window.scrollY > 50) { // adds header blur if scrolled after closing menu
            header.classList.add("scrolled");
        }

        navItems.forEach(nav => nav.classList.remove('selected')); // removes colour hover if menu is closed
    }

    window.addEventListener("scroll", () => {
        if (!isMenuOpen) {
            header.classList.toggle("scrolled", window.scrollY > 50); // adds blur on scroll
        }
    });

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => { // adds title for each nav-item
            const title = item.getAttribute('data-menu');
            openMenu(title, item);
        });
    });

    document.querySelector('.menu').addEventListener('mouseleave', closeMenu); // closes menu if mouse moves out of menu

    document.addEventListener('click', (event) => { // closes menu if the user taps out of the menu
        if (isMenuOpen && 
            !menunav.contains(event.target) && 
            !document.querySelector('.nav').contains(event.target)) { 
            closeMenu();
        }
    });

    overlay.addEventListener('click', closeMenu); // overlay too, will hide menu if tapped.

    window.addEventListener('resize', () => { // removes menu if screen size <768 (hamburger instead)
        if (isMenuOpen && window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// HEADER LOGO TEXT
function updateLogoText() {
    const logoText = document.querySelector(".logo-text"); // Header text shorten
    if (window.innerWidth <= 768) {
        logoText.textContent = "GLG";
    } else {
        logoText.textContent = "Geodes Linux Guide";
    }
}
// UPDATE LOGO TEXT
updateLogoText();
window.addEventListener("resize", updateLogoText);


// PARAGRAPH TEXT
function updateParaText() {
    const logoText = document.querySelector(".para-text"); // Parahraph text shorten
    const buttonShow = document.querySelector(".para-btn"); // Show read more button
    if (window.innerWidth <= 768) {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
        buttonShow.style.position = "relative"; // adds button to show more if <768
        buttonShow.style.left = "50%"; // dont know why i did this but i am too lazy to change it now
        buttonShow.style.transform = "translateX(-50%)";
        buttonShow.style.display = "block";
    } else {
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
        buttonShow.style.display = "none"; // removes button if screen size is >768
    }
}
// UPDATE PARAGRAPH TEXT
updateParaText();
window.addEventListener("resize", updateParaText);


// READ MORE/LESS BUTTON
function paraTextToggle() {
    const logoText = document.querySelector(".para-text");
    const button = document.querySelector(".para-btn");
    const icon = document.getElementById("para-icon");
    const label = document.getElementById("para-label");
    const isExpanded = button.dataset.expanded === "true";

    if (!isExpanded) { // adds this text if you press the read more button (couldve done this more efficiently but it works)
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits. In other words, your PC becomes a sitting duck for hackers and malware, and your apps will eventually just stop being supported. This will lead to millions of (frankly, not even that old) devices being thrown out when they dont need to be. Windows 11 has its problems too, with privacy concerns, unwanted features/removal of features, and many AI features being shoved down your throat.";
        label.textContent = "Read Less"; // arrow text + icon
        icon.className = "nf nf-fa-angle_up";
        button.dataset.expanded = "true";
    } else { // back to smaller ver
        logoText.textContent = "Windows 10 support is ending October this year, and that's bad news for millions of devices worldwide. Once support ends, Microsoft stops giving security updates. No patches for new vulnerabilities, no fixes for bugs and exploits.";
        label.textContent = "Read More"; // arrow text + icon
        icon.className = "nf nf-fa-angle_down";
        button.dataset.expanded = "false";
    }
}


// GRADIENT
const section = document.querySelector('.sectionmiddle');
const gradient = section.querySelector('.gradient');

section.addEventListener('mousemove', e => {
  const rect = section.getBoundingClientRect(); // gets section size
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  section.style.setProperty('--x', `${x}px`); // finds x/y of cursor
  section.style.setProperty('--y', `${y}px`);
  gradient.style.opacity = '0.2'; // sets gradient to 0.2, maybe too much idk
});

section.addEventListener('mouseleave', () => { // removes the gradient if mouse leaves the section
  gradient.style.opacity = '0';
});


// NAVIGATION & NAV ITEM MENUS
const hideheader = document.querySelector('header'); // full screen nav, remove header

function openNav() { 
    hideheader.style.opacity = '0';
    document.getElementById("fullnav").style.height = "100vh"; // height of screen
}
function closeNav() {
    hideheader.style.opacity = '1';
    document.getElementById("fullnav").style.height = "0%"; // disappear
}