class SnakeGame extends Phaser.Scene{
    constructor(){
        super({key: 'snakegame'})
    }

    create(){
        this.backGround = this.add.image(game.config.width/2, game.config.height/2, "background");
        gameState.onGame = true
        this.scoreText = this.add.text(5, 10, `score: ${gameState.score}`, { fontSize: '32px', fill: '#000' })
        food = new Food(snacegame, 3, 4, 'food');
        snake = new Snake(snacegame, 8, 8, 'body');
        this.input.keyboard.on('keydown-SPACE', this.pause, this);
        this.loadScore()
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            this.hieghScoreText = this.add.text(this.scoreText.x, this.scoreText.y-50, `Heighscore: ${JSON.parse(localStorage.getItem('heighScore_snake'))}`, { fontSize: '32px', color: 'white' });
        }
    }

    pause(){
        gameState.onGame = false
        this.scene.pause(snacegame)
        this.scene.launch(scenePause)
    }

    addBonus(){
        if(gameState.score > 1 && gameState.score % 10 === 0){
            this.bonus = new Bonus(snacegame, 10, 10, 'bonus');
            console.log(this.bonus);
        }
    }

    update(time, delta) {
        console.log(snake.speed)
        this.scoreText.setText(`score: ${gameState.score}`)
        if (!snake.alive) {
        this.scene.start('gameOver')
        }
        if (snake.update(time)) {
            if(this.bonus!=undefined && snake.collideWithBonus(this.bonus)){
                this.bonus.destroy();
                }
            else if (snake.collideWithFood(food)){
                this.repositionFood();
                gameState.score+=1;
                this.addBonus();
                console.log(gameState.score);
            }
        }
        
    }  
        repositionFood() {
            var testGrid = [];
            for (var y = 0; y < game.config.height/16 + 20; y++) {
                testGrid[y] = [];
        
                for (var x = 0; x < game.config.width/16 - 20; x++) {
                    testGrid[y][x] = true;
                }
            }
        
            snake.updateGrid(testGrid);
        
            var validLocations = [];
        
            for (var y = 0; y < game.config.height/16; y++) {
                for (var x = 0; x < game.config.width/16; x++) {
                    if (testGrid[y][x] === true) {
                        validLocations.push({ x: x, y: y });
                    }
                }
            }
        
            if (validLocations.length > 0) {
                var pos = Phaser.Math.RND.pick(validLocations);
                food.setPosition(pos.x*16, pos.y*16);
                return true;
            } else {
                return false;
            }
        }
    

}

var snacegame = new SnakeGame()

class ScenePause extends Phaser.Scene{
    constructor(){
        super({key: 'scenePause'})
    }

    create(){
        gameState.onPause = true

        this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button');
        this.btnStart.setOrigin(0.5)

        this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 70, 'button');

        this.selector = this.add.image(game.config.width / 2, game.config.height / 2 + 100, "selector");
        this.selector.setScale(0.1)

        this.btnStartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'START GAME!',{
            fontFamily: 'monospace',
            fontSize: 30,
            color: 'black',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnStartText.setOrigin(0.5)
        this.btnCloseText = this.add.text(this.btnStart.x, this.btnStart.y + 70, 'CLOSE',{
            fontFamily: 'monospace',
            fontSize: 30,
            color: 'black',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnCloseText.setOrigin(0.5)

        this.btnStart.setInteractive();
        this.btnClose.setInteractive();
        this.btnClose.on('pointerdown', this.exit, this);
        this.btnStart.on('pointerdown', this.resumeGame, this);

        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);
    }

    selectorDown(){
        if(gameState.onPause==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y += 70
            }
        }
    }

    selectorUp(){
        if(gameState.onPause==true){
            if(this.selector.y != this.btnStart.y){
                this.selector.y -=70
            }
        }
    }

    gameToggle(){
        if(gameState.onPause == true){
            if(this.selector.y == this.btnStart.y){
                this.resumeGame()
            }
            else if(this.selector.y == this.btnClose.y){
                this.exit()
            }
        }
    }

    resumeGame(){
        gameState.onPause=false
        gameState.onGame=true
        this.scene.resume(snacegame);
        this.scene.stop(scenePause);
    }

    exit(){
        this.sys.game.destroy(true);
        window.close();
    }

}

var scenePause = new ScenePause()