class SnakeGame extends Phaser.Scene{
    constructor(){
        super({key: 'snakegame'})
    }

    create(){
        game_session.action.startGame = new Date().getTime();
        console.log(game_session.action.startGame)
        gameState.onGame = true
        this.texturePack = mainMenu.texturePack
        this.backGround = this.add.image(game.config.width/2, game.config.height/2, `background_${this.texturePack}`).setOrigin(0.5);
        this.backGround.setDisplaySize(game.config.width, game.config.height+16);
        this.bgmusic = this.sound.add('background-music', {loop: false, volume: 0.5});
        this.marker = 0
        this.bgmusic.play();
        
        this.scoreText = this.add.text(game.config.width/2 - 100, 55, `${gameState.score}`, { fontFamily:'Nunito', fontStyle:'bold', fontSize: '40px', fill: 'white', textAlign: 'start'  }).setOrigin(0.5)
        this.scoreIcon = this.add.image(this.scoreText.x - 90, this.scoreText.y, 'scoreIcon').setOrigin(0.5).setDisplaySize(60, 66);

        this.gameInfo = this.add.image(265, 60, 'info').setScale(0.43).setOrigin(0.5);

        this.food = food = new Food(snacegame, 30, 20, 'food');
        this.snake = snake = new Snake(snacegame, 20, 20, 'body_0');
        
        this.snake.grow();
        this.snake.grow();
        // this.input.keyboard.on('keydown-BACKSPACE', ()=>{this.pause()}, this)
        // this.input.keyboard.on('keydown-SPACE', ()=> {this.snake.godMode()}, this);
        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.pause()
            }
        })
        this.loadScore();
        console.log(this.snake);
        this.snake.bodySegments[1].setSize(30,30, true)
        this.snake.bodySegments[1].depth = this.food.body.depth
        this.physics.add.collider(this.snake.bodySegments[1], this.food.body, ()=>{this.snake.grow(); this.repositionFood(); this.snake.biteSound.play();gameState.score+=1}, null, this);
        
        this.stopSound =  setInterval(()=>{this.soundOff(); this.marker >= 5 ? clearInterval(this.stopSound) && this.bgmusic.stop() : null}, 1000);
        
        this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
        this.getField()
    }

    soundOff(){
        if(this.bgmusic.volume > 0){
            this.bgmusic.volume -= 0.1
            this.marker++
        }
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            console.log(localStorage.getItem('heighScore_snake'));
            this.hieghScoreText = this.add.text(this.scoreText.x + 260, this.scoreText.y, `${JSON.parse(localStorage.getItem('heighScore_snake'))}`, {fontFamily:'Nunito', fontStyle:'bold', fontSize: '40px', fill: 'white', textAlign: 'start' }).setOrigin(0.5);
            this.hieghScoreIcon = this.add.image(this.hieghScoreText.x - 90, this.hieghScoreText.y, 'bestIcon').setDisplaySize(72, 66).setOrigin(0.5);
        }
    }

    pause(){
        gameState.onGame = false;
        this.scene.pause(snacegame);
        this.scene.launch(scenePause);
    }

    addBonus(x, y, i){
        if(gameState.score > 0 && gameState.score%10 === 0){
            this.bonus = new Bonus(this, x, y, `bonus_${i}`, i);
            
            console.log(i)

            console.log(this.bonus);
            this.physics.add.collider(this.snake.bodySegments[1], this.bonus.body, ()=>{this.bonus.bonusSound.play(); if(this.bonus.index == 0){this.snake.speedUp()}; if(this.bonus.index==1){this.snake.godMode()}; this.bonus.destroy()}, null, this);
            setTimeout(()=>{
                this.bonus.destroy()
            }, 12000)
            
        }
    }

    update(time, delta) {

        this.marker >= 5 ? clearInterval(this.stopSound) && this.bgmusic.stop() : null
        this.scoreText.setText(`${gameState.score}`)

        game_session.score = gameState.score

        if (snake.update(time)) {
            if(this.bonus!=undefined && snake.collideWithBonus(this.bonus)){
                this.bonus.destroy();
                }

            // else if (snake.collideWithFood(food)){
            //     this.repositionFood();
            //     gameState.score+=1;
            // }
        }
        if (!snake.alive) {
            this.snake.destroy()
            this.scene.start('gameOver')
            }
        
    }  
        repositionFood() {
            let ocupate = []
            
            
            for (let segment of this.snake.bodySegments){
                ocupate.push({x:segment.x, y: segment.y})
            }
            console.log(ocupate)
        
            if (validLocationsX.length > 0) {
                
                var pos = {
                    x: this.getPositionX(),
                    y: this.getPositionY()
                };

                var newpos = {
                    x: this.getPositionX(),
                    y: this.getPositionY()
                };

                for(let point of ocupate){
                    if(pos.x == Math.floor(point.x/CELL) && pos.y == Math.floor(point.y/CELL)){
                        pos = {
                            x: this.getPositionX(),
                            y: this.getPositionY()
                        }
                        console.log(pos.x, pos.y)
                    }
                    else if(newpos.x == Math.floor(point.x/CELL) && newpos.y == Math.floor(point.y/CELL)){
                        newpos = {
                            x: this.getPositionX(),
                            y: this.getPositionY()
                        }
                    }
                }

                food.body.setPosition(pos.x*CELL, pos.y*CELL);
                this.addBonus(newpos.x, newpos.y, Math.floor(Math.random()*2));
                return true;
            } else {
                return false;
            }
        }

        getPositionX(){
            let x = Phaser.Math.RND.pick(validLocationsX);
            return x;
        }

        getPositionY(){
            let y = Phaser.Math.RND.pick(validLocationsY);
            return y;
        }

        getField(){
            for (var y = 6; y < (game.config.height/CELL)-2; y++) {
                validLocationsY.push(Math.floor(y))
            }
            for (var x = 3; x < (game.config.width/CELL)-3; x++) {
                validLocationsX.push(Math.floor(x))
             }
        }
    

}
            var validLocationsY = [];
            var validLocationsX = []


var snacegame = new SnakeGame()