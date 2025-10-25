let canvas = document.getElementById('game_canvas');
let ctx = canvas.getContext('2d');



function fisicaBasica(areaJogador, areaObjeto){
    if(areaJogador.y < areaObjeto.y + areaObjeto.altura && areaJogador.y + areaJogador.altura > areaObjeto.y){
        jogadorNoChao = true;
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('...', canvas.width - 100, canvas.height);
        jogador.y -= 5;
    }
    else{
        jogadorNoChao = false;
    }
}

function detectaColisao(areaJogador, areaObjeto){
    if (areaJogador.x < areaObjeto.x + areaObjeto.largura &&
        areaJogador.x + areaJogador.largura > areaObjeto.x &&
        areaJogador.y < areaObjeto.y + areaObjeto.altura &&
        areaJogador.y + areaJogador.altura > areaObjeto.y)
    {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Colisão detectada!', 10, 50);
        fisicaBasica(areaJogador, areaObjeto) //chama a função de física para verficiar se o jogador está no chão ou não
        colisao = true;

    } else{
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Colisão não detectada!', 10, 50);
        colisao = false;
    }
};

// function checaPosicaoJogador(){
//     if (colisao == false){
//         posicaoJogadorX = jogador.x
//         posicaoJogadorY = jogador.y
//     }
//     else{
//         jogador.x = posicaoJogadorX
//         jogador.y = posicaoJogadorY
//     }
// }

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

function pular(){
    if(teclasPressionadas['x'])
        jogador.y -= 30 * 2;
}

let jogador = desenhaRetangulos("red", 700, 0, 80, 160);
let jogadorNoChao;
let colisao;
let posicaoJogadorX;
let posicaoJogadorY;

let fantasma = desenhaRetangulos("black", jogador.x, jogador.y, 80, 160);
fantasma.x = jogador.x
fantasma.y = jogador.y

let teste = desenhaRetangulos("blue", 0, 700, canvas.width, 10);




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
    //limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //movimento retangulo
    if(teclasPressionadas['ArrowUp'])
        {jogador.y -= 8;}
    if(teclasPressionadas['ArrowDown'])
        {jogador.y += 8;}
    if(teclasPressionadas['ArrowLeft'])
        {jogador.x -= 8;}
    if(teclasPressionadas['ArrowRight'])
        {jogador.x += 8;}



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

    
    if (jogadorNoChao == false){
        jogador.y += 5;
    }


    //desenha ambos retangulos
    jogador.desenha(ctx);
    teste.desenha(ctx);
    fantasma.desenha(ctx)

    //chama a função de colisão
    detectaColisao(jogador, teste);

    //verifica a posicao do jogador constantemente
    // checaPosicaoJogador()

    fisicaBasica(jogador, teste)

    pular()

    //chama animação (?)
    requestAnimationFrame(animacao);
}

animacao();

