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
        this.body = this.scene.physics.add.sprite(x*CELL, y*CELL, 'food').play('food-animation');
        this.body.setDisplaySize(32, 32);
        this.body.setSize(30,30, true)
        
        this.body.setOrigin(0.5);
        this.total = 0;
    }
    eat() {
        this.total++
    }
}
class Bonus extends Entity{
    constructor(scene, x, y, texture, i){
        super(scene, x, y);
        this.onPlate = false;
        this.body = this.scene.physics.add.sprite(x * CELL, y * CELL, texture).play(`bonus-animation_${i}`);
        this.body.setDisplaySize(32, 32);
        
        this.body.setOrigin(0.5);
        this.index = i;
        this.bonusSound = this.scene.sound.add('bonus', {loop: false, volume: 0.5});

        this.scene.anims.create({
            key: 'bonus-animation_0',
            frames:[
                {key: `bonus_small_${0}`, duration: 500},
                {key: `bonus_${0}`, duration: 500},
                {key: `bonus_big_${0}`, duration: 500}
            ],
            frameRate: 6,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'bonus-animation_1',
            frames:[
                {key: `bonus_small_${1}`, duration: 500},
                {key: `bonus_${1}`, duration: 500},
                {key: `bonus_big_${1}`, duration: 500}
            ],
            frameRate: 6,
            repeat: -1
        })
    }
}

class Snake extends Entity {
    constructor(scene, x, y){
        super(scene, x, y);
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.scene.physics.add.sprite(x * CELL, y * CELL, `head_${mainMenu.texturePack}`).play(`liking_${mainMenu.texturePack}`);
        this.body.add(this.head)
        this.head.setOrigin(0.5);
        this.head.setScale(0.4);
        this.head.setDepth(4);
        this.head.rotation = 4.7

        this.alive = true;

        this.speed = 130;

        this.moveTime = 0;

        
        this.tail = this.scene.physics.add.sprite(this.head.x, this.head.y, `tail_${mainMenu.texturePack}`);
        this.body.add(this.tail);
        this.tail.setOrigin(0.5);
        this.tail.setDisplaySize(32, 32);
        this.tail.setSize(32, 32, true);

        this.bodyGraphics = this.scene.add.graphics();

        this.end = new Phaser.Geom.Point(x, y);

        this.heading = RIGHT;
        this.direction = RIGHT;

        this.bodySegments = this.body.getChildren();
        this.onGod = false;

        this.biteSound = this.scene.sound.add('bite', {loop: false, volume: 0.5});
        this.leftSound = this.scene.sound.add('left', {loop: false, volume: 0.5});
        this.rightSound = this.scene.sound.add('right', {loop: false, volume: 0.5});
        this.upSound = this.scene.sound.add('up', {loop: false, volume: 0.5});
        this.downSound = this.scene.sound.add('down', {loop: false, volume: 0.5});
        this.deadSound = this.scene.sound.add('lose', {loop: false, volume: 0.5});

        this.turnPoints = [];
        let turnPointL = new Phaser.Geom.Point(this.head.x, this.head.y);
        turnPointL.name = 'turnPointL';
        let turnPointR = new Phaser.Geom.Point(this.head.x, this.head.y);
        turnPointR.name = 'turnPointR';
        let turnPointU = new Phaser.Geom.Point(this.head.x, this.head.y);
        turnPointU.name = 'turnPointU';
        let turnPointD = new Phaser.Geom.Point(this.head.x, this.head.y);
        turnPointD.name = 'turnPointD';
        //this.turnPoints.push(turnPointL, turnPointR, turnPointU, turnPointD);
        }

        snakeRotation()
        {
            

            for(let r = 0; r < this.turnPoints.length; r++){
                for(let i = 1; i < this.bodySegments.length; i++){
                    if(this.bodySegments[i].x == this.turnPoints[r].x && this.bodySegments[i].y == this.turnPoints[r].y){
                        this.bodySegments[i].rotation = this.bodySegments[i-1].rotation;
                    }
                }
            }
        }

        updateBodyGraphics(){

            let bodyWidth = 28;
            let bodyRadius = 6;

            let points = [this.bodySegments[0]];

            let horizontal = true;

            for(let i = 1; i < this.bodySegments.length-1; i++)
            {   
                if(horizontal)
                {
                    if(this.bodySegments[i].y != points[points.length-1].y)
                    {
                        points.push(this.bodySegments[i-1]);
                        horizontal = false;
                    }
                }
                else
                {
                    if(this.bodySegments[i].x != points[points.length-1].x)
                    {
                        points.push(this.bodySegments[i-1]);
                        horizontal = true;
                    }
                }

                var x1 = this.bodySegments[i].x;
                var y1 = this.bodySegments[i].y;

                var x2 = this.bodySegments[i-1].x;
                var y2 = this.bodySegments[i-1].y;

                //Расстояние между текущим кусок тела и прошлым больше 1
                if(!(Math.abs(x1-x2) == CELL ^ Math.abs(y1-y2) == CELL))
                {
                    points.push(this.bodySegments[i-1]);
                    points.push(null);
                    points.push(this.bodySegments[i]);
                }
                
            }

            points.push(this.bodySegments[this.bodySegments.length-2]);

            points = this.removeDuplicatesKeepFirst(points);

            if(points.length >= 2)
            {
                this.bodyGraphics.clear();
            }

            switch(mainMenu.texturePack){
                case 0:
                    this.bodyGraphics.fillStyle(0xff7900);
                    break;
                case 1:
                    this.bodyGraphics.fillStyle(0xf7506a);
                    break;
                case 2:
                    this.bodyGraphics.fillStyle(0xf2e820);
                    break;
            }

            for(let i = 1; i < points.length; i++)
            {
                let p1 = points[i-1];
                let p2 = points[i];

                if(p1 == null || p2 == null) continue;

                if(p1.x == p2.x)
                {
                    this.bodyGraphics.fillRoundedRect(Math.min(p1.x, p2.x)-bodyWidth/2, Math.min(p1.y, p2.y)-bodyWidth/2, bodyWidth, Math.abs(p1.y-p2.y) + bodyWidth, bodyRadius);
                }
                else if(p1.y == p2.y)
                {
                    this.bodyGraphics.fillRoundedRect(Math.min(p1.x, p2.x)-bodyWidth/2, Math.min(p1.y, p2.y)-bodyWidth/2, Math.abs(p1.x-p2.x) + bodyWidth, bodyWidth, bodyRadius);
                }
            }
            
            this.bodyGraphics.fillPath();
        }

