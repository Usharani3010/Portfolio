// ===== Portfolio Website JavaScript =====
// Author: Your Name
// Description: Interactive functionality for modern portfolio website

// ===== DOM Elements =====
const header = document.getElementById('header');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const typingText = document.getElementById('typingText');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');

// Check if all required elements are found
console.log('DOM Elements Check:', {
  header: !!header,
  navMenu: !!navMenu,
  menuToggle: !!menuToggle,
  themeToggle: !!themeToggle,
  typingText: !!typingText,
  scrollTopBtn: !!scrollTopBtn,
  contactForm: !!contactForm
});

// ===== Typing Animation =====
class TypingAnimation {
  constructor(element, words, speed = 100) {
    this.element = element;
    this.words = words;
    this.speed = speed;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation
const typingWords = [
  'Aspiring Web Developer',
  'AI Enthusiast',
  'Java Learner',
  'Power BI Explorer'
];

if (typingText) {
  try {
    new TypingAnimation(typingText, typingWords, 100);
    console.log('Typing animation initialized successfully');
  } catch (error) {
    console.error('Error initializing typing animation:', error);
  }
} else {
  console.warn('Typing text element not found');
}

// ===== Theme Toggle =====
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.updateThemeIcon();
    
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (this.currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// ===== Mobile Menu Toggle =====
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    menuToggle.addEventListener('click', () => {
      this.toggle();
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateMenu();
  }

  open() {
    this.isOpen = true;
    this.updateMenu();
  }

  close() {
    this.isOpen = false;
    this.updateMenu();
  }

  updateMenu() {
    navMenu.classList.toggle('active', this.isOpen);
    menuToggle.classList.toggle('active', this.isOpen);
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }
}

// Initialize mobile menu
const mobileMenu = new MobileMenu();

// ===== Smooth Scrolling Navigation =====
class SmoothScrolling {
  constructor() {
    this.init();
  }

  init() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Initialize smooth scrolling
const smoothScrolling = new SmoothScrolling();

// ===== Header Scroll Effect =====
class HeaderScrollEffect {
  constructor() {
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class for styling
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }
}

// Initialize header scroll effect
const headerScrollEffect = new HeaderScrollEffect();

// ===== Scroll to Top Button =====
class ScrollToTop {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.toggleButton();
    });

    scrollTopBtn.addEventListener('click', () => {
      this.scrollToTop();
    });
  }

  toggleButton() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Initialize scroll to top
const scrollToTop = new ScrollToTop();

// ===== Scroll Animations =====
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.observeElements();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, this.observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// ===== Skills Progress Animation =====
class SkillsAnimation {
  constructor() {
    this.init();
  }

  init() {
    this.observeSkills();
  }

  observeSkills() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
  }

  animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach(fill => {
      const percent = fill.getAttribute('data-percent');
      setTimeout(() => {
        fill.style.width = percent + '%';
      }, 200);
    });
  }
}

// Initialize skills animation
const skillsAnimation = new SkillsAnimation();

// ===== Form Validation =====
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation
    this.setupValidation();
  }

  setupValidation() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        this.clearError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    this.clearError(field);

    // Validation rules
    switch (fieldName) {
      case 'name':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters long';
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      
      case 'message':
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters long';
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  }

  showError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      field.classList.add('error');
    }
  }

  clearError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
      errorElement.textContent = '';
      field.classList.remove('error');
    }
  }

  validateForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await this.simulateSubmission();
      
      // Show success message
      this.showSuccessMessage();
      contactForm.reset();
      
    } catch (error) {
      // Show error message
      this.showErrorMessage();
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  async simulateSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Message sent successfully! I'll get back to you soon.</span>
    `;
    
    contactForm.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>Something went wrong. Please try again later.</span>
    `;
    
    contactForm.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

// Initialize contact form
const contactFormHandler = new ContactForm();

// ===== Active Navigation Highlighting =====
class NavigationHighlighting {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.highlightActiveSection();
    });
  }

  highlightActiveSection() {
    const scrollPosition = window.scrollY + 200;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Initialize navigation highlighting
const navigationHighlighting = new NavigationHighlighting();

// ===== Parallax Effect =====
class ParallaxEffect {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.applyParallax();
    });
  }

  applyParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// Initialize parallax effect
const parallaxEffect = new ParallaxEffect();

// ===== Particle Background Effect =====
class ParticleBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.particleCount = 50;
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particle-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.3;
    `;
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle background (optional - can be disabled for performance)
// const particleBackground = new ParticleBackground();

// ===== Performance Optimizations =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Throttle scroll events
    this.throttleScroll();
    
    // Lazy load images
    this.lazyLoadImages();
  }

  throttleScroll() {
    let ticking = false;
    
    const updateScroll = () => {
      // Update scroll-dependent elements here
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize performance optimizations
const performanceOptimizer = new PerformanceOptimizer();

// ===== Utility Functions =====
const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
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
  },

  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  },

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }
};

// ===== Initialize Everything When DOM is Loaded =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded successfully! 🚀');
  
  // Add loading animation to page
  document.body.classList.add('loaded');
  
  // Initialize any additional features here
  // For example, you could add:
  // - Cookie consent
  // - Analytics
  // - Social media sharing
  // - Print functionality
  // - Keyboard shortcuts
});

// ===== Export for Module Usage (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TypingAnimation,
    ThemeManager,
    MobileMenu,
    SmoothScrolling,
    HeaderScrollEffect,
    ScrollToTop,
    ScrollAnimations,
    SkillsAnimation,
    ContactForm,
    NavigationHighlighting,
    ParallaxEffect,
    ParticleBackground,
    PerformanceOptimizer,
    utils
  };
}
