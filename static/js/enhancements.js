// Performance and UX enhancements for Alien101 site
(function() {
    'use strict';

    // Lazy load image handler - add loaded class when image loads
    function handleImageLoad() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        lazyImages.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    }

    // Smooth fade-in animation for sections on scroll
    function fadeInOnScroll() {
        const sections = document.querySelectorAll('section');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Add hover effect to portfolio items
    function enhancePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.item');

        portfolioItems.forEach(item => {
            item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Add animation to nav items on hover
    function enhanceNavigation() {
        const navItems = document.querySelectorAll('#nav a');

        navItems.forEach(link => {
            link.style.transition = 'all 0.3s ease';

            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Optimize iframe loading for Vimeo videos
    function optimizeVideoEmbeds() {
        const iframes = document.querySelectorAll('iframe[src*="vimeo"]');

        iframes.forEach(iframe => {
            // Add loading attribute if not present
            if (!iframe.hasAttribute('loading')) {
                iframe.setAttribute('loading', 'lazy');
            }

            // Observe when iframe enters viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add a subtle fade-in effect
                        iframe.style.opacity = '0';
                        iframe.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            iframe.style.opacity = '1';
                        }, 100);
                        observer.unobserve(iframe);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(iframe);
        });
    }

    // Add smooth button hover effects
    function enhanceButtons() {
        const buttons = document.querySelectorAll('.button, button');

        buttons.forEach(button => {
            button.style.transition = 'all 0.3s ease';

            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Performance: Reduce motion for users who prefer it
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            // Disable animations
            document.querySelectorAll('*').forEach(el => {
                el.style.animation = 'none';
                el.style.transition = 'none';
            });
        }
    }

    // Initialize all enhancements when DOM is ready
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runEnhancements);
        } else {
            runEnhancements();
        }
    }

    function runEnhancements() {
        respectReducedMotion();
        handleImageLoad();
        fadeInOnScroll();
        enhancePortfolioItems();
        enhanceNavigation();
        optimizeVideoEmbeds();
        enhanceButtons();
    }

    // Start initialization
    init();

})();
