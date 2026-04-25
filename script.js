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

// ── Social Dropdown ──────────────────────────────────────────
(function () {
    const toggle   = document.getElementById('social-toggle');
    const menu     = document.getElementById('social-menu');
    const chevron  = document.getElementById('social-chevron');
    if (!toggle || !menu || !chevron) return;

    function openMenu() {
        menu.classList.add('open');
        chevron.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menu.classList.remove('open');
        chevron.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close when a social link is clicked (keeps UX clean)
    menu.querySelectorAll('.sdm-item').forEach(item => {
        item.addEventListener('click', () => closeMenu());
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}());


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

// ── Contact Form → Google Sheets (secured) ───────────────────
(function () {
    try {
        // Each segment is base64-encoded. Joined at runtime — not plain text in source.
        // To update after redeployment: encode only the script ID (not the full URL).
        // Open browser console and run:  btoa('your_new_script_id_here')
        const _a = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8='); // base path
        const _b = atob('QUtmeWNienlsc3otV2tHSjRTV3pERUE5TC1LT3lHNDNJbXNu');  // ID chunk 1
        const _c = atob('NnI0OFZKcEc3MWtQdk1Td0ZWb1l4WDdUTVZlUWU2VnZnakFJ'); // ID chunk 2
        const _d = atob('L2V4ZWM=');                                              // /exec
        const ENDPOINT = _a + _b + _c + _d;

        // Must exactly match SECRET_TOKEN in your Apps Script
        const _tk = atob('S1NDTC0yMDI2LSNAIXhaMQ==');

        const form    = document.getElementById('contact-form');
        const btnText = form ? form.querySelector('.cf-btn-text') : null;
        const btnLoad = form ? form.querySelector('.cf-btn-loading') : null;
        const submit  = document.getElementById('cf-submit');
        const success = document.getElementById('cf-success');
        const error   = document.getElementById('cf-error');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!form.checkValidity()) { form.reportValidity(); return; }

            btnText.hidden = true;
            btnLoad.hidden = false;
            submit.disabled = true;
            success.style.display = 'none';
            error.style.display   = 'none';

            const payload = {
                token:   _tk,
                name:    document.getElementById('cf-name').value.trim(),
                email:   document.getElementById('cf-email').value.trim(),
                subject: document.getElementById('cf-subject').value.trim(),
                message: document.getElementById('cf-message').value.trim(),
                date:    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            };

            try {
                await fetch(ENDPOINT, {
                    method:  'POST',
                    mode:    'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify(payload),
                });
                success.style.display = 'flex';
                form.reset();
            } catch (fetchErr) {
                error.style.display = 'flex';
            } finally {
                btnText.hidden = false;
                btnLoad.hidden = true;
                submit.disabled = false;
            }
        });

    } catch (setupErr) {
        // If base64 decode fails, at least stop form from page-refreshing
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const err = document.getElementById('cf-error');
                if (err) err.style.display = 'flex';
            });
        }
        console.error('[KSCoreLabs Contact] Setup error:', setupErr);
    }
}());



