let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d')

//mexi em alguns tamanhos pra deixar mais bonitinho T.T foi mal

ctx.beginPath();
ctx.fillStyle = 'gray';
ctx.fillRect(0, 350, 400, 100);
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = 'yellow';
ctx.arc(300, 100, 40, 0 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = 'brown';
ctx.fillRect(150, 270, 100, 80);
ctx.closePath();

ctx.beginPath();
// janelas
ctx.fillStyle = 'aqua';
ctx.fillRect(160, 300, 25, 25);
ctx.fillRect(215, 300, 25, 25);

// porta
ctx.fillStyle = 'red';
ctx.fillRect(190, 300, 20, 50);
ctx.closePath();

//telhado
ctx.moveTo(200, 220);
ctx.lineTo(140, 270);
ctx.lineTo(260, 270);
ctx.fill();

//arvore

//troncos
ctx.fillStyle = 'brown';
ctx.fillRect(50, 250, 20, 100);
ctx.fillRect(330, 275, 20, 100);


//folhas
ctx.beginPath();
ctx.fillStyle = 'green';
ctx.arc(60, 201, 50, 0 * Math.PI, 2 * Math.PI);
ctx.arc(340, 226, 50, 0 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.closePath();

//agua
ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.arc(0, 360, 50, 0 * Math.PI, 2 * Math.PI);
ctx.arc(150, 410, 50, 0 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.fillRect(0, 360, 150, 100);
ctx.closePath();

//fim da casa


