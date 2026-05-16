document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // 1. Efeito no Menu ao rolar a página (muda o fundo para não sumir no conteúdo)
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Scroll Reveal (Faz os blocos de texto e imagens surgirem suavemente ao rolar a tela)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); // Ativa a animação apenas uma vez
            }
        });
    }, {
        root: null,
        threshold: 0.1 // Ativa quando 10% da seção aparecer na tela
    });

    const elementsToReveal = document.querySelectorAll(".reveal-scroll");
    elementsToReveal.forEach(el => scrollObserver.observe(el));

    // 3. O Contador Dinâmico Automatizado (Gatilho de Urgência)
    // Começa com um número aleatório realista entre 12 e 22 baseado no seu print
    let currentPeople = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        // Altera o número de forma humana (sobe ou desce um pouquinho)
        const change = Math.floor(Math.random() * 3) - 1; // Pode ser -1, 0 ou +1
        currentPeople += change;

        // Mantém o contador dentro de um limite seguro e realista (entre 10 e 35)
        if (currentPeople < 10) currentPeople = 12;
        if (currentPeople > 35) currentPeople = 28;

        if (counterElement) {
            counterElement.textContent = currentPeople;
        }

        // Fica mudando o número aleatoriamente a cada 3 a 6 segundos
        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 3000);
    }

    // Inicializa a variação do contador após 3 segundos
    if (counterElement) setTimeout(updateCounter, 3000);
});
