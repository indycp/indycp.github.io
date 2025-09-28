// Simple JS for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    const liquidCursor = document.querySelector('.liquid-cursor');
    const liquidElements = document.querySelectorAll('.liquid-element');
    const navContainer = document.querySelector('.nav-container');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Enhanced cursor movement with smooth interpolation
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor when moving
        liquidCursor.style.opacity = '1';
        
        // Enhanced effect when near header
        const header = document.querySelector('header');
        const headerRect = header.getBoundingClientRect();
        const distanceToHeader = Math.min(
            Math.abs(mouseY - headerRect.top),
            Math.abs(mouseY - headerRect.bottom)
        );
        
        if (distanceToHeader < 100) {
            liquidCursor.style.transform = `scale(${1.5 - distanceToHeader / 200})`;
            liquidCursor.style.filter = `blur(${15 + distanceToHeader / 5}px)`;
            navContainer.style.filter = `blur(${0.5 + (100 - distanceToHeader) / 100}px)`;
        } else {
            liquidCursor.style.transform = 'scale(1)';
            liquidCursor.style.filter = 'blur(20px)';
            navContainer.style.filter = 'blur(1px)';
        }
    });
    
    // Smooth cursor animation
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        liquidCursor.style.left = (cursorX - 40) + 'px';
        liquidCursor.style.top = (cursorY - 40) + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Hide cursor when not moving
    let cursorTimeout;
    window.addEventListener('mousemove', () => {
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            liquidCursor.style.opacity = '0';
        }, 2000);
    });
    
    // Enhanced liquid element interactions
    liquidElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'blur(0px) brightness(1.2) saturate(1.3)';
            element.style.transform = 'scale(1.1) translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = '';
            element.style.transform = '';
        });
    });
    
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.card, .member');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
