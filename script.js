document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Elementos da mecânica industrial da impressora
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.querySelector(".nozzle-head");
    
    // Caminhos vetoriais das letras
    const pathP = document.getElementById("path-p");
    const pathH = document.getElementById("path-h");
    const path3 = document.getElementById("path-3");
    const pathD = document.getElementById("path-d");

    // 🚀 ENGINE DE PROGRESSÃO MILIMÉTRICA POR COORDENADAS
    function startIndustrialVectorPrinting() {
        if (!axisX || !nozzleHead) return;

        // Dicionário para armazenar o comprimento total exato de cada vetor matemático
        const lengths = {
            p: pathP.getTotalLength(),
            h: pathH.getTotalLength(),
            3: path3.getTotalLength(),
            d: pathD.getTotalLength()
        };

        // Reseta fisicamente todas as letras para o estado "não impresso" (oculto)
        pathP.style.strokeDasharray = lengths.p; pathP.style.strokeDashoffset = lengths.p;
        pathH.style.strokeDasharray = lengths.h; pathH.style.strokeDashoffset = lengths.h;
        path3.style.strokeDasharray = lengths.3; path3.style.strokeDashoffset = lengths.3;
        pathD.style.strokeDasharray = lengths.d; pathD.style.strokeDashoffset = lengths.d;

        // Posição inicial do Frame Mecânico
        axisX.style.transform = "translateY(260px)"; 
        nozzleHead.style.left = "5%";

        // 🗺️ CRONOGRAMA DE IMPRESSÃO PASSO A PASSO (Sincronia Extrusor + Traçado)
        let timeline = [
            // --- LETRA P ---
            { time: 500,  y: 240, x: 10, element: pathP, offset: lengths.p }, // Posiciona no pezinho do P
            { time: 1000, y: 70,  x: 10, element: pathP, offset: lengths.p * 0.65 }, // Sobe reto a haste esquerda
            { time: 1500, y: 70,  x: 21, element: pathP, offset: lengths.p * 0.30 }, // Faz a curva superior
            { time: 2000, y: 150, x: 10, element: pathP, offset: 0 }, // Conclui e fecha a barriga do P no meio

            // --- LETRA H ---
            { time: 2600, y: 240, x: 26, element: pathH, offset: lengths.h }, // Vai para o pé esquerdo do H
            { time: 3200, y: 70,  x: 26, element: pathH, offset: lengths.h * 0.66 }, // Sobe a perna esquerda
            { time: 3700, y: 150, x: 35, element: pathH, offset: lengths.h * 0.45 }, // Cruza a ponte central do H
            { time: 4200, y: 240, x: 35, element: pathH, offset: lengths.h * 0.20 }, // Desce até o pé direito
            { time: 4800, y: 70,  x: 35, element: pathH, offset: 0 }, // Sobe completando a perna direita do H

            // --- NÚMERO 3 ---
            { time: 5500, y: 80,  x: 44, element: path3, offset: lengths.3 }, // Posiciona no topo do 3
            { time: 6200, y: 150, x: 49, element: path3, offset: lengths.3 * 0.50 }, // Faz o primeiro arco até o meio
            { time: 7000, y: 230, x: 44, element: path3, offset: 0 }, // Faz o arco inferior até a base do 3

            // --- LETRA D ---
            { time: 7700, y: 240, x: 63, element: pathD, offset: lengths.d }, // Posiciona no pé traseiro do D
            { time: 8300, y: 70,  x: 63, element: pathD, offset: lengths.d * 0.70 }, // Sobe a linha reta vertical
            { time: 9100, y: 70,  x: 78, element: pathD, offset: lengths.d * 0.35 }, // Inicia a grande curva externa
            { time: 9800, y: 240, x: 63, element: pathD, offset: 0 }, // Fecha o D embaixo na junção da base

            // --- CONCLUSÃO ---
            { time: 10800, y: 20,  x: 46, element: null, offset: 0 } // Recolhe o cabeçote pra cima limpando o palco
        ];

        // Roda a engrenagem aplicando os estilos de movimentação e liberação de traço
        timeline.forEach(step => {
            setTimeout(() => {
                axisX.style.transform = `translateY(${step.y}px)`;
                nozzleHead.style.left = `${step.x}%`;
                
                if (step.element) {
                    step.element.classList.add("printing-active");
                    step.element.style.strokeDashoffset = step.offset;
                }
            }, step.time);
        });
    }

    // Executa a animação ativa
    startIndustrialVectorPrinting();

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

    // Contador de Usuários Ativos (WhatsApp)
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
