class MainMenu extends Phaser.Scene{
    constructor(){
        super({key:'mainMenu'})
    }

    create(){
        gameState.onMenu = true

        this.title = this.add.text(game.config.width / 2, game.config.height/2, "MAIN MENU",{
                fontFamily: 'monospace',
                fontSize: 48,
                fontStyle: 'bold',
                align: 'center',
                color: 'black'
        })
        this.title.setOrigin(0.5)

        this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button');
        this.btnStart.setOrigin(0.5)

        this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 70, 'button');

        this.selector = this.add.image(game.config.width / 2, game.config.height / 2 + 100, "selector")
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

        this.btnStart.setInteractive()
        this.btnClose.setInteractive()
        this.btnClose.on('pointerdown', this.exit, this)
        this.btnStart.on('pointerdown', this.startGame, this)

        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this)

    }

    selectorDown(){
        if(gameState.onMenu==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y += 70
            }
        }
    }

    selectorUp(){
        if(gameState.onMenu==true){
            if(this.selector.y != this.btnStart.y){
                this.selector.y -=70
            }
        }
    }

    gameToggle(){
        if(gameState.onMenu == true){
            if(this.selector.y == this.btnStart.y){
                this.startGame()
            }
            else if(this.selector.y == this.btnClose.y){
                this.exit()
            }
        }
    }

    startGame(){
        gameState.onMenu = false
        this.scene.start('snakegame')
    }
    exit(){
        this.sys.game.destroy(true);
        history.back()
    }

    update(){
        
    }
}
var mainMenu = new MainMenu()