// Simple JS for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    const liquidGlassBlob = document.querySelector('.liquid-glass-blob');
    const liquidElements = document.querySelectorAll('.liquid-element');
    const navContainer = document.querySelector('.nav-container');
    
    let currentElement = null;
    let isTransitioning = false;
    
    // Enhanced liquid glass blob behavior
    function moveBlob(targetElement) {
        if (!targetElement || isTransitioning) return;
        
        isTransitioning = true;
        
        // Remove magnified class from previous element
        if (currentElement) {
            currentElement.classList.remove('magnified');
        }
        
        const rect = targetElement.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        
        // Calculate position relative to nav container
        const targetX = rect.left - containerRect.left + (rect.width / 2) - 60;
        const targetY = rect.top - containerRect.top + (rect.height / 2) - 30;
        
        // Add stretching animation if moving from another element
        if (currentElement && liquidGlassBlob.classList.contains('active')) {
            liquidGlassBlob.classList.add('stretching');
            
            // Calculate stretch direction and distance
            const currentRect = currentElement.getBoundingClientRect();
            const distance = Math.abs(rect.left - currentRect.left);
            const stretchWidth = Math.min(200, 120 + distance * 0.5);
            
            liquidGlassBlob.style.width = stretchWidth + 'px';
            liquidGlassBlob.style.left = targetX + 'px';
            liquidGlassBlob.style.top = targetY + 'px';
            
            // After stretch animation, return to normal size
            setTimeout(() => {
                liquidGlassBlob.classList.remove('stretching');
                liquidGlassBlob.style.width = '120px';
                isTransitioning = false;
            }, 400);
        } else {
            // First time activation or no stretching needed
            liquidGlassBlob.style.left = targetX + 'px';
            liquidGlassBlob.style.top = targetY + 'px';
            liquidGlassBlob.classList.add('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        // Add magnified effect to current element
        targetElement.classList.add('magnified');
        currentElement = targetElement;
    }
    
    function hideBlob() {
        if (!isTransitioning) {
            liquidGlassBlob.classList.remove('active', 'stretching');
            if (currentElement) {
                currentElement.classList.remove('magnified');
                currentElement = null;
            }
            liquidGlassBlob.style.width = '120px';
        }
    }
    
    // Add hover listeners to all liquid elements
    liquidElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            moveBlob(element);
        });
        
        // Enhanced hover effects for non-blob interactions
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
    
    // Hide blob when leaving nav area
    navContainer.addEventListener('mouseleave', () => {
        setTimeout(() => {
            hideBlob();
        }, 200);
    });
    
    // Enhanced cursor behavior (keeping the existing cursor but making it more subtle)
    const liquidCursor = document.querySelector('.liquid-cursor');
    if (liquidCursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            liquidCursor.style.opacity = '0.3'; // More subtle
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.08; // Slower for smoother feel
            cursorY += (mouseY - cursorY) * 0.08;
            
            if (liquidCursor) {
                liquidCursor.style.left = (cursorX - 40) + 'px';
                liquidCursor.style.top = (cursorY - 40) + 'px';
            }
            
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
        
        let cursorTimeout;
        window.addEventListener('mousemove', () => {
            clearTimeout(cursorTimeout);
            cursorTimeout = setTimeout(() => {
                if (liquidCursor) {
                    liquidCursor.style.opacity = '0';
                }
            }, 1500);
        });
    }
    
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
