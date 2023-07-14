class MainMenu extends Phaser.Scene{
    constructor(){
        super({key:'mainMenu'})
    }

    create(){
        game_session.action.startGameSession = new Date().getTime();
        console.log(game_session.action.startGameSession)

        this.texturePack = getTexturePack();
        gameState.onMenu = true
        this.menuBG = this.add.image(game.config.width/2, game.config.height/2, `mainBG_${this.texturePack}`).setOrigin(0.5)
        this.menuBG.setDisplaySize(game.config.width, game.config.height)
        this.mainbg = this.add.image(game.config.width / 2, game.config.height/2, 'menuStart').setOrigin(0.5)
        this.mainbg.setDisplaySize(game.config.width, game.config.height)

        this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button').setScale(0.5);
        this.btnStart.setOrigin(0.5)

        this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 120, 'button').setScale(0.5);
        this.btnClose.setOrigin(0.5)

        this.selector = this.add.image(this.btnStart.x, this.btnStart.y, "selector").setScale(0.44)
        this.selector.setOrigin(0.5)

        this.btnStartText = this.add.text(this.btnStart.x, this.btnStart.y, 'НАЧАТЬ ИГРУ',{
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

        this.btnStart.setInteractive()
        this.btnClose.setInteractive()
        this.btnClose.on('pointerdown', this.exit, this)
        this.btnStart.on('pointerdown', this.startGame, this)

        this.input.keyboard.on('keydown-ENTER', this.gameToggle, this)

        // this.input.keyboard.on('keydown-BACKSPACE', ()=>{gameOver.exit();}, this)

        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196){
                this.onPressExit()
            }
        })

        this.clickSound = this.sound.add('click', {loop:false})

        this.loadScore()

        

        this.anims.create({
            key: 'food-animation',
            frames:[
                {key: 'food_small', duration: 500},
                {key: 'food', duration: 500},
                {key: 'food_big', duration: 500}
            ],
            frameRate: 6,
            repeat: -1
        })

        this.bonus = new Bonus(this, -1, -1, `bonus_${1}`, 1);
        this.bonus.alpha = 0


        this.anims.create({
            key: 'liking_0',
            frames: [
                {key:`head_0`},
                {key:`head_lick_0`, duration: 1000}
                ],
            frameRate: 6,
            repeat: -1
        })

        this.anims.create({
            key: 'liking_1',
            frames: [
                {key:`head_1`},
                {key:`head_lick_1`, duration: 1000}
                ],
            frameRate: 6,
            repeat: -1
        })

        this.anims.create({
            key: 'liking_2',
            frames: [
                {key:`head_2`},
                {key:`head_lick_2`, duration: 1000}
                ],
            frameRate: 6,
            repeat: -1
        })

        this.anims.create({
            key: 'onGodeAnimation_0',
            frames: [
                {key:`head_helmet_0`},
                {key:`head_helmet_nolick_0`, duration: 1000}
                ],
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'onGodeAnimation_1',
            frames: [
                {key:`head_helmet_1`},
                {key:`head_helmet_nolick_1`, duration: 1000}
                ],
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'onGodeAnimation_2',
            frames: [
                {key:`head_helmet_2`},
                {key:`head_helmet_nolick_2`, duration: 1000}
                ],
            frameRate: 4,
            repeat: -1
        })
        
        this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, `${game_version}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '30px', fill: '#fff' }).setOrigin(0.5);
    }

    loadScore(){
        if(localStorage.getItem('heighScore_snake')){
            game_session.highscore = JSON.parse(localStorage.getItem('heighScore_snake'));
            this.hieghScoreText = this.add.text(game.config.width/2, game.config.height - 100, `РЕКОРД  ${JSON.parse(localStorage.getItem('heighScore_snake'))}`, { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '65px', fill: '#2E3D66' }).setOrigin(0.5);
        }
        else{
            this.hieghScoreText = this.add.text(game.config.width/2, game.config.height - 100, `РЕКОРД 0`, { fontFamily:'Nunito', fontStyle:'bold', fontSize: '65px', fill: '#2E3D66' }).setOrigin(0.5);
        }
    }

    selectorDown(){
        if(gameState.onMenu==true){
            if(this.selector.y != this.btnClose.y){
              this.selector.y = this.btnClose.y
              this.btnCloseText.setColor('white')
              this.clickSound.play()
            }
        }
    }

    selectorUp(){
        if(gameState.onMenu==true){
            if(this.selector.y != this.btnStart.y){
                this.selector.y = this.btnStart.y
                this.clickSound.play()
            }
        }
    }

    gameToggle(){
        if(gameState.onMenu == true){
            if(this.selector.y == this.btnStart.y){
                this.startGame()
                this.clickSound.play()
            }
            else if(this.selector.y == this.btnClose.y){
                this.clickSound.play();
                window?.parent.postMessage('GameExit', '*');
                this.exit();
            }
        }
    }

    startGame(){
        gameState.onMenu = false
        this.scene.start('snakegame')
    }
    exit(){
        game_session.action.closeGameSession = new Date().getTime();
        // this.sys.game.destroy(true);
    }

    onPressExit(){
        if(gameState.onGame == false){
            gameOver.exit()
        }
    }

    update(){
        this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white'): this.btnCloseText.setColor('#F0516B');
        this.selector.y === this.btnStart.y ? this.btnStartText.setColor('white'): this.btnStartText.setColor('#F0516B');
    }
}
var mainMenu = new MainMenu()