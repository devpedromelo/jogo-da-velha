const jogadorAtual = document.querySelector(".jogador-atual");
const botoes = document.querySelectorAll(".game button");

let selected; //armazena os itens já selecionados
let player = 'X';

let positions =[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

function inicial(){
    selected = [];

    jogadorAtual.innerHTML = `JOGADOR DA VEZ: ${player}`

    botoes.forEach(function(item){
        item.innerHTML = ''
        item.addEventListener("click", novoMovimento);
    });
};

inicial();

function novoMovimento(e){
    const index = e.target.getAttribute("data-id");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", novoMovimento);
    selected[index] = player

    setTimeout(()=>{
        check();
    }, [100]);

    player = player === 'X' ? 'O' : 'X';
    jogadorAtual.innerHTML = `JOGADOR DA VEZ: ${player}`;
};

function check(){
    let ultimoMovimento = player === 'X' ? 'O' : 'X';

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === ultimoMovimento)
        .map((item) => item[1]);

        for(pos of positions) {
            if(pos.every((item) => items.includes(item))){
                alert(`O JOGADOR ${ultimoMovimento} GANHOU!`);
                inicial();
                return;
            }
        }

        if(selected.filter((item) => item).length === 9) {
            alert("DEU EMPATE!");
            inicial();
            return;
        }
}