        removeDuplicatesKeepFirst(arr) {
            const uniqueValues = new Set();
            return arr.filter((value) => {
              if (value === null || !uniqueValues.has(value)) {
                uniqueValues.add(value);
                return true;
              }
              return false;
            });
          }

        update(time) {
            if(gameState.onGame==true){
                this.updateBodyGraphics();
                this.snakeRotation();
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            }
            
        }

        faceLeft()
        {
            if(gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = LEFT;
                    this.leftSound.play();
                    this.head.rotation = 1.57079;
                    let turnPointL = new Phaser.Geom.Point(this.head.x, this.head.y);
                    this.turnPoints.push(turnPointL);
                }
            }
        }

        faceRight() 
        {
            if(gameState.onGame==true){
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = RIGHT;
                    this.rightSound.play();
                    this.head.rotation = 4.71238;
                    let turnPointR = new Phaser.Geom.Point(this.head.x, this.head.y);
                    this.turnPoints.push(turnPointR);
                }
            }
        }

        faceUp()
        {
            if(gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = UP;
                    this.upSound.play();
                    this.head.rotation = 3.14159;
                    let turnPointU = new Phaser.Geom.Point(this.head.x, this.head.y);
                    this.turnPoints.push(turnPointU);
                }
            }
        };
        faceDown()
        {
            if(gameState.onGame==true){
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = DOWN;
                    this.downSound.play();
                    this.head.rotation = 0;
                    let turnPointD = new Phaser.Geom.Point(this.head.x, this.head.y);
                    this.turnPoints.push(turnPointD);
                }
            }
        }

        move(time) {
            if(gameState.onGame==true){
                if(this.onGod===false){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x - 1, 3, game.config.width/CELL - 3);
                        break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x + 1, 3, game.config.width/CELL - 3);
                        break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y - 1, 6, game.config.height/CELL - 2);
                        break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y + 1, 6, game.config.height/CELL - 2);
                        break;
                    }
                }
                else if(this.onGod == true){
                    switch (this.heading) {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 3, game.config.width/CELL - 2);
                            break;
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 2, game.config.width/CELL - 3);
                            break;
                        case UP:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 6, game.config.height/CELL - 1);
                            break;
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 6, game.config.height/CELL - 2);
                            break;
                    }
                }

            this.direction = this.heading;
            Phaser.Actions.ShiftPosition(this.body.children.entries, this.headPosition.x*CELL, this.headPosition.y*CELL, 1, this.end);


            var hitBody = Phaser.Actions.GetFirst(this.bodySegments, { x: this.head.x, y: this.head.y }, 1);
            

            if (hitBody && this.onGod == false) {
                console.log('dead');

                this.alive = false;
                this.deadSound.play()
                return false;
            }
            
            else {
                this.moveTime = time + this.speed;
            
                this.alive = true;
                return true;
            }
        }
    }

    grow() {
        
        this.tail.setTexture(`body_${mainMenu.texturePack}`)
        this.tail.setDisplaySize(0,0)

        this.tail = this.scene.add.sprite(this.head.x, this.head.y, `tail_${mainMenu.texturePack}`)
        
        this.tail.rotation = this.bodySegments[this.bodySegments.length-1].rotation
        this.tail.alpha = 0
        this.body.add(this.tail)
        this.tail.setOrigin(0.5)
        this.tail.setDisplaySize(40,40)
        // this.head.setTexture(`head_${mainMenu.texturePack}`)
    };
    
    godMode(){
        this.onGod = true
        this.head.stop(`liking_${mainMenu.texturePack}`)
        this.head.play(`onGodeAnimation_${mainMenu.texturePack}`)
        setTimeout(()=>{
            this.onGod = false
            this.head.play(`liking_${mainMenu.texturePack}`)}, 15000);
    }
    speedUp(){
        this.speed -= 50;
        setTimeout(()=>{this.speed +=50}, 15000);
    }

    collideWithBonus(bonus){
        if(this.scene.bonus.body!=undefined && this.head.x === bonus.body.x && this.head.y === bonus.body.y){

            bonus.index !== 1 ? this.speedUp() : this.godMode();
            
            bonus.bonusSound.play();
            
            return true;
            
        }
        else{
            return false;
        }
    }

    collideWithFood(food) {
        if (this.head.x === food.body.x && this.head.y === food.body.y){
            this.grow();
            food.eat();
            this.biteSound.play();

            if (this.speed < 150 && food.total % 5 === 0) {
            this.speed += 5;
            }

            return true;
        }
        else {
            return false;
        }
    };

    updateGrid(grid) {
        for (const segment of this.body.getChildren()) {
            const y = segment.y / CELL;
            const x = segment.x / CELL;
            
            // grid[y] = {};
            grid[x][y] = false;
          }

        return grid;
    }
}