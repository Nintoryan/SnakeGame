class Preloader extends Phaser.Scene{
    constructor(){
        super({key: 'preloader'});

        this.loadText;
    }

    preload()
    {
        this.loadText = this.add.text(game.config.width/2, game.config.height/2, 'ЗАГРУЗКА...', { fontFamily:'Nunito-black', fontStyle:'bold', fontSize: '40px', fill: 'white'});
        this.loadText2 = this.add.text(game.config.width/2, game.config.height/2, 'ЗАГРУЗКА...', { fontFamily:'Nunito', fontStyle:'bold', fontSize: '40px', fill: 'white'});
        this.loadText2.alpha = 0;
        this.loadText.setOrigin(0.5);
        // this.loadText.setStroke('#203c5b', 6);
        // this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        this.load.setPath('assets/');

        this.load.image('info', 'gameInfo.png');
        this.load.image('controlsInfo', 'controlsInfo.png');
        this.load.image('ageInfo', 'ageInfo.png')
        
        this.load.image('background_0', 'skins/bg_0.png');
        this.load.image('background_1', 'skins/bg_1.png');
        this.load.image('background_2', 'skins/bg_2.png');

        this.load.image('head_0', 'skins/head_0.png');
        this.load.image('head_1', 'skins/head_1.png');
        this.load.image('head_2', 'skins/head_2.png');
        this.load.image('head_lick_0', '/skins/head_lick_0.png');
        this.load.image('head_lick_1', '/skins/head_lick_1.png');
        this.load.image('head_lick_2', '/skins/head_lick_2.png');

        this.load.image('body_0', 'skins/body_0.png');
        this.load.image('body_1', 'skins/body_1.png');
        this.load.image('body_2', 'skins/body_2.png');

        this.load.image('tail_0', 'skins/tail_0.png');
        this.load.image('tail_1', 'skins/tail_1.png');
        this.load.image('tail_2', 'skins/tail_2.png');

        this.load.image('scoreIcon', 'ui/scoreIcon.png')
        this.load.image('bestIcon', 'ui/bestIcon.png')

        this.load.image('menuStart', 'ui/menuStart.png');
        this.load.image('menuGameOver', 'ui/menuGameOver.png')
        this.load.image('mainBG_0', 'ui/uibg_0.png');
        this.load.image('mainBG_1', 'ui/uibg_1.png');
        this.load.image('mainBG_2', 'ui/uibg_2.png');
        this.load.image('pause', 'ui/pause.png')

        this.load.image('button', 'button.png');
        this.load.image('selector', 'selector.png');
        this.load.image('food', 'food.png');
        this.load.image('food_small', 'food_small.png');
        this.load.image('food_big', 'food_big.png');
        this.load.image('bonus_1', 'bonus_1.png');
        this.load.image('bonus_0', 'bonus_0.png');
        this.load.image('bonus_small_0', 'bonus_small_0.png');
        this.load.image('bonus_small_1', 'bonus_small_1.png');
        this.load.image('bonus_big_0', 'bonus_big_0.png');
        this.load.image('bonus_big_1', 'bonus_big_1.png');
        this.load.image('head_helmet_0', '/skins/head_helmet_0.png');
        this.load.image('head_helmet_1', '/skins/head_helmet_1.png');
        this.load.image('head_helmet_2', '/skins/head_helmet_2.png');
        this.load.image('head_helmet_nolick_0', '/skins/head_helmet_nolick_0.png');
        this.load.image('head_helmet_nolick_1', '/skins/head_helmet_nolick_1.png');
        this.load.image('head_helmet_nolick_2', '/skins/head_helmet_nolick_2.png');

        this.load.audio('background-music', 'sounds/background_music.mp3');
        this.load.audio('bite', 'sounds/bite.mp3');
        this.load.audio('bonus', 'sounds/bonus.mp3');
        this.load.audio('click', 'sounds/click.mp3');
        this.load.audio('down', 'sounds/down.mp3');
        this.load.audio('left', 'sounds/left.mp3');
        this.load.audio('lose', 'sounds/lose.mp3');
        this.load.audio('right', 'sounds/right.mp3');
        this.load.audio('up', 'sounds/up.mp3');
    }

    create(){
        this.scene.start(mainMenu);
    }
}

var preloader = new Preloader()