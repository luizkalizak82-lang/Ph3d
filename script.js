document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Configurações dos elementos da animação sequencial de impressão
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.querySelector(".nozzle-head");
    
    const letterP = document.getElementById("letter-p");
    const letterH = document.getElementById("letter-h");
    const letter3 = document.getElementById("letter-3");
    const letterD = document.getElementById("letter-d");

    // 1. ENGINE AUTOMÁTICA DA IMPRESSORA (Desenho letra por letra)
    function startPrintingProcess() {
        if (!axisX || !nozzleHead) return;

        // Reset inicial de estado físico
        axisX.style.transform = "translateY(190px)"; // Começa embaixo na cama
        nozzleHead.style.left = "0%";
        
        let timeline = [
            // Passo 1: Imprime a letra P
            { time: 500,  y: 130, x: 18, activeLetter: letterP },
            { time: 1200, y: 100, x: 24, activeLetter: letterP },
            
            // Passo 2: Move e imprime a letra H
            { time: 2000, y: 130, x: 40, activeLetter: letterH },
            { time: 2700, y: 100, x: 46, activeLetter: letterH },
            
            // Passo 3: Move e imprime o número 3
            { time: 3500, y: 130, x: 62, activeLetter: letter3 },
            { time: 4200, y: 100, x: 68, activeLetter: letter3 },
            
            // Passo 4: Move e imprime a letra D
            { time: 5000, y: 130, x: 82, activeLetter: letterD },
            { time: 5700, y: 100, x: 88, activeLetter: letterD },
            
            // Passo Final: Bico sobe e limpa a área de trabalho
            { time: 6800, y: 20,  x: 50, activeLetter: null }
        ];

        timeline.forEach(step => {
            setTimeout(() => {
                axisX.style.transform = `translateY(${step.y}px)`;
                nozzleHead.style.left = `${step.x}%`;
                
                if (step.activeLetter) {
                    step.activeLetter.classList.add("printed");
                }
            }, step.time);
        });
    }

    // Dispara o processo mecânico assim que carrega
    startPrintingProcess();

    // 2. Controle de Rolagem da Navbar
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Mecanismo Scroll Reveal
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

    // 4. Mecanismo do Contador Dinâmico do WhatsApp
    let currentPeople = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = currentPeople;

    function updateCounter() {
        const change = Math.floor(Math.random() * 3) - 1; 
        currentPeople += change;

        if (currentPeople < 11) currentPeople = 13;
        if (currentPeople > 35) currentPeople = 26;

        if (counterElement) counterElement.textContent = currentPeople;

        setTimeout(updateCounter, Math.floor(Math.random() * 3000) + 3000);
    }

    if (counterElement) setTimeout(updateCounter, 3000);
});
