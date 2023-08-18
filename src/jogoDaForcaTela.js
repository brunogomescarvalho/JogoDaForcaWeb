class TelaJogo {

    botaoJogar = document.getElementById('botaoJogar');
    botaoReiniciar = document.getElementById('botaoRecomecar');
    imagemJogo = document.getElementById('imagemForca');
    painelLetras = document.getElementById('painelLetras');
    input = document.getElementById('input');

    imagens = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png',];

    imagem;

    palavra;
    indexImagem = 0;
    tentativas = 0;
    palavraOculta = [];
    letraInformada;

    jogo;

    constructor() {
        this.atribuirEventos();
        this.iniciar();
    }

    atribuirEventos() {
        this.botaoJogar.addEventListener("click", () => this.jogar());

        this.botaoReiniciar.addEventListener("click", () => this.iniciar());
    }

    jogar() {
        this.letraInformada = input.value.toUpperCase();

        if (this.jogo.jogadaInvalida(this.letraInformada) == true) {
            alert("Informe uma letra");
            return;
        }

        if (this.jogo.verificarJogada(this.letraInformada) == true) {
            this.mostrarAcerto();
        }
        else {
            this.tentativas++;
            this.alterarImagem(++this.indexImagem);
        }

        if (this.jogo.palavraCompleta(this.palavraOculta)) {
            this.mostrarMensagem(true);
            this.alterarImagem(this.imagens.length - 1);
        }

        if (this.tentativas == 7) {
            this.mostrarMensagem(false);
            this.alterarImagem(this.imagens.length - 2);
        }

        this.limparInput();
    }

    alterarImagem(index) {
        this.imagem.src = `src/assets/${this.imagens[index]}`;
    }

    carregarImagem() {
        this.imagem = document.createElement("img");
        this.alterarImagem(this.indexImagem);
        this.imagemJogo.appendChild(this.imagem);
    }

    criarPainelLetras() {
        for (let i = 0; i < this.palavra.length; i++) {
            let quadro = document.createElement('input');
            quadro.id = i;
            quadro.type = 'text';
            quadro.readOnly = true;
            quadro.style.width = `${50 / this.palavra.length}%`;
            quadro.classList.add('quadros');
            quadro.value = '_';
            this.painelLetras.appendChild(quadro);
            this.palavraOculta.push(quadro.value);
        }
    }

    mostrarAcerto() {
        for (let i = 0; i < this.jogo.posicoes.length; i++) {
            let quadro = document.getElementById(this.jogo.posicoes[i]);
            quadro.value = this.palavra[this.jogo.posicoes[i]];
            this.palavraOculta[this.jogo.posicoes[i]] = this.letraInformada;
        }
    }

    mostrarMensagem(acertou) {
        this.botaoJogar.hidden = true;
        this.input.hidden = true;
        let msg = acertou == true ? "Parabéns! Você acertou!" : `Fim de jogo! A palavra era ${this.palavra}`;
        let paragrafo = document.createElement("p");
        paragrafo.textContent = msg;
        this.painelLetras.appendChild(paragrafo);
    }

    limparInput() {
        input.value = "";
        this.input.focus();
    }

    iniciar() {

        this.jogo = new JogoDaForca();

        this.indexImagem = 0;
        this.tentativas = 0;
        this.painelLetras.innerHTML = "";
        this.imagemJogo.innerHTML = "";
        this.botaoJogar.hidden = false;
        this.input.hidden = false;
        this.palavraOculta = [];
        this.palavra = this.jogo.obterPalavraSecreta();
        this.limparInput();
        this.carregarImagem();
        this.criarPainelLetras();
    }
}
