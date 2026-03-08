document.addEventListener('DOMContentLoaded', () => {
    // 1. MAPEAMENTO DE ELEMENTOS
    const modal = document.getElementById('modal-instrucoes');
    const btnComecar = document.getElementById('btn-comecar');
    const envelope = document.getElementById('envelope-surpresa');
    const carta = document.getElementById('carta-surpresa');
    const areaFundo = document.getElementById('area-fundo');
    const musica = document.getElementById('musicaFundo');
    const somPapel = document.getElementById('somPapel');
    const somBip = document.getElementById('somBip');
    const petalsContainer = document.getElementById('petals-container');
    const btnFinalizar = document.getElementById('btn-finalizar');
    const telaFim = document.getElementById('tela-fim');
    const khIntro = document.getElementById('kh-intro');
    const khText = document.getElementById('kh-text');

    let cartaJaLida = false;

    const frasesKH = [
        "Um sonho estilhaçado que é como uma lembrança distante...",
        "Uma lembrança distante que é como um sonho estilhaçado...",
        "Eu quero alinhar essas lembranças — as suas e as minhas.",
        "Neste dia tão especial, com um gesto simples mas de coração",
        "Eu quero te mostrar o quanto você é especial, Tamylla!!"
    ];

    // 2. FUNÇÃO DE SOM (BIP)
    function tocarBip() {
        if (somBip) {
            somBip.volume = 0.4;
            somBip.currentTime = 0; 
            somBip.play().catch(e => console.log("Erro ao tocar som:", e));
        }
    }

    // 3. EVENTOS DOS BOTÕES (SOM AO PASSAR O MOUSE)
    [btnComecar, btnFinalizar].forEach(botao => {
        botao.addEventListener('mouseenter', () => {
            tocarBip();
        });
    });

    // 4. BOTÃO COMEÇAR
    btnComecar.addEventListener('click', () => {
        tocarBip(); // Som de confirmação
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.remove();
            iniciarSequenciaKH();
        }, 1000);

        if(musica) {
            musica.volume = 0.5;
            musica.play().catch(e => console.log("Aguardando interação do usuário."));
        }
    });

    // 5. SEQUÊNCIA DE TEXTOS KH
    async function iniciarSequenciaKH() {
        khIntro.style.display = 'flex';
        for (let i = 0; i < frasesKH.length; i++) {
            khText.innerText = frasesKH[i];
            khText.style.opacity = '1';
            await new Promise(r => setTimeout(r, 4000));
            khText.style.opacity = '0';
            await new Promise(r => setTimeout(r, 2000));
        }
        khIntro.style.opacity = '0';
        setTimeout(() => {
            khIntro.remove();
            chuvaDePetalas();
            setTimeout(() => {
                envelope.classList.add('iniciar-queda');
                if (somPapel) somPapel.play();
            }, 3000);
        }, 1000);
    }

    // 6. PÉTALAS
    function chuvaDePetalas() {
        setInterval(() => {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            const size = Math.random() * 10 + 10 + 'px';
            petal.style.width = size; 
            petal.style.height = size;
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = Math.random() * 4 + 8 + 's';
            petalsContainer.appendChild(petal);
            setTimeout(() => petal.remove(), 12000);
        }, 800);
    }

    // 7. ENVELOPE E CARTA
    envelope.addEventListener('click', () => {
        envelope.classList.add('aberto');
        areaFundo.classList.add('desfocado');
        setTimeout(() => {
            carta.classList.add('exibindo');
            cartaJaLida = true;
        }, 600);
    });

    carta.addEventListener('click', () => {
        carta.classList.remove('exibindo');
        areaFundo.classList.remove('desfocado');
        envelope.classList.remove('aberto');
        if (cartaJaLida) {
            setTimeout(() => {
                btnFinalizar.classList.add('mostrar-finalizar');
            }, 1000);
        }
    });

    // 8. BOTÃO FINALIZAR
    btnFinalizar.addEventListener('click', () => {
        tocarBip();
        
        // Fade out da música
        let fadeAudio = setInterval(() => {
            if (musica.volume > 0.05) {
                musica.volume -= 0.05;
            } else {
                musica.volume = 0;
                musica.pause();
                clearInterval(fadeAudio);
            }
        }, 200);

        telaFim.style.display = 'flex';
        setTimeout(() => {
            telaFim.querySelector('.kh-text').style.opacity = '1';
        }, 500);
    });

}); // <--- O fechamento do DOMContentLoaded deve ser aqui no final!
