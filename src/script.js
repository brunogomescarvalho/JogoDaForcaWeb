class JogoDaForca {
    botaoJogar = document.getElementById('botaoJogar');
    imagemJogo = document.getElementById('imagemForca');
    painelLetras = document.getElementById('painelLetras');
    input = document.getElementById('input');

    imagens = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png',];

    palavras = ['ABACATE', 'ABACAXI', 'ACEROLA', 'AÇAÍ', 'ARAÇA', 'BACABA', 'BACURI', 'BANANA', 'CAJÁ', 'CAJÚ',
        'CARAMBOLA', 'CUPUAÇU', 'GRAVIOLA', 'GOIABA', 'JABUTICABA', 'JENIPAPO', 'MAÇÃ', 'MANGABA', 'MANGA', 'MARACUJÁ',
        'MURICI', 'PEQUI', 'PITANGA', 'PITAYA', 'SAPOTI', 'TANGERINA', 'UMBU', 'UVA', 'UVAIA']

    imagem;
    palavra;
    indexImagem = 0;
    tentativas = 0;
    palavraOculta = [];

    constructor() {
        this.carregarImagem();
        this.carregarPalavra();
        this.criarPainelLetras();
        this.botaoJogar.addEventListener('click', () => this.verificarJogada()); 
    }

    carregarImagem() {
        this.imagem = document.createElement("img");
        this.alterarImagem(this.indexImagem);
        this.imagemJogo.appendChild(this.imagem);
    }

    carregarPalavra() {
        let index = Math.floor(Math.random() * this.palavras.length);
        this.palavra = this.palavras[index];
        console.log(this.palavra);
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

    verificarJogada() {
        let letraInformada = input.value.toUpperCase();
        let acertou = false;

        for (let i = 0; i < this.palavra.length; i++) {
            if (letraInformada == this.palavra[i]) {
                let quadro = document.getElementById(`${i}`);
                quadro.value = this.palavra[i];
                this.palavraOculta[i] = letraInformada;
                acertou = true;
            }
        }
        if (acertou == false) {
            this.alterarImagem(++this.indexImagem)
            this.tentativas++;
        }

        if (this.tentativas == 7)
            this.alterarImagem(this.imagens.length - 2)

        if (this.palavraCompleta())
            this.alterarImagem(this.imagens.length - 1)

        input.value = "";
        this.input.focus();
    }

    palavraCompleta() {
        return this.palavra == this.palavraOculta.join('');
    }

    alterarImagem(index) {
        this.imagem.src = `src/assets/${this.imagens[index]}`;
    }
}

window.addEventListener('load', () => new JogoDaForca());