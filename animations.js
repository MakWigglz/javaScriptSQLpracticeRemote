document.addEventListener('DOMContentLoaded', (event) => {
    // Fade in the form
    const form = document.getElementById('survey-form');
    form.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            form.style.opacity = opacity;
        } else {
            clearInterval(fadeIn);
        }
    }, 50);

    // Add a subtle bounce effect to form elements when they come into view
    const formElements = form.querySelectorAll('input, select, textarea, button');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounce 0.5s';
            }
        });
    }, { threshold: 0.5 });

    formElements.forEach(element => {
        observer.observe(element);
    });

    // Add a pulsing effect to the submit button
    const submitButton = document.querySelector('button[type="submit"]');
    setInterval(() => {
        submitButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
});