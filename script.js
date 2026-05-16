document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Elementos mecânicos da extrusora
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.querySelector(".nozzle-head");
    
    // Elementos geométricos das letras
    const pathP = document.getElementById("path-p");
    const pathH = document.getElementById("path-h");
    const path3 = document.getElementById("path-3");
    const pathD = document.getElementById("path-d");

    // 🚀 AUTOMAÇÃO DE IMPRESSÃO TRAÇADO POR TRAÇADO
    function startIndustrialVectorPrinting() {
        if (!axisX || !nozzleHead || !pathP || !pathH || !path3 || !pathD) return;

        // Captura matemática exata do comprimento de cada caminho (linhas do filamento)
        const lengths = {
            p: pathP.getTotalLength(),
            h: pathH.getTotalLength(),
            3: path3.getTotalLength(),
            d: pathD.getTotalLength()
        };

        // Aplica o tamanho e "esconde" a linha puxando o offset completamente para trás
        pathP.style.strokeDasharray = lengths.p; pathP.style.strokeDashoffset = lengths.p;
        pathH.style.strokeDasharray = lengths.h; pathH.style.strokeDashoffset = lengths.h;
        path3.style.strokeDasharray = lengths.3; path3.style.strokeDashoffset = lengths.3;
        pathD.style.strokeDasharray = lengths.d; pathD.style.strokeDashoffset = lengths.d;

        // Estado inicial da máquina mecânica (Barra na base, cabeçote na esquerda)
        axisX.style.transform = "translateY(240px)"; 
        nozzleHead.style.left = "5%";

        // 🗺️ CRONOGRAMA DE OPERAÇÃO (Casamento exato: Cabeçote X/Y + Fração do traço liberado)
        let timeline = [
            // --- 🛠️ IMPRIMINDO A LETRA P ---
            { time: 600,  y: 220, x: 10, element: pathP, offset: lengths.p }, // Sincroniza com a base inferior do P
            { time: 1400, y: 55,  x: 10, element: pathP, offset: lengths.p * 0.60 }, // Sobe a perna vertical esquerda
            { time: 2200, y: 55,  x: 21, element: pathP, offset: lengths.p * 0.25 }, // Faz a voltinha redonda de cima
            { time: 2900, y: 130, x: 10, element: pathP, offset: 0 }, // Fecha o meio do P (Linha concluída!)

            // --- 🛠️ IMPRIMINDO A LETRA H ---
            { time: 3700, y: 220, x: 28, element: pathH, offset: lengths.h }, // Vai para o pezinho esquerdo do H
            { time: 4500, y: 55,  x: 28, element: pathH, offset: lengths.h * 0.65 }, // Sobe a primeira haste vertical
            { time: 5100, y: 130, x: 37, element: pathH, offset: lengths.h * 0.45 }, // Passa a barra conectora do meio
            { time: 5800, y: 220, x: 37, element: pathH, offset: lengths.h * 0.20 }, // Desce a perna direita
            { time: 6600, y: 55,  x: 37, element: pathH, offset: 0 }, // Sobe finalizando o H completo

            // --- 🛠️ IMPRIMINDO O NÚMERO 3 ---
            { time: 7400, y: 65,  x: 47, element: path3, offset: lengths.3 }, // Inicia no topo superior do 3
            { time: 8300, y: 130, x: 52, element: path3, offset: lengths.3 * 0.50 }, // Desenha a meia lua até o centro
            { time: 9200, y: 220, x: 47, element: path3, offset: 0 }, // Faz a curva de baixo terminando o 3

            // --- 🛠️ IMPRIMINDO A LETRA D ---
            { time: 10000, y: 220, x: 67, element: pathD, offset: lengths.d }, // Cola na base do pezinho do D
            { time: 10800, y: 55,  x: 67, element: pathD, offset: lengths.d * 0.70 }, // Sobe a parede reta vertical
            { time: 11700, y: 60,  x: 82, element: pathD, offset: lengths.d * 0.35 }, // Expande na grande curva arredondada
            { time: 12500, y: 220, x: 73, element: pathD, offset: 0 }, // Encontra o ponto inferior fechando a logo

            // --- 🏁 RECOLHIMENTO DA COMPONENTES ---
            { time: 13600, y: 20,  x: 46, element: null, offset: 0 } // Afasta o bico para cima revelando o resultado limpo
        ];

        // Dispara a esteira aplicando as movimentações coordenadas no tempo exato
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

    // Executa a esteira operacional
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

    // Monitor do Tráfego Técnico (Simulação de Atendimento)
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
