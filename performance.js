// Performance Optimizations for VANTHOS SOCIETY

// Lazy loading for images and heavy resources
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            lazyLoadObserver.unobserve(img);
        }
    });
});

// Throttle function for performance
default function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
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

// Optimize particle system
function optimizeParticleSystem() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    let animationId;
    let isVisible = true;

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isVisible = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            isVisible = true;
            animateParticles();
        }
    });

    // Reduce particle count on mobile
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 25 : 50;

    // Optimize canvas rendering
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap'
    ];

    criticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Optimize scroll events
function optimizeScrollEvents() {
    const scrollHandler = throttle(() => {
        const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Optimize resize events
function optimizeResizeEvents() {
    const resizeHandler = debounce(() => {
        if (window.vantaEffect) {
            window.vantaEffect.resize();
        }
    }, 250);

    window.addEventListener('resize', resizeHandler);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    preloadResources();
    optimizeParticleSystem();
    optimizeScrollEvents();
    optimizeResizeEvents();
});

// Web Vitals monitoring
function reportWebVitals() {
    if ('web-vitals' in window) {
        import('https://unpkg.com/web-vitals@3?module').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
}

// Initialize performance monitoring
reportWebVitals();
