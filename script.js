// Enhanced JavaScript for Frontend Battle Competition
// Implements all required features with smooth animations and interactions

class FrontendBattleApp {
  constructor() {
    this.currentSlide = 0;
    this.currentTestimonial = 0;
    this.isLoading = true;
    this.init();
  }

  init() {
    // Initialize all features
    this.initLoader();
    this.initNavigation();
    this.initThemeToggle();
    this.initCarousel();
    this.initTestimonials();
    this.initStats();
    this.initScrollEffects();
    this.initRippleEffect();
    this.initParallax();
    this.initAOS();
    this.initFormHandling();
    
    // Start the app after loader - reduced from 2500ms to 1200ms
    setTimeout(() => {
      this.hideLoader();
    }, 1200);
  }

  // Loader Implementation
  initLoader() {
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar');
    
    // Animate loading progress - faster animation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 20; // Increased from 15 to 20
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      loaderBar.style.width = progress + '%';
    }, 80); // Reduced from 100ms to 80ms
  }

  hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    this.isLoading = false;
    
    // Remove loader from DOM after animation
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }

  // Navigation Implementation
  initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle scroll effects on navbar
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Handle mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Smooth scroll to section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update active link
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          
          // Close mobile menu
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Theme Toggle Implementation (Light/Dark Mode)
  initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Apply theme with smooth transition
      document.documentElement.style.transition = 'all 0.3s ease';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      
      // Add subtle animation
      themeToggle.style.transform = 'scale(0.9)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
        document.documentElement.style.transition = '';
      }, 150);
    });
  }

  // Carousel Implementation - Enhanced for better showcase
  initCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!carouselTrack || slides.length === 0) return;

    const updateCarousel = () => {
      // Update slide positions with smooth transition
      carouselTrack.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      
      // Update active slide with enhanced animations
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentSlide);
        if (index === this.currentSlide) {
          slide.style.opacity = '1';
          slide.style.transform = 'scale(1)';
        } else {
          slide.style.opacity = '0.7';
          slide.style.transform = 'scale(0.95)';
        }
      });
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlide);
      });
    };

    const nextSlide = () => {
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.currentSlide = index;
        updateCarousel();
      });
    });

    // Auto-play carousel with longer interval
    setInterval(nextSlide, 6000);

    // Initialize
    updateCarousel();
  }

  // Testimonials Implementation
  initTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (testimonialSlides.length === 0) return;

    const updateTestimonial = () => {
      testimonialSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentTestimonial);
      });
    };

    const nextTestimonial = () => {
      this.currentTestimonial = (this.currentTestimonial + 1) % testimonialSlides.length;
      updateTestimonial();
    };

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 4000);
    updateTestimonial();
  }

  // Animated Stats Counter
  initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-count'));
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(targetValue * easeOutQuart);
            
            target.textContent = currentValue + (target.textContent.includes('%') ? '%' : '');
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              target.textContent = targetValue + (target.dataset.suffix || '');
            }
          };
          
          requestAnimationFrame(updateCount);
          observer.unobserve(target);
        }
      });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
      threshold: 0.5
    });

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  // Scroll Effects Implementation
  initScrollEffects() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Scroll reveal animations
    this.initScrollReveal();
  }

  // Scroll Reveal Animation
  initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // Ripple Effect Implementation
  initRippleEffect() {
    const rippleContainer = document.getElementById('ripple-container');
    const rippleButtons = document.querySelectorAll('.ripple-effect');

    // Create ripple on button click
    rippleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Global mouse ripple effect
    let isMouseRippleEnabled = true;
    
    document.addEventListener('click', (e) => {
      if (!isMouseRippleEnabled || e.target.closest('.ripple-effect')) return;

      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - 25) + 'px';
      ripple.style.top = (e.clientY - 25) + 'px';
      ripple.style.width = '50px';
      ripple.style.height = '50px';

      rippleContainer.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Parallax Effect Implementation
  initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating');
    let floatingOffset = 0;

    const animateFloating = () => {
      floatingOffset += 0.01;
      floatingElements.forEach((element, index) => {
        const yOffset = Math.sin(floatingOffset + index) * 10;
        element.style.transform = `translateY(${yOffset}px)`;
      });
      requestAnimationFrame(animateFloating);
    };

    if (floatingElements.length > 0) {
      animateFloating();
    }
  }

  // AOS (Animate On Scroll) Implementation
  initAOS() {
    // Custom AOS implementation for better control
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const checkAOS = () => {
      aosElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('aos-animate');
        }
      });
    };

    window.addEventListener('scroll', checkAOS);
    checkAOS(); // Initial check
  }

  // Form Handling
  initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          // Show success message
          this.showToast('Message sent successfully!', 'success');
          contactForm.reset();
          
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
  }

  // Toast Notification System
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
      </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--background-color);
      border: 1px solid var(--border-color);
      border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      padding: 1rem;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 25px var(--shadow-medium);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Utility Methods
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
  }

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
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Check if DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new FrontendBattleApp();
    });
  } else {
    new FrontendBattleApp();
  }
});

// Additional Interactive Features

// Smooth scrolling for anchor links
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

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
  // Add keyboard shortcuts
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case '/':
        e.preventDefault();
        // Focus search or navigation
        document.querySelector('.nav-link')?.focus();
        break;
    }
  }
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
    }
  }
});

if ('PerformanceObserver' in window) {
  performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Service Worker for offline capability (optional enhancement)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker registration would go here
    console.log('Service Worker support detected');
  });
}
