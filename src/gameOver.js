class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'gameOver'})
    }

    create(){
        gameState.onGame = false
        gameState.isOver = true

        this.title = this.add.text(game.config.width / 2, game.config.height/3, "GAME OVER",{
            fontFamily: 'monospace',
                fontSize: 48,
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.title.setOrigin(0.5)

        this.scoreText = this.add.text(game.config.width / 2, game.config.height/3 + 70,`Score: ${gameState.score}`)
        this.scoreText.setOrigin(0.5)
        this.btnRestart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button')
        this.btnRestart.setOrigin(0.5)
        this.btnClose = this.add.sprite(this.btnRestart.x, this.btnRestart.y + 70, 'button')
        this.btnClose.setOrigin(0.5)

        this.selector = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'selector')
        this.selector.setOrigin(0.5)
        this.selector.setScale(0.1)

        this.btnRestart.setInteractive()
        this.btnClose.setInteractive()

        this.btnRestartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Restart",{
            fontFamily: 'monospace',
                fontSize: 30,
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.btnRestartText.setOrigin(0.5)

        this.btnCloseText = this.add.text(this.btnRestart.x, this.btnRestart.y + 70, "Close",{
            fontFamily: 'monospace',
                fontSize: 30,
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.btnCloseText.setOrigin(0.5)

        this.btnRestart.on('pointerdown', this.startGame, this)
        this.btnClose.on('pointerdown', this.exit, this)

        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this)

        this.saveScore();
        this.loadScore();
    }

    selectorDown(){
        if(gameState.isOver==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y += 70
            }
        }
    }

    selectorUp(){
        if(gameState.isOver==true){
            if(this.selector.y != this.btnRestart.y){
                this.selector.y -=70
            }
        }
    }

    gameToggle(){
        if(gameState.isOver == true){
            if(this.selector.y == this.btnRestart.y){
                this.startGame()
            }
            else if(this.selector.y == this.btnClose.y){
                this.exit()
            }
        }
    }

    startGame(){
        gameState.isOver = false
        gameState.score = 0
        this.scene.start('snakegame')
    }
    exit(){
        this.sys.game.destroy(true);
        window.close()
    }

    saveScore(){
        this.heighScore = gameState.score;
        this.oldScore = JSON.parse(localStorage.getItem('heighScore_snake'));
        this.heighScore > this.oldScore ? localStorage.setItem('heighScore_snake', JSON.stringify(this.heighScore)) : this.heighScore = this.oldScore;
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            this.heigScoreText = this.add.text(this.scoreText.x - 170, this.scoreText.y + 20, `Heighscore: ${JSON.parse(localStorage.getItem('heighScore_snake'))}`, {
                fontFamily: 'monospace',
                fontSize: 48,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            })
        }
    }


}

var gameOver = new GameOver()