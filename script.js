document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: Add animation class
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // height of fixed header + some padding
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Handling
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic Validation (HTML5 handles most)
            const name = form.querySelector('input[type="text"]').value;
            const service = form.querySelector('select').value;

            if (name && service) {
                // Construct WhatsApp message
                const phone = "358417225410";
                const message = `Hi Nordic Shine, I am ${name}. I'm interested in ${service}.`;
                const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

                // Option 1: Redirect to WhatsApp
                // window.open(whatsappUrl, '_blank');

                // Option 2: Show success message (since prompt asked for contact form)
                alert(`Thank you, ${name}! Your request for ${service} has been received. We will contact you shortly.`);
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Scroll Animation (Simple Fade-in)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card, .feature-item, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class style dynamically or just use inline styles above to simplify
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
