class Entity extends Phaser.GameObjects.Image{
    constructor(scene, x, y, type){
        super(scene, x, y)

        this.scene = scene
        this.scene.add.existing(this)
        this.setData('type', type)
        this.setData('isDead', false)
    }
}



class Food extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('food');
        this.setDisplaySize(32,32);
        this.setPosition(x * 32, y * 32);
        this.setOrigin(0.5);

        this.total = 0;
    }
    eat() {
        this.total++
    }
}
class Bonus extends Entity{
    constructor(scene, x, y, texture){
        super(scene, x, y)
        this.onPlate = false
        this.setTexture(texture)
        this.setPosition(x * 32, y * 32);
        this.setOrigin(0.5);
        this.setDisplaySize(32,32);
    }
}

class Snake extends Entity {
    constructor(scene, x, y){
        super(scene, x, y);
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 32, y * 32, `head_${snacegame.texturePack}`);
        this.head.setOrigin(0.5);
        this.head.setDisplaySize(45, 45);
        this.head.rotation = 4.7
        this.head.depth = 5

        this.alive = true;

        this.speed = 130;

        this.moveTime = 0;

        
        this.tail = this.body.create(this.head.x, this.head.y, `tail_${snacegame.texturePack}`);
        this.tail.setOrigin(0.5);
        this.tail.setDisplaySize(40,50);
        this.tail.depth = 4
        this.end = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;

        this.bodySegments = this.body.getChildren();
        this.onGod = false;
        }

        update(time) {
            if(gameState.onGame==true){
                this.bodySegments.forEach(seg => {
                    seg.rotation = this.head.rotation
                })

                if (time >= this.moveTime) {
                    return this.move(time);
                }
            }
            
        }

        faceLeft() {
            if(gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = LEFT;
                    // this.head.rotation = 1.5
                    this.bodySegments.forEach(seg => {
                        seg.rotation = 1.57
                    });
                }
            }
        }

        faceRight() {if(
            gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = RIGHT;
                    this.bodySegments.forEach(seg => {
                        seg.rotation = 4.7
                    });
                }
            }
        }

        faceUp() {if(
            gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = UP;
                    this.bodySegments.forEach(seg => {
                        seg.rotation = 3.15
                    }); 
                }
            }
        };
        faceDown() {
            if(gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = DOWN;
                    this.bodySegments.forEach(seg => {
                        seg.rotation = 0
                    }); 
                }
            }
        }

        move(time) {
            if(gameState.onGame==true){
                if(this.onGod == false){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x - 1, -1, game.config.width/32);
                        break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x + 1, -1, game.config.width/32);
                        break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y - 1, -1, game.config.height/32);
                        break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y + 1, -1, game.config.height/32);
                        break;
                    }
                }
                else if(this.onGod == true){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, -1, game.config.width/32);
                            break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, -1, game.config.width/32);
                            break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, -1, game.config.height/32);
                            break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, -1, game.config.height/32);
                            break;
                    }
                }

            this.direction = this.heading;
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 32, this.headPosition.y * 32, 1, this.end);
            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

            if (hitBody && this.onGod == false) {
                console.log('dead');

                this.alive = false;

                return false;
            }
            // else if(this.headPosition.x == game.config.width/32||this.headPosition.y == game.config.height/32||this.headPosition.x == -1||this.headPosition.y == -1){
            //     if(this.onGod == false){
            //         this.alive = false
            //     }
            //     else{
            //         return;
            //     }
            // }
            
            else {
                this.moveTime = time + this.speed;
                return true;
            }
        }
    }

    grow() {
        this.tail.setTexture(`body_${snacegame.texturePack}`)
        this.tail.setDisplaySize(50, 50)
        this.tail = this.body.create(this.head.x, this.head.y, `tail_${snacegame.texturePack}`)
        this.tail.setOrigin(0.5)
        this.tail.setDisplaySize(50, 50)
        
        // this.tail.destroy()
        // this.tail = this.body.create(newPart.x, newPart.y, 'body');
        // this.tail.setOrigin(0.5);
        // this.tail.setDisplaySize(32,32);
    };
    
    godMode(){
        this.onGod = true
        setTimeout(()=>{this.onGod = false}, 5000);
    }
    speedUp(){
        this.speed -= 30;
        setTimeout(()=>{this.speed +=30}, 5000);
    }

    collideWithBonus(bonus, i){
        if(this.head.x === bonus.x && this.head.y === bonus.y){

            i === 0 ? this.speedUp() : this.godMode();
            // this.godMode()
            return true;
        }
        else{
            return false;
        }
    }

    collideWithFood(food) {
        if (this.head.x === food.x && this.head.y === food.y){
            this.grow();
            food.eat();
        
            if (this.speed > 30 && food.total % 5 === 0) {
            this.speed -= 5;
            }

            return true;
        }
        else {
            return false;
        }
    };

    updateGrid(grid) {
        this.body.children.each(function(segment) {
        var bx = segment.x / 32;
        var by = segment.y / 32;

        grid[by][bx] = false;
        });

        return grid;
    }
}