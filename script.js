/* ================================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactive Features & Functionality
   ================================================ */

// ===== TYPING ANIMATION =====
const typingElement = document.querySelector('.typing-text');
const typingCursor = document.querySelector('.typing-cursor');
const phrases = [
    'Computer Engineering Student',
    'Full Stack Java Developer',
    'Problem Solver',
    'Tech Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentPhrase.substring(0, charIndex);

    let typeSpeed = 50;

    if (isDeleting) {
        typeSpeed = 30;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation when page loads
if (typingElement) {
    typeAnimation();
}

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    try {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        console.log('Form Data:', { name, email, subject, message });

        showMessage('Thank you! Your message has been received. I\'ll get back to you soon!', 'success');

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);

    } catch (error) {
        console.error('Error:', error);
        showMessage('An error occurred. Please try again later.', 'error');
    }
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll(
    '.project-card, .skill-category, .timeline-item, .about-stats, .stat'
).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navButtons = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${current}`) {
            btn.classList.add('active');
        }
    });
});

// ===== ADD ACTIVE CLASS STYLING =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    // Fade in main content
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ===== INTERACTIVE SKILL CARDS =====
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PRINT RESUME FUNCTIONALITY =====
const downloadButton = document.querySelector('.btn-tertiary');
if (downloadButton) {
    downloadButton.addEventListener('click', (e) => {
        // If resume.pdf doesn't exist, show message
        if (!document.querySelector('a[download="resume.pdf"]')) {
            console.log('Add your resume.pdf file to the project directory');
        }
    });
}

// ===== STARFIELD ANIMATION =====
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    const starCount = Math.floor(window.innerWidth / 50);

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.zIndex = '-1';
        star.style.animation = `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`;
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== DETECT DARK MODE PREFERENCE =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.colorScheme = 'dark';
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Alt + H: Home
    if (e.altKey && e.key === 'h') {
        document.querySelector('a[href="#home"]').click();
    }
    // Alt + P: Projects
    if (e.altKey && e.key === 'p') {
        document.querySelector('a[href="#projects"]').click();
    }
    // Alt + C: Contact
    if (e.altKey && e.key === 'c') {
        document.querySelector('a[href="#contact"]').click();
    }
});

// ===== SOCIAL LINK VALIDATION =====
const socialLinks = document.querySelectorAll('.social-link, .footer-social a');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Check if link is placeholder
        if (href === '#' || !href) {
            e.preventDefault();
            console.log('Please update this social link');
        }
    });
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cPortfolio Website Loaded Successfully! 🎉', 'color: #6366f1; font-size: 16px; font-weight: bold;');

    // Initialize stars
    createStars();

    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Handle resize events
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});

// ===== NAVIGATION HIGHLIGHT ON SCROLL =====
const updateActiveNav = debounce(() => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            navButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, 100);

window.addEventListener('scroll', updateActiveNav);

// ===== CUSTOM CONSOLE MESSAGE =====
console.clear();
console.log(
    '%c👋 Welcome to Tanishka Shivnikar\'s Portfolio!',
    'font-size: 20px; font-weight: bold; color: #6366f1;'
);
console.log(
    '%cBuild with: HTML5, CSS3, JavaScript | Designed with ❤️',
    'font-size: 14px; color: #a855f7;'
);
console.log('%c✨ Feel free to explore the code and reach out!', 'font-size: 12px; color: #ec4899;');

// ===== EXPORT FUNCTIONS FOR ADVANCED USE =====
window.Portfolio = {
    scrollToSection: (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    sendMessage: (name, email, message) => {
        console.log('Message:', { name, email, message });
        showMessage('Message sent successfully!', 'success');
    },

    getPortfolioInfo: () => {
        return {
            name: 'Tanishka Shivnikar',
            role: 'Computer Engineering Student | Aspiring Full Stack Java Developer',
            contact: 'tanishkashivnikar@gmail.com',
            phone: '+91 9322074249',
            location: 'Pune, Maharashtra, India'
        };
    }
};
