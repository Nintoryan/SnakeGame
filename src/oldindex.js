var game;
var snake;
var food;
var bonus;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var CELL = 32;
var game_version = 'v 0.1.9';

var game_session = {
    ts: 0,
    game_id: '',
    action:{
        startGameSession: 0,
        startGame: 0,
        levelUp: 0,
        gameOver: 0,
        closeGameSession: 0,
    },
    score: null,
    highscore: null,
    level: null,
    onClose: false
}

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
        type: Phaser.CANVAS,
        width: 1920,
        height: 1080,
        
        backgroundColor: '#000',
        parent: "phaser-example",
        scene:[preloader, mainMenu, snacegame, scenePause, gameOver],
        physics: {
            default: 'arcade'
        },
        scale: {
            mode: Phaser.Scale.FIT
        },
        audio: {
            disableWebAudio: true,
        }   
    }

    let canvas = document.getElementsByTagName('canvas');
    canvas.outline = 0

game = new Phaser.Game(config);
}