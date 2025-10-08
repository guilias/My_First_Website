let canvas = document.getElementById('canvas_01');
let ctx = canvas.getContext('2d');


//RASCUNHOS

// let quadrado = {
//     x: 0,
//     y: 0,
//     altura: 20,
//     largura: 20,
//     cor: 'black',
//     desenha: function(){
//         ctx.beginPath();
//         ctx.fillStyle = this.cor;;
//         ctx.fillRect(this.x, this.y, this.altura, this.largura);
//         ctx.closePath();
//     }
// };

// quadrado.desenha()

// function desenhaRetangulos(cor, x, y, largura, altura){
//     ctx.beginPath();
//     ctx.fillStyle = cor;
//     ctx.fillRect(x, y, largura, altura)
//     ctx.closePath();
// }

// let retangulo1 = new desenhaRetangulos('black', 0, 0, 100, 100)

// function animacao(){
//     ctx.clearRect(0, 0, 400, 400);
//     retangulo1.x = retangulo1.x + 1;
//     retangulo1.desenhaRetangulos(ctx);
//     requestAnimationFrame(animacao)
// }

// animacao();

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

let retangulo1 = desenhaRetangulos("black", 0, 0, 20, 20);
let retangulo2 = desenhaRetangulos("red", 40, 40, 10, 10);
let retangulo3 = desenhaRetangulos("blue", null, null, 50, 50)

function animacao(){
    //limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //movimento do retangulo1
    retangulo1.x += 5;

    // verifica se o retangulo1 chegou ao fim da tela
    if (retangulo1.x > canvas.width){
        retangulo1.x = 0
    }


    if (retangulo3.x > 400){
        retangulo3.x = 0;
    }


    //movimento retangulo3
    if(tecla == 'ArrowUp')   {retangulo2.y = retangulo2.y-10}
    if(tecla == 'ArrowDown') {retangulo2.y = retangulo2.y+10}  
    if(tecla == 'ArrowLeft') {retangulo2.x = retangulo2.x-10}  
    if(tecla == 'ArrowRight'){retangulo2.x = retangulo2.x+10}

    //teleportar para lados opostos
    if (retangulo3.x > canvas.width){
    retangulo3.x = 0;
    }
    if (retangulo3.x < 0){
        retangulo3.x = canvas.width;
    }
    if (retangulo3.y > canvas.height){
        retangulo3.y = 0;
    }
    if (retangulo3.y < 0){
        retangulo3.y = canvas.height;
    }

    //desenha ambos retangulos
    retangulo1.desenha(ctx);
    retangulo2.desenha(ctx);
    retangulo3.desenha(ctx);


    requestAnimationFrame(animacao);
}
animacao();

//adiciona o "sinal"
let teclasPressionadas = {};

document.addEventListener('keydown', function(evento){
    teclasPressionadas[evento.key = true];
})

document.addEventListener('keyup', function(evento){
    teclasPressionadas[evento.key = false];
})

    
    //diagonais
    if(tecla == 'ArrowUp' && tecla == 'ArrowLeft') {retangulo2 = retangulo2.y-5 && retangulo2.x-5}
    if(tecla == 'ArrowUp' && tecla == 'ArrowRight') {retangulo2 = retangulo2.y-5 && retangulo2.x+5}
    if(tecla == 'ArrowDown' && tecla == 'ArrowLeft') {retangulo2 = retangulo2.y+5 && retangulo2.x-5}
    if(tecla == 'ArrowDown' && tecla == 'ArrowLRight') {retangulo2 = retangulo2.y+5 && retangulo2.x+5}
})

addEventListener ('mousemove', function(evento) {
   let rect = canvas.getBoundingClientRect();
   let x_mouse = evento.clientX - rect.left;
   let y_mouse = evento.clientY - rect.top;
   console.log(x_mouse, y_mouse);

   retangulo3.x = x_mouse;
   retangulo3.y = y_mouse;
});
