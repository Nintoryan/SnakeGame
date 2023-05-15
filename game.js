var game;
var snake;
var food;
var bonus;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

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
        width: 800,
        height: 600,

        backgroundColor: '#bfcc00',
        parent: "phaser-example",
        scene:[playgame,
                main,
                snacegame,
                scenePause,
                gameOver],
        scale: {
            mode: Phaser.Scale.FIT
        }    
    }


game = new Phaser.Game(config);
}

class PlayGame extends Phaser.Scene{
    constructor(){
        super({key: 'playgame'})
    }

    preload(){
        this.load.image('food', 'assets/food.png');
        this.load.image('body', 'assets/body.png');
        this.load.image('button', 'assets/button.png');
        this.load.image('selector', 'assets/selector.png');
        this.load.image('bonus', 'assets/bonus.png');
    }

    create(){
        this.scene.start('mainmenu')
    }
    update(){
    }
}
var playgame = new PlayGame()