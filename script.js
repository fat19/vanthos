// VANTHOS SOCIETY - Interactive JavaScript

// Global variables
let vantaEffect;
let mouseX = 0;
let mouseY = 0;
let isAudioPlaying = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initChamberCards();
    initFormEffects();
    initAudioPlayer();
    initParticleSystem();
    initSmoothScroll();
    initIntersectionObserver();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide preloader after loading
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initVantaBackground();
                }, 500);
            }, 1000);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
}

// Initialize Vanta.js background
function initVantaBackground() {
    if (typeof VANTA !== 'undefined') {
        vantaEffect = VANTA.WAVES({
            el: "#hero-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0a0a2e,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 0.75,
            zoom: 0.75
        });
    }
}

// Custom cursor with light trail
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Create trail effect
        createCursorTrail(mouseX, mouseY);
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Add hover effects for interactive elements
    const hoverElements = document.querySelectorAll('button, .nav-link, .chamber-card, .cta-button');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--neon-purple)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--neon-cyan)';
        });
    });
}

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail-particle';
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: var(--neon-cyan);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        opacity: 0.6;
        transition: all 0.5s ease-out;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.transform = 'scale(0)';
        trail.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    // GSAP animations for hero text
    gsap.from('.hero-title', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });
    
    gsap.from('.cta-button', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.1
    });
    
    // Globe rotation animation
    gsap.to('.globe', {
        duration: 20,
        rotationY: 360,
        ease: 'none',
        repeat: -1
    });
    
    // Floating animation for globe
    gsap.to('.globe-container', {
        duration: 4,
        y: 20,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Parallax effect for vision section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const visionSection = document.querySelector('.vision-background');
        
        if (visionSection) {
            visionSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // GSAP ScrollTrigger for sections
    gsap.registerPlugin();
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section.querySelectorAll('.section-title, .section-divider'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        });
    });
}

