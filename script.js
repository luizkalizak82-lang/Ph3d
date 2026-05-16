document.addEventListener("DOMContentLoaded", function() {
    
    const navbar = document.querySelector("#navbar");
    const counterElement = document.getElementById("live-chat-count");

    // Seleção dos elementos do cabeçote mecânico e das letras individuais
    const axisX = document.getElementById("printer-laser-axis");
    const nozzleHead = document.querySelector(".nozzle-head");
    
    const letterP = document.getElementById("letter-p");
    const letterH = document.getElementById("letter-h");
    const letter3 = document.getElementById("letter-3");
    const letterD = document.getElementById("letter-d");

    // 🚀 ENGINE MECÂNICA DA IMPRESSORA (Desenha sequencialmente P -> H -> 3 -> D)
    function runIndustrialPrinter() {
        if (!axisX || !nozzleHead) return;

        // Reseta posições e remove as classes caso queira loopar futuramente
        axisX.style.transform = "translateY(220px)"; 
        nozzleHead.style.left = "0%";
        [letterP, letterH, letter3, letterD].forEach(l => { if(l) l.classList.remove("printed"); });
        
        // Cronograma exato de movimentação física do bico sobre cada caractere
        let workflow = [
            { delay: 400,  y: 140, x: 14, targetLetter: letterP },
            { delay: 1100, y: 105, x: 22, targetLetter: letterP },
            
            { delay: 1900, y: 140, x: 38, targetLetter: letterH },
            { delay: 2600, y: 105, x: 46, targetLetter: letterH },
            
            { delay: 3400, y: 140, x: 60, targetLetter: letter3 },
            { delay: 4100, y: 105, x: 68, targetLetter: letter3 },
            
            { delay: 4900, y: 140, x: 80, targetLetter: letterD },
            { delay: 5600, y: 105, x: 86, targetLetter: letterD },
            
            // Finalização: O cabeçote sobe totalmente liberando a visualização limpa da logo
            { delay: 6600, y: 15,  x: 46, targetLetter: null }
        ];

        workflow.forEach(step => {
            setTimeout(() => {
                axisX.style.transform = `translateY(${step.y}px)`;
                nozzleHead.style.left = `${step.x}%`;
                
                if (step.targetLetter) {
                    step.targetLetter.classList.add("printed");
                }
            }, step.delay);
        });
    }

    // Executa a automação assim que a página renderiza
    runIndustrialPrinter();

    // Menu Rolagem (Navbar background change)
    window.addEventListener("scroll", function() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Scroll Reveal (Revelação suave ao rolar a página)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal-scroll").forEach(el => scrollObserver.observe(el));

    // Contador de Usuários Ativos (Modo Dinâmico Realista)
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
