const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");

const winnngMessage = document.querySelector("[data-winning-message]");
const winnngMessageText = document.querySelector("[data-winning-message-text]");
const btnRestart = document.querySelector("[data-restart-button]");

let isCircle;

const winnerCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const startGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, {once: true});//permite executar essa função apenas uma vez
    }

    isCircle = false;

    board.classList.add("x");
};

const restartGame = () => {
    winnngMessage.classList.remove("show-winning-message");
    board.classList.remove('circle');
    board.classList.remove('x');
    for(const cell of cellElements){
        cell.classList.remove('x');
        cell.classList.remove('circle');
    }

    startGame()
};

btnRestart.addEventListener("click", restartGame);

const endGame = (isDraw) => {
    if (isDraw) {
        winnngMessageText.innerText = 'Empate'
    } else {
        winnngMessageText.innerText = isCircle
        ? 'O Venceu!'
        : 'X Venceu!';
    };

    winnngMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    //some = parâmetro que determina se a função de retorno de chamada especificada retorna true para qualquer elemento de uma matriz.
    return winnerCombinations.some(combination => {
        //verificando se alguma combinação da array de objetos está preenchida
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircle = !isCircle;

    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircle){
        board.classList.add("circle");
    }else{
        board.classList.add("x");
    }
};

const handleClick = (e) => {
    //colocar a marca( X ou O)
        const cell = e.target;
        const classToAdd = isCircle ? 'circle' : 'x';
        placeMark(cell, classToAdd);

    //checar por vitória e empate
        const isWin = checkForWin(classToAdd);
        const isDraw = checkForDraw();
        if(isWin){
            endGame(false);
        }else if(isDraw){
            endGame(true);
        }
    
    //mudar símbolo
        swapTurns();
};

startGame();