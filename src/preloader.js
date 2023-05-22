class Preloader extends Phaser.Scene{
    constructor(){
        super({key: 'preloader'});

        this.loadText;
    }

    preload()
    {
        this.loadText = this.add.text(game.config.width/2, game.config.height/2, 'Loading ...', { fontFamily: 'Arial', fontSize: 64, color: '#e3f2ed' });

        this.loadText.setOrigin(0.5);
        // this.loadText.setStroke('#203c5b', 6);
        // this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        this.load.setPath('assets/');

        this.load.image('background_0', 'skins/bg_0.png');
        this.load.image('background_1', 'skins/bg_1.png');
        this.load.image('background_2', 'skins/bg_2.png');

        this.load.image('head_0', 'skins/head_0.png');
        this.load.image('head_1', 'skins/head_1.png');
        this.load.image('head_2', 'skins/head_2.png');

        this.load.image('body_0', 'skins/body_0.png');
        this.load.image('body_1', 'skins/body_1.png');
        this.load.image('body_2', 'skins/body_2.png');

        this.load.image('tail_0', 'skins/tail_0.png');
        this.load.image('tail_1', 'skins/tail_1.png');
        this.load.image('tail_2', 'skins/tail_2.png');

        this.load.image('button', 'button.png');
        this.load.image('selector', 'selector.png');
        this.load.image('food', 'food.png');
        this.load.image('bonus_1', 'bonus_1.png');
        this.load.image('bonus_0', 'bonus_0.png');
        this.load.image('helmet', 'helmet.png');
    }

    create(){
        this.scene.start(mainMenu);
    }
}

var preloader = new Preloader()