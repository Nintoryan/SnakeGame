class SnakeGame extends Phaser.Scene{
    constructor(){
        super({key: 'snakegame'})
    }

    create(){
        this.texturePack = getTexturePack();
        this.backGround = this.add.image(game.config.width/2, game.config.height/2, `background_${this.texturePack}`);
        this.backGround.setScale(1.03);
        
        gameState.onGame = true
        this.scoreText = this.add.text(5, 10, `score: ${gameState.score}`, { fontSize: '32px', fill: '#000' })
        food = new Food(snacegame, 3, 4, 'food');
        snake = new Snake(snacegame, 8, 8, 'body_0');

        this.input.keyboard.on('keydown-SPACE', this.pause, this);
        this.loadScore()
        console.log(snake)
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
        this.i = Math.floor(Math.random()*2);
        if(gameState.score > 1 && gameState.score % 10 === 0){
            this.bonus = new Bonus(this, 10, 10, `bonus_${this.i}`);
            console.log(this.bonus);
        }
    }

    update(time, delta) {
        console.log(snake.speed)
        this.scoreText.setText(`score: ${gameState.score}`)
        if (snake.update(time)) {
            if(this.bonus!=undefined && snake.collideWithBonus(this.bonus, this.i)){
                this.bonus.destroy();
                }

            else if (snake.collideWithFood(food)){
                this.repositionFood();
                gameState.score+=1;
                this.addBonus();
                console.log(gameState.score);
            }
        }
        if (!snake.alive) {
            this.scene.start('gameOver')
            }
        
    }  
        repositionFood() {
            var testGrid = [];
            for (var y = 1; y < game.config.height/64; y++) {
                testGrid[y] = [];
        
                for (var x = 1; x < game.config.width/64; x++) {
                    testGrid[y][x] = true;
                }
            }
        
            // snake.updateGrid(testGrid);
        
            var validLocations = [];
        
            for (var y = 1; y < game.config.height/64; y++) {
                for (var x = 1; x < game.config.width/64; x++) {
                    if (testGrid[y][x] === true) {
                        validLocations.push({ x: x, y: y });
                    }
                }
            }
        
            if (validLocations.length > 0) {
                var pos = Phaser.Math.RND.pick(validLocations);
                food.setPosition(pos.x*32, pos.y*32);
                return true;
            } else {
                return false;
            }
        }
    

}

var snacegame = new SnakeGame()