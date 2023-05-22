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