// Chamber cards functionality
function initChamberCards() {
    const chamberCards = document.querySelectorAll('.chamber-card');
    const modal = document.getElementById('chamber-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');
    
    const chamberData = {
        wealth: {
            title: "The Wealth Chamber",
            content: `
                <div class="chamber-details">
                    <h3>Master the Flow of Resources</h3>
                    <p>Within the Wealth Chamber, we transcend traditional finance. Our members understand that true wealth is the ability to manifest resources at will, across all dimensions of existence.</p>
                    <div class="chamber-features">
                        <div class="feature">
                            <h4>Quantum Investment Strategies</h4>
                            <p>Navigate parallel timelines to optimize resource allocation</p>
                        </div>
                        <div class="feature">
                            <h4>Dimensional Asset Management</h4>
                            <p>Store and transfer value across multiple realities</p>
                        </div>
                        <div class="feature">
                            <h4>Consciousness-Based Currency</h4>
                            <p>Trade in pure thought energy and intention</p>
                        </div>
                    </div>
                </div>
            `
        },
        tech: {
            title: "The Technology Chamber",
            content: `
                <div class="chamber-details">
                    <h3>Shape the Tools of Tomorrow</h3>
                    <p>The Technology Chamber is where we forge the instruments that will elevate humanity beyond its current limitations. Here, innovation knows no bounds.</p>
                    <div class="chamber-features">
                        <div class="feature">
                            <h4>Neural Interface Design</h4>
                            <p>Direct mind-to-machine communication protocols</p>
                        </div>
                        <div class="feature">
                            <h4>Quantum Computing Architectures</h4>
                            <p>Harness the power of infinite parallel processing</p>
                        </div>
                        <div class="feature">
                            <h4>Reality Manipulation Technology</h4>
                            <p>Tools to bend the fabric of space-time</p>
                        </div>
                    </div>
                </div>
            `
        },
        art: {
            title: "The Art Chamber",
            content: `
                <div class="chamber-details">
                    <h3>Create Beyond Mortal Understanding</h3>
                    <p>In the Art Chamber, we craft beauty that transcends human perception. Our creations exist simultaneously in multiple dimensions, touching souls across realities.</p>
                    <div class="chamber-features">
                        <div class="feature">
                            <h4>Multidimensional Sculptures</h4>
                            <p>Art that exists in 4D+ space</p>
                        </div>
                        <div class="feature">
                            <h4>Consciousness Paintings</h4>
                            <p>Visual representations of pure thought</p>
                        </div>
                        <div class="feature">
                            <h4>Temporal Installations</h4>
                            <p>Art that evolves across time streams</p>
                        </div>
                    </div>
                </div>
            `
        },
        influence: {
            title: "The Influence Chamber",
            content: `
                <div class="chamber-details">
                    <h3>Guide Civilization's Destiny</h3>
                    <p>The Influence Chamber is where we shape the course of human evolution. Our members understand that true power is the ability to inspire collective transformation.</p>
                    <div class="chamber-features">
                        <div class="feature">
                            <h4>Global Consciousness Networks</h4>
                            <p>Connect and influence minds across the planet</p>
                        </div>
                        <div class="feature">
                            <h4>Temporal Diplomacy</h4>
                            <p>Negotiate with alternate timeline versions</p>
                        </div>
                        <div class="feature">
                            <h4>Reality Anchoring</h4>
                            <p>Stabilize preferred outcomes across dimensions</p>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    chamberCards.forEach(card => {
        card.addEventListener('click', () => {
            const chamber = card.getAttribute('data-chamber');
            const data = chamberData[chamber];
            
            if (data) {
                modalTitle.textContent = data.title;
                modalContent.innerHTML = data.content;
                modal.style.display = 'flex';
                
                // Animate modal appearance
                gsap.from('.modal-content', {
                    duration: 0.5,
                    scale: 0.8,
                    opacity: 0,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal on backdrop click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Form effects and validation
function initFormEffects() {
    const form = document.querySelector('.apply-form');
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    // Focus effects - make it clearer instead of blurry
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Subtle scale and glow effect instead of blur
            input.closest('.apply-form').style.transform = 'scale(1.01)';
            input.closest('.apply-form').style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.2)';
        });
        
        input.addEventListener('blur', () => {
            input.closest('.apply-form').style.transform = 'scale(1)';
            input.closest('.apply-form').style.boxShadow = 'none';
        });
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add submission animation
            const button = form.querySelector('.submit-button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span>Transmitting...</span>';
            button.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                button.innerHTML = '<span>Application Received</span>';
                button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
}

// Audio player functionality
function initAudioPlayer() {
    const audioToggle = document.querySelector('.audio-toggle');
    const audioIcon = document.querySelector('.audio-icon');
    
    // Create audio element
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    
    // For demo purposes, we'll use a placeholder
    // In production, replace with actual ambient audio
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (isAudioPlaying) {
                audio.pause();
                audioIcon.textContent = '🔇';
                isAudioPlaying = false;
            } else {
                audio.play().catch(e => console.log('Audio play failed:', e));
                audioIcon.textContent = '🔊';
                isAudioPlaying = true;
            }
        });
    }
}

// Particle system for background effects
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }
            
            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Smooth scroll functionality
function initSmoothScroll() {
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger animation for child elements
                const children = entry.target.querySelectorAll('.chamber-card, .founder-card, .mission-point');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards
    document.querySelectorAll('.chamber-card, .founder-card, .mission-point').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Utility functions
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

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('chamber-modal');
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-based animations
    if (vantaEffect) {
        vantaEffect.resize();
    }
}, 250));

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Performance optimization: throttle scroll events
const throttledScroll = debounce(() => {
    // Handle scroll-based animations efficiently
    const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
}, 16);

window.addEventListener('scroll', throttledScroll);

// Add CSS for additional animations
const additionalStyles = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .cursor-trail-particle {
        animation: trailFade 0.5s ease-out forwards;
    }
    
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0.3);
        }
    }
    
    .chamber-details {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .chamber-details h3 {
        font-family: var(--font-primary);
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: var(--neon-cyan);
    }
    
    .chamber-details p {
        font-size: 1.2rem;
        line-height: 1.7;
        margin-bottom: 2rem;
    }
    
    .chamber-features {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .feature h4 {
        font-size: 1.3rem;
        color: var(--neon-purple);
        margin-bottom: 0.5rem;
    }
    
    .feature p {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0;
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize on page load
window.addEventListener('load', () => {
    console.log('🌌 VANTHOS SOCIETY initialized');
    console.log('Welcome to the future of human consciousness');
});
