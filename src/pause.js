class ScenePause extends Phaser.Scene{
    constructor(){
        super({key: 'scenePause'})
    }

    create(){
        gameState.onPause = true
        this.bgpauseImage = this.add.image(game.config.width/2, game.config.height/2, `mainBG_${mainMenu.texturePack}`).setOrigin(0.5)
        this.bgpauseImage.setDisplaySize(game.config.width, game.config.height)
        this.pauseScreen = this.add.image(game.config.width / 2, game.config.height / 2, 'pause').setOrigin(0.5).setDisplaySize(game.config.width, game.config.height)
        this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button').setScale(0.5);
        this.btnStart.setOrigin(0.5)

        this.controlsInfo = this.add.image(310, 70, 'controlsInfo').setOrigin(0.5)

        this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 120, 'button').setScale(0.5);
        this.btnClose.setOrigin(0.5)

        this.selector = this.add.image(game.config.width / 2, game.config.height / 2 + 100, "selector");
        this.selector.setScale(0.44)
        this.selector.setOrigin(0.5)

        this.btnStartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'ПРОДОЛЖИТЬ',{
            fontFamily: 'Nunito',
            fontSize: '60px',
            color: 'black',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnStartText.setOrigin(0.5)
        this.btnCloseText = this.add.text(this.btnClose.x, this.btnClose.y, 'ВЫЙТИ',{
            fontFamily: 'Nunito',
            fontSize: '60px',
            color: 'black',
            fontStyle: 'bold',
            align: 'center'
        });
        this.btnCloseText.setOrigin(0.5)

        this.btnStart.setInteractive();
        this.btnClose.setInteractive();
        this.btnClose.on('pointerdown', this.exit, this);
        this.btnStart.on('pointerdown', this.resumeGame, this);
        
        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })
        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);
        this.scoreText = this.add.text(game.config.width/2, game.config.height - 150, `СЧЁТ: ${gameState.score}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '32px', fill: '#2E3D66' }).setOrigin(0.5)
        this.loadScore()

        
        this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            console.log(localStorage.getItem('heighScore_snake'))
            this.hieghScoreText = this.add.text(game.config.width/2, game.config.height - 100, `РЕКОРД: ${JSON.parse(localStorage.getItem('heighScore_snake'))}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '40px', fill: '#2E3D66' }).setOrigin(0.5);
        }
    }

    selectorDown(){
        if(gameState.onPause==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y = this.btnClose.y
              mainMenu.clickSound.play()
            }
        }
    }

    selectorUp(){
        if(gameState.onPause==true){
            if(this.selector.y != this.btnStart.y){
                this.selector.y = this.btnStart.y
                mainMenu.clickSound.play()
            }
        }
    }

    gameToggle(){
        if(gameState.onPause == true){
            if(this.selector.y == this.btnStart.y){
                this.resumeGame()
                mainMenu.clickSound.play()
            }
            else if(this.selector.y == this.btnClose.y){
                mainMenu.clickSound.play()
                window?.parent.postMessage('GameExit', '*');
                gameOver.exit()
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
        game_session.action.closeGameSession = new Date().getTime();
        
        // this.sys.game.destroy(true);
        // window.close();
    }

    onPressExit(){
        if(gameState.onPause == true){
            gameOver.exit()
        }
    }

    update(){
        this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white'): this.btnCloseText.setColor('#F0516B');
        this.selector.y === this.btnStart.y ? this.btnStartText.setColor('white'): this.btnStartText.setColor('#F0516B');
    }

}

var scenePause = new ScenePause()