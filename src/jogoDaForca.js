
class JogoDaForca {

    palavras = ['ABACATE', 'ABACAXI', 'ACEROLA', 'AÇAÍ', 'ARAÇA', 'BACABA', 'BACURI', 'BANANA', 'CAJÁ', 'CAJÚ',
        'CARAMBOLA', 'CUPUAÇU', 'GRAVIOLA', 'GOIABA', 'JABUTICABA', 'JENIPAPO', 'MAÇÃ', 'MANGABA', 'MANGA', 'MARACUJÁ',
        'MURICI', 'PEQUI', 'PITANGA', 'PITAYA', 'SAPOTI', 'TANGERINA', 'UMBU', 'UVA', 'UVAIA']

    palavra;
    posicoes = [];

    obterPalavraSecreta() {
        let index = Math.floor(Math.random() * this.palavras.length);
        this.palavra = this.palavras[index];
        return this.palavra;
    }

    verificarJogada(letraInformada) {

        let acertou = false;
        this.posicoes = [];

        for (let i = 0; i < this.palavra.length; i++) {
            if (letraInformada == this.palavra[i]) {
                this.posicoes.push(i);
                acertou = true;
            }
        }
        return acertou;
    }

    palavraCompleta(arrayLetras) {
        return this.palavra == arrayLetras.join('');
    }

    jogadaInvalida(letraInformada) {
        return !isNaN(letraInformada) || letraInformada.trim().length == 0;
    }
}

window.addEventListener('load', () => new TelaJogo());
