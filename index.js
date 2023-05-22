var game;
var snake;
var food;
var bonus;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

function getTexturePack(){
    return Math.floor(Math.random()*3);
}

var gameState ={
    onMenu:false,
    onPause: false,
    isOver: false,
    onGame: false,
    score: 0
}
window.onload = function(){
    var config = {
        type: Phaser.WEBGL,
        width: 1920,
        height: 1080,

        backgroundColor: '#000',
        parent: "phaser-example",
        scene:[preloader, mainMenu, snacegame, scenePause, gameOver],
        scale: {
            mode: Phaser.Scale.CENTER_BOTH
        }    
    }


game = new Phaser.Game(config);
}