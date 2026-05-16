document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const heroVideo = document.querySelector("#heroVideo");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Navbar ganha fundo denso ao rolar a página
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // 2. Parallax suave no vídeo de fundo da home
        if (heroVideo && window.scrollY < window.innerHeight) {
            let scrollOffset = window.scrollY * 0.4;
            heroVideo.style.transform = `translateY(${scrollOffset}px)`;
        }
    });

    // 3. Sistema para monitorar o scroll e fazer os elementos surgirem na tela
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); // Executa a animação apenas uma vez
            }
        });
    }, {
        root: null,
        threshold: 0.12 // Elemento surge ao expor 12% da sua área útil
    });

    const elementsToReveal = document.querySelectorAll(".reveal-scroll");
    elementsToReveal.forEach(el => scrollObserver.observe(el));


    // 4. Algoritmo de oscilação do Chat (Garante variação contínua entre 10 e 40)
    let currentPeople = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        // Gera flutuação leve (ex: entra ou sai 1 a 3 pessoas)
        const change = Math.floor(Math.random() * 7) - 3;
        currentPeople += change;

        // Limita a oscilação de forma natural nas extremidades
        if (currentPeople < 10) currentPeople = 10 + Math.floor(Math.random() * 4);
        if (currentPeople > 40) currentPeople = 40 - Math.floor(Math.random() * 4);

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        // Próxima mudança em um intervalo variável de 2.5 a 5.5 segundos
        const nextInterval = Math.floor(Math.random() * 3000) + 2500;
        setTimeout(updateCounter, nextInterval);
    }

    if (counterElement) setTimeout(updateCounter, 2000);
});
