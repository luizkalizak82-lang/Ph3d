document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Efeito de rolagem na navbar
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Scroll Reveal
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    const elementsToReveal = document.querySelectorAll(".reveal-scroll");
    elementsToReveal.forEach(el => scrollObserver.observe(el));

    // Contador Dinâmico de Atendimentos
    let currentPeople = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 3) - 1; 
        currentPeople += change;

        if (currentPeople < 11) currentPeople = 13;
        if (currentPeople > 35) currentPeople = 26;

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 3000);
    }

    if (counterElement) setTimeout(updateCounter, 3000);
});
