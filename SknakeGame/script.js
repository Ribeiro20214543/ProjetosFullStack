let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //define o contexto ao qual o arquivo será reiderizado
let box = 36;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 9 * box,
    y: 9 * box
}
//cria a variável da direção 
let direction = "right"; 

//cria o elemento comida - aparecendo aleatoriamente dentro do espaço delimitado do jogo - no caso -  15 é o limite 
let food = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 18 + 1) * box
}


// cria o background
function createBG() {
    context.fillStyle = "brown"; // define a cor
    context.fillRect(0, 0,18 * box, 18 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

// cria a cobrinha
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "black"; //pinta os quadradinhos para criar o corpo da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // define as dimensões da cobrinha
    }
}

// cria a comida 
function drawFood() {
    context.fillStyle = "green";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função - neste caso - o evento entende o toque nas setas do teclado
document.addEventListener('keydown', update);

//definição do limite == da direção através de uma condição se a direção não é (!=)  a direção é (=)
function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

//cria os movimentos da cobrinha baseado na variável da direção e nas condições da coordenadas e no limite da box  
//fazendo com que a cobrinha ao sair de um lado da área limite, volte pelo lado oposto ao saído 
function playGame() {

    if (snake[0].x > 17 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 18 * box;
    if (snake[0].y > 17 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 18 * box;

    //define a condição para o final do jogo 
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game); //para a função iniciarjogo
            alert('Game Over, Noob :(');//emite a msg de fim de jogo com uma carinha triste
        }
    }

    createBG();//chama a função criar background
    createSnake();//chama a função criar cobrinha
    drawFood();//chama a função criar comida

    //cria a condição das coordenadas para os movimentos da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //cria a condição para o aparecimento da comida e o crescimento da cobrinha
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 18 + 1) * box;//atenção os valores devem ser iguais aos definidos no elemento comida
        food.y = Math.floor(Math.random() * 18 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift add como primeiro quadradinho da cobrinha (cabeça da cobrinha)
}

let game = setInterval(playGame, 100);
