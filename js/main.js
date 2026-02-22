document.addEventListener('DOMContentLoaded', () => {
    
    /* Header Scroll Effect */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 2rem';
            header.style.background = 'rgba(5, 5, 5, 0.9)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '1.5rem 2rem';
            header.style.background = 'rgba(5, 5, 5, 0.6)';
            header.style.boxShadow = 'none';
        }
    });

    /* Mobile Menu Toggle */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 98; background: rgba(0,0,0,0.5);';
    document.body.appendChild(overlay);

    function closeMenu() {
        nav.classList.remove('nav-active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        nav.style.display = 'none';
        overlay.style.display = 'none';
    }

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // Hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (nav.classList.contains('nav-active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                nav.style.display = 'flex';
                // Simple inline style injection for mobile list view
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(5, 5, 5, 0.98)';
                nav.style.backdropFilter = 'blur(15px)';
                nav.style.padding = '2rem';
                nav.style.borderBottom = '1px solid var(--ice-border)';
                overlay.style.display = 'block';
            } else {
                closeMenu();
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /* Floating Cards Micro-Interactions */
    const heroVisual = document.querySelector('.hero-visual');
    const cards = document.querySelectorAll('.f-card');

    if (heroVisual && cards.length > 0) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            cards.forEach((card, index) => {
                const speed = (index + 1) * 0.05;
                const moveX = x * speed;
                const moveY = y * speed;
                card.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${y * 0.02}deg) rotateY(${-x * 0.02}deg)`;
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            cards.forEach((card) => {
                card.style.transform = 'none';
            });
        });
    }
});
