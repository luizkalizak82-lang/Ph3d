document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Navbar muda a opacidade do fundo durante a rolagem da página
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Scroll Reveal: ativa as seções suavemente ao rolar até elas
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

    // 3. Gerenciamento do Contador de pessoas ativas
    let currentPeople = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 3) - 1; // Flutua em -1, 0 ou +1
        currentPeople += change;

        // Mantém as variações dentro de um escopo orgânico e crível
        if (currentPeople < 10) currentPeople = 12;
        if (currentPeople > 35) currentPeople = 28;

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 3000);
    }

    if (counterElement) setTimeout(updateCounter, 3000);
});
