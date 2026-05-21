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

let snow1Width = 90;
let snow2Width = 140;

let snowHeight = 70;
let snowX = 700;
let snowY = boardHeight - snowHeight;

let snowImg;
let snowImg2;

//game physics
let velocityX = -8; //snow moving left
let velocityY = 0;
let gravity = .35;
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

    document.addEventListener("keydown", jumpSeal);

}

function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
        
    }
    context.clearRect(0, 0, board.width, board.height); //clear the board for each frame I think
    
    //seal
    velocityY += gravity;
    seal.y = Math.min (seal.y + velocityY, sealY) //apply gravity but making sure the seal doesn't go through the ground
    context.drawImage(sealImg, seal.x, seal.y, seal.width, seal.height);

    //snow
    for (let i = 0; i < snowArray.length; i++){
        let snow = snowArray[i];
        snow.x += velocityX;
        context.drawImage(snow.img, snow.x, snow.y, snow.width, snow.height);

        let sealHitbox = {
            x: seal.x + 30,
            y: seal.y + 20,
            width: seal.width - 60,
            height: seal.height - 30
        };

        let snowHitbox = {
            x: snow.x + 10,
            y: snow.y + 10,
            width: snow.width - 20,
            height: snow.height - 20
        };

        if (detectCollision(sealHitbox, snowHitbox)){
            gameOver = true;
            sealImg.src = "./Images/seal-dead.png";
            sealImg.onload = function (){
                context.drawImage(sealImg, seal.x, seal.y, seal.width, seal.height);
            }
        }
    }

    //score
    context.fillStyle = "White";
    context.font = "20px courier"
    score += 0.1;
    context.fillText(Math.floor(score), 5, 20);



}

function jumpSeal(e){
    if (gameOver){
        return;
    }

    if ((e.code == "Space" || e.code =="ArrowUp") && seal.y == sealY){

        //jump
        velocityY = -10;
    }

}

function placeSnow(){

    if (gameOver){
        return;
    }

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

    if (snowArray.length > 5){
        snowArray.shift(); //remove the first element from the array so there isn't more than 5 snow at a time
    }

}

function detectCollision (a,b){
   
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

