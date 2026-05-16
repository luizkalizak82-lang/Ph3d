document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Seleção dos motores mecânicos
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.getElementById("printer-nozzle");
    
    // Caminhos das letras do logotipo
    const pathP = document.getElementById("path-p");
    const pathH = document.getElementById("path-h");
    const path3 = document.getElementById("path-3");
    const pathD = document.getElementById("path-d");

    function startIndustrialVectorPrinting() {
        if (!axisX || !nozzleHead || !pathP || !pathH || !path3 || !pathD) return;

        // Medição do tamanho dos caminhos vetoriais
        const lengths = {
            p: pathP.getTotalLength(),
            h: pathH.getTotalLength(),
            3: path3.getTotalLength(),
            d: pathD.getTotalLength()
        };

        // Recolhe o traçado para dentro do bico
        pathP.style.strokeDasharray = lengths.p; pathP.style.strokeDashoffset = lengths.p;
        pathH.style.strokeDasharray = lengths.h; pathH.style.strokeDashoffset = lengths.h;
        path3.style.strokeDasharray = lengths.3; path3.style.strokeDashoffset = lengths.3;
        pathD.style.strokeDasharray = lengths.d; pathD.style.strokeDashoffset = lengths.d;

        // Posição inicial no topo esquerdo
        axisX.style.top = "10%"; 
        nozzleHead.style.left = "5%";

        // Linha do tempo calculada por Porcentagem (%) para precisão responsiva
        let timeline = [
            // --- Letra P ---
            { time: 500,  y: 73, x: 10, element: pathP, offset: lengths.p },      
            { time: 1300, y: 30, x: 10, element: pathP, offset: lengths.p * 0.62 }, 
            { time: 2000, y: 30, x: 20, element: pathP, offset: lengths.p * 0.28 }, 
            { time: 2600, y: 50, x: 10, element: pathP, offset: 0 },               

            // --- Letra H ---
            { time: 3300, y: 73, x: 28, element: pathH, offset: lengths.h },        
            { time: 4100, y: 30, x: 28, element: pathH, offset: lengths.h * 0.65 }, 
            { time: 4700, y: 50, x: 37, element: pathH, offset: lengths.h * 0.45 }, 
            { time: 5400, y: 73, x: 37, element: pathH, offset: lengths.h * 0.20 }, 
            { time: 6100, y: 30, x: 37, element: pathH, offset: 0 },               

            // --- Número 3 ---
            { time: 6800, y: 32, x: 47, element: path3, offset: lengths.3 },        
            { time: 7600, y: 50, x: 53, element: path3, offset: lengths.3 * 0.50 }, 
            { time: 8400, y: 71, x: 47, element: path3, offset: 0 },               

            // --- Letra D ---
            { time: 9100, y: 73, x: 67, element: pathD, offset: lengths.d },        
            { time: 9800, y: 30, x: 67, element: pathD, offset: lengths.d * 0.70 }, 
            { time: 10600, y: 32, x: 81, element: pathD, offset: lengths.d * 0.35 },
            { time: 11300, y: 73, x: 73, element: pathD, offset: 0 },               

            // --- Fim e Recolhimento ---
            { time: 12400, y: 10, x: 45, element: null, offset: 0 }                 
        ];

        // Aplica os passos na ordem cronológica exata
        timeline.forEach(step => {
            setTimeout(() => {
                axisX.style.top = `${step.y}%`;
                nozzleHead.style.left = `${step.x}%`;
                
                if (step.element) {
                    step.element.classList.add("printing-active");
                    step.element.style.strokeDashoffset = step.offset;
                }
            }, step.time);
        });
    }

    startIndustrialVectorPrinting();

    // Scroll Navbar
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

    // Contador de Usuários Online
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
