document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const heroVideo = document.querySelector("#heroVideo");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Navbar muda de cor no scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // 2. Efeito Parallax sutil no vídeo do topo baseado no scroll
        if (heroVideo && window.scrollY < window.innerHeight) {
            let scrollOffset = window.scrollY * 0.4;
            heroVideo.style.transform = `translateY(${scrollOffset}px)`;
        }
    });

    // 3. Sistema inteligente para revelar elementos ao descer a tela (Scroll Reveal)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Uma vez animado, não precisa observar mais
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível na tela
    });

    // Seleciona todos os blocos com a classe de animação e joga no observador
    const elementsToReveal = document.querySelectorAll(".reveal-scroll");
    elementsToReveal.forEach(el => scrollObserver.observe(el));


    // 4. Algoritmo de oscilação estável do Chat (Entre 10 e 40 pessoas)
    let currentPeople = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 7) - 3; // varia de -3 a +3
        currentPeople += change;

        if (currentPeople < 10) currentPeople = 10 + Math.floor(Math.random() * 3);
        if (currentPeople > 40) currentPeople = 40 - Math.floor(Math.random() * 3);

        if (counterElement) counterElement.textContent = currentPeople;

        const nextInterval = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(updateCounter, nextInterval);
    }

    if (counterElement) setTimeout(updateCounter, 2000);
});
