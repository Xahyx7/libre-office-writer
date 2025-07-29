// Global variables
let currentTopic = null;
const homePage = document.getElementById('homePage');
const topicIntro = document.getElementById('topicIntro');
const backButton = document.getElementById('backButton');
const topicIconLarge = document.getElementById('topicIconLarge');
const topicTitle = document.getElementById('topicTitle');
const topicSubtitle = document.getElementById('topicSubtitle');

// Function to show home page
function showHome() {
    // Hide all topic pages
    const topicPages = document.querySelectorAll('.topic-page');
    topicPages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // Show home page
    homePage.style.display = 'block';
    backButton.style.display = 'none';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    currentTopic = null;
}

// Function to show topic with animation
function showTopic(topicId, icon, title, subtitle) {
    // Set topic intro content
    topicIconLarge.textContent = icon;
    topicTitle.textContent = title;
    topicSubtitle.textContent = subtitle;
    
    // Show topic intro overlay
    topicIntro.classList.add('show');
    
    // Hide topic intro after animation and show content
    setTimeout(() => {
        topicIntro.classList.remove('show');
        
        // Hide home page
        homePage.style.display = 'none';
        
        // Hide all topic pages first
        const topicPages = document.querySelectorAll('.topic-page');
        topicPages.forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show selected topic page
        const selectedTopic = document.getElementById(topicId);
        if (selectedTopic) {
            selectedTopic.style.display = 'block';
            selectedTopic.classList.add('active');
            currentTopic = topicId;
        }
        
        // Show back button
        backButton.style.display = 'block';
        
        // Scroll to top
        window.scrollTo(0, 0);
    }, 2000);
}

// Clean up intro overlays after they finish
window.addEventListener('load', () => {
    // Remove logo intro after 6 seconds
    setTimeout(() => {
        const logoIntro = document.getElementById('logoIntro');
        if (logoIntro) {
            logoIntro.remove();
        }
    }, 6000);
    
    // Remove secondary intro after 10 seconds
    setTimeout(() => {
        const secondaryIntro = document.getElementById('secondaryIntro');
        if (secondaryIntro) {
            secondaryIntro.remove();
        }
    }, 10000);
});

// Handle browser back button
window.addEventListener('popstate', () => {
    if (currentTopic) {
        showHome();
    }
});

// Add smooth scrolling for any internal links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key returns to home
    if (e.key === 'Escape' && currentTopic) {
        showHome();
    }
});

// Add click effects to topic cards
document.addEventListener('DOMContentLoaded', () => {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
});

// Optimize performance by hiding/showing content
function optimizePerformance() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe content sections for fade-in effects
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize performance optimizations after main content loads
setTimeout(optimizePerformance, 11000);

// Prevent zooming on mobile double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add loading states for better UX
function addLoadingStates() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add loading state
            const originalContent = card.innerHTML;
            card.innerHTML = '<div style="text-align: center; padding: 2rem;"><div style="font-size: 2rem;">⏳</div><p>Loading...</p></div>';
            
            // Restore content after topic loads
            setTimeout(() => {
                card.innerHTML = originalContent;
            }, 2100);
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);
