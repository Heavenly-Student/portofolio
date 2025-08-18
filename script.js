document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const icon = hamburgerBtn.querySelector('i');
    const body = document.body;

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger Menu Logic
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        header.classList.toggle('menu-open'); // Toggle class on header for styling
        body.classList.toggle('menu-open'); // Toggle class on body to prevent scroll
        const isOpen = navLinks.classList.contains('open');
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                header.classList.remove('menu-open');
                body.classList.remove('menu-open');
                icon.className = 'fa-solid fa-bars';
            }
        });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    // Set 'Home' link as active by default
    const homeLink = document.querySelector('nav ul li a[href="#home"]');
    if (homeLink) {
       homeLink.classList.add('active');
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLi.forEach(link => {
                    link.classList.remove('active');
                });
                
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.project-card, .skill-item, #about p, .section-header');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        fadeInObserver.observe(el);
    });
});