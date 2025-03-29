// Wait for DOM to be fully loaded before executing code
document.addEventListener("DOMContentLoaded", () => {
    // Initialize modules
    initializeSocialBanner();
    initializeNavbar();
    initializeHeroSlider();
    initializeScrollAnimations();
    initializeStatCounters();
    initializeGallery();
    
    // Initialize AOS animations library with better performance settings
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile for better performance
    });
  });
  
  // Social Banner Module
  function initializeSocialBanner() {
    const socialBanner = document.querySelector('.social-banner');
    const cards = document.querySelectorAll('.social-card');
    
    if (!socialBanner || cards.length === 0) return;
    
    const backgroundColors = {
      facebook: '#00467E',
      whatsapp: '#25D366',
      instagram: 'linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)'
    };
    
    const defaultBackground = '#1e293b';
    
    cards.forEach(card => {
      // Determine card type once instead of on every mouseenter
      const type = card.classList.contains('facebook') ? 'facebook' :
                   card.classList.contains('whatsapp') ? 'whatsapp' : 'instagram';
      
      card.addEventListener('mouseenter', () => {
        socialBanner.style.background = backgroundColors[type];
      });
      
      card.addEventListener('mouseleave', () => {
        socialBanner.style.background = defaultBackground;
      });
    });
  }
  
  // Navbar Module
  function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar) return;
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          scrollTimeout = null;
        }, 10);
      }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    }
  }
  
  // Hero Slider Module
  function initializeHeroSlider() {
    const slides = document.querySelectorAll(".slide");
    const navButtons = document.querySelectorAll(".slider-nav-btn");
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 seconds
    
    const showSlide = (index, direction = "right") => {
      // Remove all active classes first
      slides.forEach((slide) => {
        slide.classList.remove("active", "slide-right", "slide-left", "slide-up", "slide-down");
      });
      
      // Add appropriate classes
      if (index < slides.length) {
        slides[index].classList.add("active", `slide-${direction}`);
      }
      
      navButtons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    };
    
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex, "right");
    };
    
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex, "left");
    };
    
    const resetSlideInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideDelay);
    };
    
    // Add event listeners to navigation buttons
    navButtons.forEach((button, i) => {
      button.addEventListener("click", () => {
        const direction = i > currentIndex ? "right" : "left";
        currentIndex = i;
        showSlide(currentIndex, direction);
        resetSlideInterval();
      });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetSlideInterval();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetSlideInterval();
      }
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const minSwipeDistance = 50;
      if (touchStartX - touchEndX > minSwipeDistance) {
        nextSlide();
        resetSlideInterval();
      } else if (touchEndX - touchStartX > minSwipeDistance) {
        prevSlide();
        resetSlideInterval();
      }
    };
    
    // Add touch events to slider container
    const sliderContainer = slides[0]?.parentElement;
    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Start slideshow
    showSlide(0);
    slideInterval = setInterval(nextSlide, slideDelay);
    
    // Pause slideshow when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(slideInterval);
      } else {
        resetSlideInterval();
      }
    });
  }
  
  // Scroll Animation Module
  function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          // Unobserve after animation is triggered for better performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.hidden').forEach(el => {
      observer.observe(el);
    });
  }


  //impact section counter
  document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        let count = 0;
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const increment = target / 50; 
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count) + "+";
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+"; 
            }
        };
        updateCount();
    });
});
  
  // Stats Counter Module
  function initializeStatCounters() {
    const statsSection = document.querySelector('.impact-section');
    if (!statsSection) return;
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      // Use requestAnimationFrame for smoother animation
      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for more natural counting
        const easeOutQuad = t => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        const currentCount = Math.floor(easedProgress * target);
        counter.textContent = currentCount.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      requestAnimationFrame(updateCounter);
    };
    
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        statObserver.disconnect();
      }
    }, {
      threshold: 0.3,
      rootMargin: '0px'
    });
    
    statObserver.observe(statsSection);
  }
  
  // Gallery Module
  function initializeGallery() {
    // Cache DOM elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    
    // Early return if no gallery items found or modal doesn't exist
    if (galleryItems.length === 0 || !modal) {
        console.warn('Gallery elements not found to initialize.');
        return;
    }
    
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = modal.querySelector('.close-modal');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Open modal function
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Preload adjacent images for smoother experience
    function preloadAdjacentImages(index) {
        const preloadImages = [];
        const nextIndex = (index + 1) % galleryItems.length;
        const prevIndex = (index - 1 + galleryItems.length) % galleryItems.length;
        
        const nextImgSrc = getImageSource(galleryItems[nextIndex]);
        const prevImgSrc = getImageSource(galleryItems[prevIndex]);
        
        if (nextImgSrc) {
            const nextImg = new Image();
            nextImg.src = nextImgSrc;
            preloadImages.push(nextImg);
        }
        
        if (prevImgSrc) {
            const prevImg = new Image();
            prevImg.src = prevImgSrc;
            preloadImages.push(prevImg);
        }
        
        return preloadImages;
    }
    
    // Helper function to get image source
    function getImageSource(item) {
        return item.querySelector('img')?.src || item.getAttribute('data-image');
    }
    
    // Helper function to get image caption
    function getImageCaption(item) {
        return item.getAttribute('data-caption') || 
               item.querySelector('.gallery-overlay h3')?.textContent || '';
    }
    
    // Show modal with specific image
    function showImage(index) {
        loadingSpinner.style.display = 'block';
        currentImageIndex = index;
        
        const imgSrc = getImageSource(galleryItems[index]);
        const caption = getImageCaption(galleryItems[index]);
        
        if (imgSrc) {
            // Set up image load event
            modalImage.onload = function() {
                loadingSpinner.style.display = 'none';
                modalImage.style.opacity = 1;
            };
            
            modalImage.onerror = function() {
                loadingSpinner.style.display = 'none';
                modalImage.src = 'placeholder.jpg'; // Fallback image
                modalCaption.textContent = 'Image could not be loaded';
            };
            
            // Reset opacity before changing source
            modalImage.style.opacity = 0;
            modalImage.src = imgSrc;
            modalCaption.textContent = caption;
            
            // Preload adjacent images
            preloadAdjacentImages(index);
        } else {
            console.error('No image source found for gallery item');
            loadingSpinner.style.display = 'none';
        }
    }
    
    // Open modal with clicked image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
            showImage(index);
            
            // Animate modal appearance
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
        
        // Keyboard accessibility
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                item.click();
            }
        });
    });
    
    // Close modal
    function closeModalFunc() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    
    // Close on click outside image
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Next image
    function showNextImage() {
        showImage((currentImageIndex + 1) % galleryItems.length);
    }
    
    // Previous image
    function showPrevImage() {
        showImage((currentImageIndex - 1 + galleryItems.length) % galleryItems.length);
    }
    
    // Next and previous buttons
    modalNext.addEventListener('click', (event) => {
        event.stopPropagation();
        showNextImage();
    });
    
    modalPrev.addEventListener('click', (event) => {
        event.stopPropagation();
        showPrevImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            switch(event.key) {
                case 'Escape':
                    closeModalFunc();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
            }
        }
    });
    
    // Touch gestures for mobile
    modal.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    }, { passive: true });
    
    function handleGesture() {
        const threshold = 50; // Minimum distance for swipe
        if (touchEndX < touchStartX - threshold) {
            // Swiped left
            showNextImage();
        } else if (touchEndX > touchStartX + threshold) {
            // Swiped right
            showPrevImage();
        }
    }
    
    // Lazy load gallery images
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });
        
        document.querySelectorAll('.gallery-item img').forEach((img) => {
            lazyImageObserver.observe(img);
        });
    }
  }