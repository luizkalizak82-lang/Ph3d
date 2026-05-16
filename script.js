document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Seleção da estrutura mecânica
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.querySelector(".nozzle-head");
    
    // Seleção dos caminhos vetoriais geométricos das letras
    const pathP = document.getElementById("path-p");
    const pathH = document.getElementById("path-h");
    const path3 = document.getElementById("path-3");
    const pathD = document.getElementById("path-d");

    // 🚀 ENGINE DE ENGENHARIA DE IMPRESSÃO (Traçado Milimétrico)
    function executeVectorPrinting() {
        if (!axisX || !nozzleHead) return;

        const letters = [pathP, pathH, path3, pathD];

        // Prepara os vetores calculando o tamanho exato de cada traçado para o efeito de caneta
        letters.forEach(path => {
            if (path) {
                let length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
            }
        });

        // Cronograma de coordenada física X e Y do bico injetor mapeado por letra
        // Inicia do pezinho do P na base inferior (Y alto) e vai contornando
        let sequence = [
            // 🛠️ Imprimindo a Letra P (Sobe a perna, faz a curva e fecha no meio)
            { time: 500,  y: 130, x: 10, target: pathP },
            { time: 1200, y: 35,  x: 10, target: pathP },
            { time: 1800, y: 35,  x: 23, target: pathP },
            { time: 2400, y: 75,  x: 10, target: pathP },

            // 🛠️ Imprimindo a Letra H (Base esquerda subindo, corta e faz a direita)
            { time: 3200, y: 130, x: 28, target: pathH },
            { time: 3800, y: 35,  x: 28, target: pathH },
            { time: 4300, y: 75,  x: 33, target: pathH },
            { time: 4900, y: 130, x: 38, target: pathH },
            { time: 5400, y: 35,  x: 38, target: pathH },

            // 🛠️ Imprimindo o Número 3 (Curva de cima para o meio, depois curva de baixo)
            { time: 6200, y: 35,  x: 48, target: path3 },
            { time: 6900, y: 75,  x: 52, target: path3 },
            { time: 7600, y: 130, x: 48, target: path3 },

            // 🛠️ Imprimindo a Letra D (Sobe reto e faz o arco externo completo)
            { time: 8400, y: 130, x: 68, target: pathD },
            { time: 9000, y: 35,  x: 68, target: pathD },
            { time: 9800, y: 80,  x: 82, target: pathD },
            { time: 10400, y: 130, x: 74, target: pathD },

            // 🏁 Finalização: Bico sobe liberando o palco técnico limpo
            { time: 11400, y: 15,  x: 46, target: null }
        ];

        sequence.forEach(step => {
            setTimeout(() => {
                axisX.style.transform = `translateY(${step.y}px)`;
                nozzleHead.style.left = `${step.x}%`;
                
                if (step.target) {
                    step.target.classList.add("printing-active");
                }
            }, step.time);
        });
    }

    // Executa o desenho técnico estruturado
    executeVectorPrinting();

    // Menu Rolagem Navbar
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });

    // Scroll Reveal 
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal-scroll").forEach(el => scrollObserver.observe(el));

    // Contador Ativo de Tráfego do WhatsApp
    let activeClients = Math.floor(Math.random() * (22 - 12 + 1)) + 12;
    if (counterElement) counterElement.textContent = activeClients;

    function simulatedTraffic() {
        const variance = Math.floor(Math.random() * 3) - 1; 
        activeClients += variance;
        if (activeClients < 11) activeClients = 14;
        if (activeClients > 35) activeClients = 24;
        if (counterElement) counterElement.textContent = activeClients;
        setTimeout(simulatedTraffic, Math.floor(Math.random() * 3000) + 3000);
    }
    if (counterElement) setTimeout(simulatedTraffic, 3000);
});
