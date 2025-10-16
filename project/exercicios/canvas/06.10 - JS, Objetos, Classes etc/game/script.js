let canvas = document.getElementById('game_canvas');
let ctx = canvas.getContext('2d');



function detectaColisao(areaJogador, areaObjeto){
    if (areaJogador.x < areaObjeto.x + areaObjeto.largura &&
        areaJogador.x + areaJogador.largura > areaObjeto.x &&
        areaJogador.y < areaObjeto.y + areaObjeto.altura &&
        areaJogador.y + areaJogador.altura > areaObjeto.y)
    {
        ctx.beginPath();
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Colisão detectada!', 10, 50);
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Colisão não detectada!', 10, 50);
        ctx.closePath();
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

let jogador = desenhaRetangulos("red", 0, canvas.height - 160, 80, 160);
let teste = desenhaRetangulos("blue", 100, 100, 100, 100);

const objetos = [teste]

//adiciona o "sinal" e cria variável para rastrear teclas pressionadas
let teclasPressionadas = {};

document.addEventListener('keydown', function(evento){
    teclasPressionadas[evento.key] = true;
})

document.addEventListener('keyup', function(evento){
    teclasPressionadas[evento.key] = false;
})

function animacao(){
    //limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //movimento retangulo3
    if(teclasPressionadas['ArrowUp']){jogador.y -= 8;}
    if(teclasPressionadas['ArrowDown']){jogador.y += 8;}
    if(teclasPressionadas['ArrowLeft']){jogador.x -= 8;}
    if(teclasPressionadas['ArrowRight']){jogador.x += 8;}
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

    //desenha ambos retangulos
    jogador.desenha(ctx);
    teste.desenha(ctx);
    
    //chama a função de colisão
    detectaColisao(jogador, objetos[0]);

    //chama animação (?)
    requestAnimationFrame(animacao);
}

animacao();






addEventListener ('mousemove', function(evento) {
   let rect = canvas.getBoundingClientRect();
   let x_mouse = evento.clientX - rect.left;
   let y_mouse = evento.clientY - rect.top;
   console.log(x_mouse, y_mouse);

   retangulo3.x = x_mouse;
   retangulo3.y = y_mouse;
});
