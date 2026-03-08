document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal-instrucoes');

    const btn = document.getElementById('btn-comecar');

    const envelope = document.getElementById('envelope-surpresa');

    const carta = document.getElementById('carta-surpresa');

    const areaFundo = document.getElementById('area-fundo');

    const musica = document.getElementById('musicaFundo');

    const somPapel = document.getElementById('somPapel');

    const petalsContainer = document.getElementById('petals-container');

    const btnFinalizar = document.getElementById('btn-finalizar');

    const telaFim = document.getElementById('tela-fim');

    const somBip = document.getElementById('somBip');
    const btnComecar = document.getElementById('btn-comecar');

    function tocarBip() {
        if (somBip) {
            somBip.currentTime = 0; // Reinicia o som se clicar rápido
            somBip.play().catch(e => console.log("Erro ao tocar som:", e));
        }
    }

    const khIntro = document.getElementById('kh-intro');

    const khText = document.getElementById('kh-text');

    let cartaJaLida = false;



    const frasesKH = [

        "Um sonho estilhaçado que é como uma lembrança distante...",

        "Uma lembrança distante que é como um sonho estilhaçado...",

        "Eu quero alinhar essas lembraças — as suas e as minhas.",

        "Neste dia tão especial, com um gesto simples mas de coração",

        "Eu quero te mostrar o quando você é especial para mim, Tamylla"

    ];



    btn.addEventListener('click', () => {

        modal.style.opacity = '0';

        setTimeout(() => {

            modal.remove();

            iniciarSequenciaKH();

        }, 1000);

        musica.play().catch(e => console.log("Áudio aguardando interação."));

    });



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



    function chuvaDePetalas() {

        setInterval(() => {

            const petal = document.createElement('div');

            petal.classList.add('petal');

            const size = Math.random() * 10 + 10 + 'px';

            petal.style.width = size; petal.style.height = size;

            petal.style.left = Math.random() * 100 + 'vw';

            petal.style.animationDuration = Math.random() * 4 + 8 + 's';

            petalsContainer.appendChild(petal);

            setTimeout(() => petal.remove(), 12000);

        }, 800);

    }



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

        // Se ela já leu, o botão de fechar aparece suavemente
        if (cartaJaLida) {
            setTimeout(() => {
                btnFinalizar.classList.add('mostrar-finalizar');
            }, 1000);
        }
    });
    btnFinalizar.addEventListener('click', () => {
        // Fade out suave da música
        let fadeAudio = setInterval(() => {
            if (musica.volume > 0.05) {
                musica.volume -= 0.05;
            } else {
                musica.volume = 0;
                musica.pause();
                clearInterval(fadeAudio);
            }
        }, 200);
        // Tela de encerramento
        telaFim.style.display = 'flex';
        setTimeout(() => {
            telaFim.querySelector('.kh-text').style.opacity = '1';
        }, 500);
    });
});
// Adicione estas constantes no topo do seu DOMContentLoaded
const somBip = document.getElementById('somBip');
const botoes = [btn, btnFinalizar];

// Função para aplicar os sons aos botões
botoes.forEach(botao => {
    // Som de "passar o mouse" (foco)
    botao.addEventListener('mouseenter', () => {
        if (somBip) {
            somBip.currentTime = 0;
            somBip.volume = 0.4;
            somBip.play();
        }
    });

    // Opcional: Som de clique mais forte ou o mesmo bip
    botao.addEventListener('click', () => {
        if (somBip) {
            somBip.currentTime = 0;
            somBip.volume = 0.7;
            somBip.play();
        }
    });
});
