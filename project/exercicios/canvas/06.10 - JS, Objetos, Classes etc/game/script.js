let canvas = document.getElementById('game_canvas');
let ctx = canvas.getContext('2d');



function detectaColisao(areaJogador, areaObjeto){
    if (areaJogador.x < areaObjeto.x + areaObjeto.largura &&
        areaJogador.x + areaJogador.largura > areaObjeto.x &&
        areaJogador.y < areaObjeto.y + areaObjeto.altura &&
        areaJogador.y + areaJogador.altura > areaObjeto.y)
        {
           //calcula a "quantidade de pixels" em colisão entre jogador e objeto.
        const colisaoEsquerda = (areaObjeto.x + areaObjeto.largura) - areaJogador.x;
        const colisaoDireita = (areaJogador.x + areaJogador.largura) - areaObjeto.x;
        const colisaoTopo = (areaObjeto.y + areaObjeto.altura) - areaJogador.y;
        const colisaoBase = (areaJogador.y + areaJogador.altura) - areaObjeto.y;

        //encontre o 'menor deslocamento para resolver a colisão'
        const minX = Math.min(colisaoEsquerda, colisaoDireita);
        const minY = Math.min(colisaoTopo, colisaoBase);

        //ajusta posição para bloquear o jogador no eixo onde a colisão é menor
        if (minX < minY) {
            //corrige no eixo X:
            if (colisaoEsquerda < colisaoDireita) {
                //colisão à esquerda do jogador (bloquear para a direita)
                jogador.x = areaObjeto.x + areaObjeto.largura;
            } else {
                //colisão à direita do jogador (bloquear para a esquerda)
                jogador.x = areaObjeto.x - areaJogador.largura;
            }
        } else {
            //corrige no eixo Y:
            if (colisaoTopo < colisaoBase) {
                // colisão por cima do jogador
                jogador.y = areaObjeto.y + areaObjeto.altura;
            } else {
                // Colisão por baixo do jogador
                jogador.y = areaObjeto.y - areaJogador.altura;
                jogadorNoChao = true;
                velocidadeVertical = 0;
                console.log("Está no chão.")
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                ctx.fillText("Jogador está no chão.", canvas.width / 2, canvas.height / 2);
            }
        }
        console.log("Jogador está colidindo com objeto.")
        colisao = true;
        return true;
    } else {
        console.log("Não há colisão.")
        colisao = false;
        return false;
    }
};

function desenhaRetangulos(cor, x, y, largura, altura){
    return {
        x: x,
        y: y,
        largura: largura,
        altura: altura,
        cor: cor,
        desenha: function(ctx){
            ctx.beginPath();
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
            ctx.closePath();
        }
    };
}

//declara jogador e variáveis relacionadas
let jogador = desenhaRetangulos("red", 700, 0, 80, 160);
let colisao;

let jogadorNoChao = false;
let velocidadeVertical = 0;
const gravidade = 2;
const forcaPulo = -4;

let posicaoJogadorX;
let posicaoJogadorY;

//declara objetos
let teste = desenhaRetangulos("blue", 0, 700, canvas.width, 10);
let teste2 = desenhaRetangulos("blue", 100, 0, 10, canvas.height);





//adiciona o "sinal" e cria variável para rastrear teclas pressionadas
let teclasPressionadas = {};
document.addEventListener('keydown', function(evento){
    teclasPressionadas[evento.key] = true;
})
document.addEventListener('keyup', function(evento){
    teclasPressionadas[evento.key] = false;
})


//ONDE A MAGIA ACONTECE
function animacao(){
    //reseta o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //movimento retangulo
    if(teclasPressionadas['ArrowDown'] || teclasPressionadas['s'])
        {jogador.y += 10;}
    if(teclasPressionadas['ArrowLeft'] || teclasPressionadas['a'])
        {jogador.x -= 10;}
    if(teclasPressionadas['ArrowRight'] || teclasPressionadas['d'])
        {jogador.x += 10;}

    //pulo
    if((teclasPressionadas['ArrowUp'] || teclasPressionadas['w']) && jogadorNoChao){
        velocidadeVertical = forcaPulo; //basicamente, é o impulso do pulo.
        jogadorNoChao = false;;
    }



    //teleportar para lados opostos
    if (jogador.x > canvas.width){
        jogador.x = 0;
    }
    if (jogador.x < 0){
        jogador.x = canvas.width;
    }
    if (jogador.y > canvas.height){
        jogador.y = 0;
    }
    if (jogador.y < 0){
        jogador.y = canvas.height;
    }


    //"física"
    velocidadeVertical += 0.15 // a velocidade de queda aumenta a cada frame
    jogador.y += velocidadeVertical * gravidade // incrementa os valores

    //desenha ambos retangulos
    jogador.desenha(ctx);
    teste.desenha(ctx);
    teste2.desenha(ctx);

    //chama a função de colisão
    detectaColisao(jogador, teste);
    detectaColisao(jogador, teste2);


    //verifica a posicao do jogador constantemente
    // checaPosicaoJogador()



    //chama animação (?)
    requestAnimationFrame(animacao);
}

animacao();

