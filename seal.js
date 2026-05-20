//board
let board; //reference the canva
let boardWidth = 750; //px width
let boardHeight = 250; //px height
let context;

//Seal
let sealWidth = 88;
let sealHeight = 94;
let sealX = 50;
let sealY = boardHeight - sealHeight;
let dinoImg; //reference image

let dino = {
    x : sealX,
    y : sealY,
    width : sealWidth,
    height : sealHeight
}

window.onload = function (){
    board = document.getElementById("board");
    
}