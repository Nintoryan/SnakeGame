class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'gameOver'})
    }

    create(){
        game_session.action.gameOver = new Date().getTime();
        console.log(game_session.action.gameOver)
        
        snacegame.bgmusic.stop()
        gameState.onGame = false
        gameState.isOver = true

        this.menuBG = this.add.image(game.config.width/2, game.config.height/2, `mainBG_${mainMenu.texturePack}`).setOrigin(0.5)
        this.menuBG.setDisplaySize(game.config.width, game.config.height)

        this.controlsInfo = this.add.image(310, 70, 'controlsInfo').setOrigin(0.5)

        this.gameOverImg = this.add.image(game.config.width/2, game.config.height/2, 'menuGameOver').setOrigin(0.5)
        this.gameOverImg.setDisplaySize(game.config.width, game.config.height)

        this.scoreText = this.add.text(game.config.width/2, game.config.height - 150, `СЧЁТ: ${gameState.score}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '32px', fill: '#2E3D66' }).setOrigin(0.5)
        this.scoreText.setOrigin(0.5)
        this.btnRestart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button')
        this.btnRestart.setOrigin(0.5)
        this.btnRestart.setScale(0.5)
        this.btnClose = this.add.sprite(this.btnRestart.x, this.btnRestart.y + 120, 'button').setScale(0.5)
        this.btnClose.setOrigin(0.5)

        this.selector = this.add.sprite(this.btnRestart.x, this.btnRestart.y, 'selector')
        this.selector.setOrigin(0.5)
        this.selector.setScale(0.44)

        this.btnRestart.setInteractive()
        this.btnClose.setInteractive()

        this.btnRestartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "ЗАНОВО",{
                fontFamily: 'Nunito',
                fontSize: '60px',
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.btnRestartText.setOrigin(0.5)

        this.btnCloseText = this.add.text(this.btnClose.x, this.btnClose.y, "ВЫЙТИ",{
            fontFamily: 'Nunito',
                fontSize: '60px',
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.btnCloseText.setOrigin(0.5)

        this.btnRestart.on('pointerdown', this.startGame, this)
        this.btnClose.on('pointerdown', this.exit, this)

        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this)

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })

        // this.input.keyboard.on('keydown-BACKSPACE', ()=>{this.exit()}, this)

        this.saveScore();
        this.loadScore();
        game_session.score = gameState.score

        this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
    }

    selectorDown(){
        if(gameState.isOver==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y = this.btnClose.y
              this.btnCloseText.setColor('white')
              this.clickSound.play()
            }
        }
    }

    selectorUp(){
        if(gameState.isOver==true){
            if(this.selector.y != this.btnRestart.y){
                this.selector.y = this.btnRestart.y
                mainMenu.clickSound.play()
            }
        }
    }

    gameToggle(){
        if(gameState.isOver == true){
            if(this.selector.y == this.btnRestart.y){
                mainMenu.clickSound.play()
                this.startGame()
            }
            else if(this.selector.y == this.btnClose.y){
                mainMenu.clickSound.play()
                this.exit()
            }
        }
    }

    startGame(){
        gameState.isOver = false
        gameState.score = 0
        mainMenu.texturePack = getTexturePack();
        this.scene.start('snakegame')
    }
    exit(){
        game_session.onClose = true
        window?.parent.postMessage('GameExit', '*');
        game_session.action.closeGameSession = new Date().getTime();
        // this.sys.game.destroy(true);
    }

    onPressExit(){
        if(gameState.onGame == false){
            this.exit()
        }
    }

    saveScore(){
        this.heighScore = gameState.score;

        game_session.highscore = JSON.parse(localStorage.getItem('heighScore_snake'));
        
        this.oldScore = JSON.parse(localStorage.getItem('heighScore_snake'));
        this.heighScore > this.oldScore ? localStorage.setItem('heighScore_snake', JSON.stringify(this.heighScore)) : this.heighScore = this.oldScore;
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            console.log(localStorage.getItem('heighScore_snake'))
            this.hieghScoreText = this.add.text(game.config.width/2, game.config.height - 100, `РЕКОРД: ${JSON.parse(localStorage.getItem('heighScore_snake'))}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '40px', fill: '#2E3D66' }).setOrigin(0.5);
        }
    }

    update(){
        this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white'): this.btnCloseText.setColor('#F0516B');
        this.selector.y === this.btnRestart.y ? this.btnRestartText.setColor('white'): this.btnRestartText.setColor('#F0516B');
    }


}

var gameOver = new GameOver()