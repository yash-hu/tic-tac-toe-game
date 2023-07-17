const gameBoard = document.getElementById('gameboard');
const infoDisplay = document.getElementById('info');

const startCells =[
    "","","","","","","","",""
];

let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard(){
    startCells.forEach((cell,index)=>{
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id =index;
        cellElement.addEventListener('click',addGo);
        gameBoard.append(cellElement);
    })
}

createBoard();

function addGo(e){
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    // console.log(e.target);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + go + "'s go .";
    e.target.removeEventListener('click',addGo);
    checkScore();
}

function checkScore(){
    const allSquare = document.querySelectorAll('.square');
    const winningCombo = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    winningCombo.forEach(array =>{
       const circleWins = array.every(cell => allSquare[cell].firstChild ?.classList.contains('circle'));

       if(circleWins){
        infoDisplay.textContent = "Circle Wins !!!";
        allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
       }
    })
    winningCombo.forEach(array =>{
       const crossWins = array.every(cell => allSquare[cell].firstChild ?.classList.contains('cross'));

       if(crossWins){
        infoDisplay.textContent = "Cross Wins !!!";
        allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;
       }
    })
}