class Entity extends Phaser.GameObjects.Image{
    constructor(scene, x, y, type){
        super(scene, x, y)

        this.scene = scene
        this.scene.add.existing(this)
        this.setData('type', type)
        this.setData('isDead', false)
    }
}

class Bonus extends Entity{
    constructor(scene, x, y){
        super(scene, x, y)
        this.onPlate = false
        this.setTexture('bonus');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0.5);
        this.setDisplaySize(32,32);
    }
}

class Food extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setDisplaySize(32,32);
        this.setTexture('food');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0.5);

        this.total = 0;
    }
    eat() {
        this.total++
    }
}

class Snake extends Entity {
    constructor(scene, x, y){
        super(scene, x, y);
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 16, y * 16, 'head');
        // this.body.DislpayHeight = game.config.height/2;
        this.head.setOrigin(0.5);
        this.head.setDisplaySize(40, 40);
        this.head.depth = 5

        this.alive = true;

        this.speed = 120;

        this.moveTime = 0;

        
        
        this.tail = this.body.create(this.head.x, this.head.y, 'tail');
        this.tail.setOrigin(0.5);
        this.tail.setDisplaySize(32,32);
        this.end = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;

        this.bodySegments = this.body.getChildren;
        this.onGod = false;
        }

        update(time) {
            if(gameState.onGame==true){
                this.tail.rotation = this.head.rotation
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            }
        }

        faceLeft() {
            if(gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = LEFT;
                    this.head.rotation = 3.2
                }
            }
        }

        faceRight() {if(
            gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = RIGHT;
                    this.head.rotation = 0
                }
            }
        }

        faceUp() {if(
            gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = UP;
                    this.head.rotation = 4.7
                }
            }
        };
        faceDown() {
            if(gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = DOWN;
                    this.head.rotation = 1.6
                }
            }
        }

        move(time) {
            if(gameState.onGame==true){
                if(this.onGod == false){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x - 1, -1, game.config.width/16);
                        break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x + 1, -1, game.config.width/16);
                        break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y - 1, -1, game.config.height/16);
                        break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y + 1, -1, game.config.height/16);
                        break;
                    }
                }
                else if(this.onGod == true){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, -1, game.config.width/16);
                            break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, -1, game.config.width/16);
                            break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, -1, game.config.height/16);
                            break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, -1, game.config.height/16);
                            break;
                    }
                }

            this.direction = this.heading;
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.end);
            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

            if (hitBody && this.onGod == false) {
                console.log('dead');

                this.alive = false;

                return false;
            }
            else if(this.headPosition.x == game.config.width/16||this.headPosition.y == game.config.height/16||this.headPosition.x == -1||this.headPosition.y == -1){
                if(this.onGod == false){
                    this.alive = false
                }
                else{
                    return;
                }
            }
            
            else {
                this.moveTime = time + this.speed;
                return true;
            }
        }
    }

    grow() {
        var newPart = this.body.create(this.end.x, this.end.y, 'body')
        newPart.setOrigin(0.5)
        newPart.setDisplaySize(32, 32)
        this.tail.destroy()
        this.tail = this.body.create(newPart.x, newPart.y, 'tail');
        this.tail.setOrigin(0.5);
        this.tail.setDisplaySize(32,32);
    };
    
    godMode(){
        this.onGod = true
        setTimeout(()=>{this.onGod = false}, 5000);
    }
    speedUp(){
        this.speed -= 30;
        setTimeout(()=>{this.speed +=30}, 5000);
    }

    collideWithBonus(bonus){
        if(this.head.x === bonus.x && this.head.y === bonus.y){
            var rand = Math.random();
            rand > 0.5 ? this.speedUp() : this.godMode();
            // this.godMode()
            return true;
        }
        else{
            return false;
        }
    }

    collideWithFood(food) {
        if (this.head.x === food.x && this.head.y === food.y) {
            this.grow();
            food.eat();

        if (this.speed > 20 && food.total % 5 === 0) {
            this.speed -= 5;
        }

        return true;
        } else {
            return false;
        }
    };

    updateGrid(grid) {
        this.body.children.each(function(segment) {
        var bx = segment.x / 16;
        var by = segment.y / 16;

        grid[by][bx] = false;
        });

        return grid;
    }
}