//board
let board; //reference the canva
let boardWidth = 750; //px width
let boardHeight = 250; //px height
let context;

//Seal
let sealWidth = 200;
let sealHeight = 100;
let sealX = 50;
let sealY = boardHeight - sealHeight;
let sealImg; //reference image

//obstacles

let snowArray = [];

let snow1Width = 34;
let snow2Width = 69;

let snowHeight = 70;
let snowX = 700;
let snowY = boardHeight - snowHeight;

let snowImg;
let snowImg2;

//game physics
let velocityX = -8; //snow moving left
let velocityY = 0;
let gravity = .4;

let gameOver = false;

let score = 0;


let seal = {
    x : sealX,
    y : sealY,
    width : sealWidth,
    height : sealHeight
}

window.onload = function (){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    sealImg = new Image ();
    sealImg.src = "./Images/seals.png";
    sealImg.onload = function(){
    context.drawImage(sealImg, seal.x, seal.y, seal.width, seal.height)
    }

    snowImg = new Image();
    snowImg.src = "./Images/snow1.png";

    snowImg2 = new Image();
    snowImg2.src = "./Images/snow2.png";

    requestAnimationFrame(update);
    setInterval(placeSnow,1000); //every second we generate snow
}

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height); //clear the board for each frame I think
    
    //seal
    context.drawImage(sealImg, seal.x, seal.y, seal.width, seal.height);

    //snow
    for (let i = 0; i < snowArray.length; i++){
        let snow = snowArray[i];
        snow.x += velocityX;
        context.drawImage(snow.img, snow.x, snow.y, snow.width, snow.height);
    }

}


function placeSnow(){
    let snow = {
        img: null,
        x : snowX,
        y : snowY,
        width : null,
        height : snowHeight

    }

    let placeSnowChance = Math.random(); //pick random number from 0 - 0.999....
    
    if (placeSnowChance > .60){ //40% chance I think??
        snow.img = snowImg2;
        snow.width = snow2Width;
        snowArray.push(snow);

    }
    else if (placeSnowChance > .50){ //50% chance
        snow.img = snowImg;
        snow.width = snow1Width;
        snowArray.push(snow);

    }

    if (snowArray.lenth > 5){
        snowArray.shift(); //remove the first element from the array so there isn't more than 5 snow at a time
    }

}
