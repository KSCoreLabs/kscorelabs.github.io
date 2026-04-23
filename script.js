// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Trigger once on load
window.addEventListener('load', reveal);
// Trigger on scroll
window.addEventListener('scroll', reveal);

// Typewriter Effect
(function () {
    const phrases = [
        'Protect Your Privacy.',
        'Secure Your Device.',
        'Put You In Control.',
    ];
    const el = document.getElementById('typewriter');
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER_TYPE = 1800;
    const PAUSE_AFTER_DELETE = 400;

    function tick() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, PAUSE_AFTER_TYPE);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, PAUSE_AFTER_DELETE);
                return;
            }
        }

        setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    // Small delay before starting so page loads first
    setTimeout(tick, 800);
}());
