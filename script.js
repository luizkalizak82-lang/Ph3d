document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Controle da transparência do Menu Superior dinâmico
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Scroll Reveal: Efeito dinâmico de aparição suave dos elementos
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

    // 3. Mecanismo de Flutuação Realista do Contador Online
    let currentPeople = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 3) - 1; // Produz variação de -1, 0 ou +1
        currentPeople += change;

        // Mantém as margens controladas e verossímeis
        if (currentPeople < 11) currentPeople = 13;
        if (currentPeople > 35) currentPeople = 26;

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 3000);
    }

    if (counterElement) setTimeout(updateCounter, 3000);
});
