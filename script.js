document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Navbar muda de cor após o início do Scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Elementos surgindo na tela dinamicamente conforme o usuário rola a tela (Scroll Reveal)
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

    // 3. Algoritmo de oscilação do Contador Gatilho (Entre 10 e 40)
    let currentPeople = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 5) - 2; 
        currentPeople += change;

        if (currentPeople < 10) currentPeople = 10 + Math.floor(Math.random() * 2);
        if (currentPeople > 40) currentPeople = 40 - Math.floor(Math.random() * 2);

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 2000);
    }

    if (counterElement) setTimeout(updateCounter, 2000);
});
