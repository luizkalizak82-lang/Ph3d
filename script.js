document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Motores estruturais da máquina
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.getElementById("printer-nozzle");
    const printerFrame = document.querySelector(".printer-frame");
    
    // Elementos vetoriais
    const pathP = document.getElementById("path-p");
    const pathH = document.getElementById("path-h");
    const path3 = document.getElementById("path-3");
    const pathD = document.getElementById("path-d");

    function startIndustrialVectorPrinting() {
        if (!axisX || !nozzleHead || !pathP || !pathH || !path3 || !pathD || !printerFrame) return;

        const lengths = {
            p: pathP.getTotalLength(),
            h: pathH.getTotalLength(),
            3: path3.getTotalLength(),
            d: pathD.getTotalLength()
        };

        // Encolhe os filamentos ocultando-os
        pathP.style.strokeDasharray = lengths.p; pathP.style.strokeDashoffset = lengths.p;
        pathH.style.strokeDasharray = lengths.h; pathH.style.strokeDashoffset = lengths.h;
        path3.style.strokeDasharray = lengths.3; path3.style.strokeDashoffset = lengths.3;
        pathD.style.strokeDasharray = lengths.d; pathD.style.strokeDashoffset = lengths.d;

        // Mapeamento dinâmico entre o viewBox (600x150) e o tamanho em tempo real da caixa
        function moverBico(svgX, svgY) {
            const frameWidth = printerFrame.clientWidth;
            const frameHeight = printerFrame.clientHeight;

            const paddingX = (frameWidth * 0.15) / 2;
            const paddingY = (frameHeight * 0.15) / 2;

            const realX = paddingX + (svgX / 600) * (frameWidth * 0.85);
            const realY = paddingY + (svgY / 150) * (frameHeight * 0.85);

            axisX.style.top = `${realY}px`;
            nozzleHead.style.left = `${realX - 18}px`; 
        }

        // Posição standby inicial
        moverBico(60, 15);

        // Cronograma com base direta nos pontos reais d="" das letras
        let timeline = [
            // --- Letra P ---
            { time: 600,  x: 60,  y: 130, element: pathP, offset: lengths.p },      
            { time: 1400, x: 60,  y: 30,  element: pathP, offset: lengths.p * 0.62 }, 
            { time: 2100, x: 110, y: 30,  element: pathP, offset: lengths.p * 0.28 }, 
            { time: 2800, x: 60,  y: 75,  element: pathP, offset: 0 },               

            // --- Letra H ---
            { time: 3500, x: 170, y: 130, element: pathH, offset: lengths.h },        
            { time: 4200, x: 170, y: 30,  element: pathH, offset: lengths.h * 0.65 }, 
            { time: 4800, x: 170, y: 75,  element: pathH, offset: lengths.h * 0.45 }, 
            { time: 5400, x: 225, y: 75,  element: pathH, offset: lengths.h * 0.20 }, 
            { time: 6100, x: 225, y: 30,  element: pathH, offset: 0 },               

            // --- Número 3 ---
            { time: 6800, x: 285, y: 35,  element: path3, offset: lengths.3 },        
            { time: 7600, x: 345, y: 50,  element: path3, offset: lengths.3 * 0.50 }, 
            { time: 8400, x: 285, y: 125, element: path3, offset: 0 },               

            // --- Letra D ---
            { time: 9200, x: 410, y: 130, element: pathD, offset: lengths.d },        
            { time: 9900, x: 410, y: 30,  element: pathD, offset: lengths.d * 0.70 }, 
            { time: 10700, x: 445, y: 30,  element: pathD, offset: lengths.d * 0.35 },
            { time: 11400, x: 410, y: 130, element: pathD, offset: 0 },               

            // --- Retorno Seguro ---
            { time: 12500, x: 300, y: 15,  element: null,  offset: 0 }                 
        ];

        // Disparador ordenado
        timeline.forEach(step => {
            setTimeout(() => {
                moverBico(step.x, step.y);
                if (step.element) {
                    step.element.classList.add("printing-active");
                    step.element.style.strokeDashoffset = step.offset;
                }
            }, step.time);
        });
    }

    startIndustrialVectorPrinting();

    // Comportamento do Topbar
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    });

    // Revelação passiva com scroll
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal-scroll").forEach(el => scrollObserver.observe(el));

    // Contador de Monitoramento Técnico
    let activeClients = Math.floor(Math.random() * (19 - 11 + 1)) + 11;
    if (counterElement) counterElement.textContent = activeClients;

    function simulatedTraffic() {
        const variance = Math.floor(Math.random() * 3) - 1; 
        activeClients += variance;
        if (activeClients < 9) activeClients = 12;
        if (activeClients > 28) activeClients = 16;
        if (counterElement) counterElement.textContent = activeClients;
        setTimeout(simulatedTraffic, Math.floor(Math.random() * 4000) + 4000);
    }
    if (counterElement) setTimeout(simulatedTraffic, 4000);
});
