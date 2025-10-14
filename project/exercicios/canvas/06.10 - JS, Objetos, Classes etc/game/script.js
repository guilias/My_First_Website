let canvas = document.getElementById('game_canvas');
let ctx = canvas.getContext('2d');


function playerJump(){
    
}

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

let player = desenhaRetangulos("red", 0, canvas.height - 160, 80, 160);

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
    if(teclasPressionadas['ArrowUp']){player.y -= 8;}
    if(teclasPressionadas['ArrowDown']){player.y += 8;}
    if(teclasPressionadas['ArrowLeft']){player.x -= 8;}
    if(teclasPressionadas['ArrowRight']){player.x += 8;}
    //teleportar para lados opostos
    if (player.x > canvas.width){
    player.x = 0;
    }
    if (player.x < 0){
        player.x = canvas.width;
    }
    if (player.y > canvas.height){
        player.y = 0;
    }
    if (player.y < 0){
        player.y = canvas.height;
    }

    //desenha ambos retangulos
    player.desenha(ctx);


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
