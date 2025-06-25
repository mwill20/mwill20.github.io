// Set theme based on user preference or saved preference
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user preference, if any, on load
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleScroll);
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Add active class to current section in navigation
    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update the theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save the preference
    localStorage.setItem('theme', newTheme);
    
    // Update the toggle icon
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navbar scroll effect
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
}

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Initialize animations when elements come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// MCP Ecosystem functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize MCP Ecosystem interactivity
    initMCPEcosystem();
});

function initMCPEcosystem() {
    const ecosystemNodes = document.querySelectorAll('.ecosystem-node');
    const projectDetailsPanel = document.querySelector('.project-details-panel');
    
    if (!ecosystemNodes.length || !projectDetailsPanel) return;
    
    // Set the first project as active by default
    const defaultProject = projectDetailsPanel.querySelector('.project-details-content');
    if (defaultProject) {
        defaultProject.classList.add('active');
    }
    
    // Add click event listeners to all ecosystem nodes
    ecosystemNodes.forEach(node => {
        node.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (!projectId) return;
            
            // Update active state
            ecosystemNodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding project details
            const projectContent = document.getElementById(projectId);
            if (projectContent) {
                // Hide all project contents first
                document.querySelectorAll('.project-details-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected project content
                projectContent.classList.add('active');
                
                // Scroll to details panel if on mobile
                if (window.innerWidth <= 768) {
                    projectDetailsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
        
        // Add hover effect
        node.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }
        });
    });
}

// Run animations on load and scroll
window.addEventListener('load', function() {
    animateOnScroll();
    // Initialize MCP Ecosystem after a short delay to ensure DOM is ready
    setTimeout(initMCPEcosystem, 100);
});
window.addEventListener('scroll', animateOnScroll);
