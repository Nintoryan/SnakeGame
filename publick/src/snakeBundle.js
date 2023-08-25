"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Entity = /*#__PURE__*/function (_Phaser$GameObjects$I) {
  _inherits(Entity, _Phaser$GameObjects$I);
  var _super = _createSuper(Entity);
  function Entity(scene, x, y, type) {
    var _this;
    _classCallCheck(this, Entity);
    _this = _super.call(this, scene, x, y);
    _this.scene = scene;
    _this.scene.add.existing(_assertThisInitialized(_this));
    _this.setData('type', type);
    _this.setData('isDead', false);
    return _this;
  }
  return _createClass(Entity);
}(Phaser.GameObjects.Image);
var Food = /*#__PURE__*/function (_Entity) {
  _inherits(Food, _Entity);
  var _super2 = _createSuper(Food);
  function Food(scene, x, y) {
    var _this2;
    _classCallCheck(this, Food);
    _this2 = _super2.call(this, scene, x, y);
    _this2.body = _this2.scene.physics.add.sprite(x * CELL, y * CELL, 'food').play('food-animation');
    _this2.body.setDisplaySize(32, 32);
    _this2.body.setSize(30, 30, true);
    _this2.body.setOrigin(0.5);
    _this2.total = 0;
    return _this2;
  }
  _createClass(Food, [{
    key: "eat",
    value: function eat() {
      this.total++;
    }
  }]);
  return Food;
}(Entity);
var Bonus = /*#__PURE__*/function (_Entity2) {
  _inherits(Bonus, _Entity2);
  var _super3 = _createSuper(Bonus);
  function Bonus(scene, x, y, texture, i) {
    var _this3;
    _classCallCheck(this, Bonus);
    _this3 = _super3.call(this, scene, x, y);
    _this3.onPlate = false;
    _this3.body = _this3.scene.physics.add.sprite(x * CELL, y * CELL, texture).play("bonus-animation_".concat(i));
    _this3.body.setDisplaySize(32, 32);
    _this3.body.setOrigin(0.5);
    _this3.index = i;
    _this3.bonusSound = _this3.scene.sound.add('bonus', {
      loop: false,
      volume: 0.5
    });
    _this3.scene.anims.create({
      key: 'bonus-animation_0',
      frames: [{
        key: "bonus_small_".concat(0),
        duration: 500
      }, {
        key: "bonus_".concat(0),
        duration: 500
      }, {
        key: "bonus_big_".concat(0),
        duration: 500
      }],
      frameRate: 6,
      repeat: -1
    });
    _this3.scene.anims.create({
      key: 'bonus-animation_1',
      frames: [{
        key: "bonus_small_".concat(1),
        duration: 500
      }, {
        key: "bonus_".concat(1),
        duration: 500
      }, {
        key: "bonus_big_".concat(1),
        duration: 500
      }],
      frameRate: 6,
      repeat: -1
    });
    return _this3;
  }
  return _createClass(Bonus);
}(Entity);
var Snake = /*#__PURE__*/function (_Entity3) {
  _inherits(Snake, _Entity3);
  var _super4 = _createSuper(Snake);
  function Snake(scene, x, y) {
    var _this4;
    _classCallCheck(this, Snake);
    _this4 = _super4.call(this, scene, x, y);
    _this4.headPosition = new Phaser.Geom.Point(x, y);
    _this4.body = scene.add.group();
    _this4.head = _this4.scene.physics.add.sprite(x * CELL, y * CELL, "head_".concat(mainMenu.texturePack)).play("liking_".concat(mainMenu.texturePack));
    _this4.body.add(_this4.head);
    _this4.head.setOrigin(0.5);
    _this4.head.setScale(0.4);
    _this4.head.setDepth(4);
    _this4.head.rotation = 4.7;
    _this4.alive = true;
    _this4.speed = 130;
    _this4.moveTime = 0;
    _this4.tail = _this4.scene.physics.add.sprite(_this4.head.x, _this4.head.y, "tail_".concat(mainMenu.texturePack));
    _this4.body.add(_this4.tail);
    _this4.tail.setOrigin(0.5);
    _this4.tail.setDisplaySize(32, 32);
    _this4.tail.setSize(32, 32, true);
    _this4.bodyGraphics = _this4.scene.add.graphics();
    _this4.end = new Phaser.Geom.Point(x, y);
    _this4.heading = RIGHT;
    _this4.direction = RIGHT;
    _this4.bodySegments = _this4.body.getChildren();
    _this4.onGod = false;
    _this4.biteSound = _this4.scene.sound.add('bite', {
      loop: false,
      volume: 0.5
    });
    _this4.leftSound = _this4.scene.sound.add('left', {
      loop: false,
      volume: 0.5
    });
    _this4.rightSound = _this4.scene.sound.add('right', {
      loop: false,
      volume: 0.5
    });
    _this4.upSound = _this4.scene.sound.add('up', {
      loop: false,
      volume: 0.5
    });
    _this4.downSound = _this4.scene.sound.add('down', {
      loop: false,
      volume: 0.5
    });
    _this4.deadSound = _this4.scene.sound.add('lose', {
      loop: false,
      volume: 0.5
    });
    _this4.turnPoints = [];
    var turnPointL = new Phaser.Geom.Point(_this4.head.x, _this4.head.y);
    turnPointL.name = 'turnPointL';
    var turnPointR = new Phaser.Geom.Point(_this4.head.x, _this4.head.y);
    turnPointR.name = 'turnPointR';
    var turnPointU = new Phaser.Geom.Point(_this4.head.x, _this4.head.y);
    turnPointU.name = 'turnPointU';
    var turnPointD = new Phaser.Geom.Point(_this4.head.x, _this4.head.y);
    turnPointD.name = 'turnPointD';
    //this.turnPoints.push(turnPointL, turnPointR, turnPointU, turnPointD);
    return _this4;
  }
  _createClass(Snake, [{
    key: "snakeRotation",
    value: function snakeRotation() {
      for (var r = 0; r < this.turnPoints.length; r++) {
        for (var i = 1; i < this.bodySegments.length; i++) {
          if (this.bodySegments[i].x == this.turnPoints[r].x && this.bodySegments[i].y == this.turnPoints[r].y) {
            this.bodySegments[i].rotation = this.bodySegments[i - 1].rotation;
          }
        }
      }
    }
  }, {
    key: "updateBodyGraphics",
    value: function updateBodyGraphics() {
      var bodyWidth = 28;
      var bodyRadius = 6;
      var points = [this.bodySegments[0]];
      var horizontal = true;
      for (var i = 1; i < this.bodySegments.length - 1; i++) {
        if (horizontal) {
          if (this.bodySegments[i].y != points[points.length - 1].y) {
            points.push(this.bodySegments[i - 1]);
            horizontal = false;
          }
        } else {
          if (this.bodySegments[i].x != points[points.length - 1].x) {
            points.push(this.bodySegments[i - 1]);
            horizontal = true;
          }
        }
        var x1 = this.bodySegments[i].x;
        var y1 = this.bodySegments[i].y;
        var x2 = this.bodySegments[i - 1].x;
        var y2 = this.bodySegments[i - 1].y;

        //Расстояние между текущим кусок тела и прошлым больше 1
        if (!(Math.abs(x1 - x2) == CELL ^ Math.abs(y1 - y2) == CELL)) {
          points.push(this.bodySegments[i - 1]);
          points.push(null);
          points.push(this.bodySegments[i]);
        }
      }
      points.push(this.bodySegments[this.bodySegments.length - 2]);
      points = this.removeDuplicatesKeepFirst(points);
      if (points.length >= 2) {
        this.bodyGraphics.clear();
      }
      switch (mainMenu.texturePack) {
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
      for (var _i = 1; _i < points.length; _i++) {
        var p1 = points[_i - 1];
        var p2 = points[_i];
        if (p1 == null || p2 == null) continue;
        if (p1.x == p2.x) {
          this.bodyGraphics.fillRoundedRect(Math.min(p1.x, p2.x) - bodyWidth / 2, Math.min(p1.y, p2.y) - bodyWidth / 2, bodyWidth, Math.abs(p1.y - p2.y) + bodyWidth, bodyRadius);
        } else if (p1.y == p2.y) {
          this.bodyGraphics.fillRoundedRect(Math.min(p1.x, p2.x) - bodyWidth / 2, Math.min(p1.y, p2.y) - bodyWidth / 2, Math.abs(p1.x - p2.x) + bodyWidth, bodyWidth, bodyRadius);
        }
      }
      this.bodyGraphics.fillPath();
    }
  }, {
    key: "removeDuplicatesKeepFirst",
    value: function removeDuplicatesKeepFirst(arr) {
      var uniqueValues = new Set();
      return arr.filter(function (value) {
        if (value === null || !uniqueValues.has(value)) {
          uniqueValues.add(value);
          return true;
        }
        return false;
      });
    }
  }, {
    key: "update",
    value: function update(time) {
      if (gameState.onGame == true) {
        this.updateBodyGraphics();
        this.snakeRotation();
        if (time >= this.moveTime) {
          return this.move(time);
        }
      }
    }
  }, {
    key: "faceLeft",
    value: function faceLeft() {
      if (gameState.onGame == true) {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = LEFT;
          this.leftSound.play();
          this.head.rotation = 1.57079;
          var turnPointL = new Phaser.Geom.Point(this.head.x, this.head.y);
          this.turnPoints.push(turnPointL);
        }
      }
    }
  }, {
    key: "faceRight",
    value: function faceRight() {
      if (gameState.onGame == true) {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = RIGHT;
          this.rightSound.play();
          this.head.rotation = 4.71238;
          var turnPointR = new Phaser.Geom.Point(this.head.x, this.head.y);
          this.turnPoints.push(turnPointR);
        }
      }
    }
  }, {
    key: "faceUp",
    value: function faceUp() {
      if (gameState.onGame == true) {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = UP;
          this.upSound.play();
          this.head.rotation = 3.14159;
          var turnPointU = new Phaser.Geom.Point(this.head.x, this.head.y);
          this.turnPoints.push(turnPointU);
        }
      }
    }
  }, {
    key: "faceDown",
    value: function faceDown() {
      if (gameState.onGame == true) {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = DOWN;
          this.downSound.play();
          this.head.rotation = 0;
          var turnPointD = new Phaser.Geom.Point(this.head.x, this.head.y);
          this.turnPoints.push(turnPointD);
        }
      }
    }
  }, {
    key: "move",
    value: function move(time) {
      if (gameState.onGame == true) {
        if (this.onGod === false) {
          switch (this.heading) {
            case LEFT:
              this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x - 1, 3, game.config.width / CELL - 3);
              break;
            case RIGHT:
              this.headPosition.x = Phaser.Math.Clamp(this.headPosition.x + 1, 3, game.config.width / CELL - 3);
              break;
            case UP:
              this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y - 1, 6, game.config.height / CELL - 2);
              break;
            case DOWN:
              this.headPosition.y = Phaser.Math.Clamp(this.headPosition.y + 1, 6, game.config.height / CELL - 2);
              break;
          }
        } else if (this.onGod == true) {
          switch (this.heading) {
            case LEFT:
              this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 3, game.config.width / CELL - 2);
              break;
            case RIGHT:
              this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 2, game.config.width / CELL - 3);
              break;
            case UP:
              this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 6, game.config.height / CELL - 1);
              break;
            case DOWN:
              this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 6, game.config.height / CELL - 2);
              break;
          }
        }
        this.direction = this.heading;
        Phaser.Actions.ShiftPosition(this.body.children.entries, this.headPosition.x * CELL, this.headPosition.y * CELL, 1, this.end);
        var hitBody = Phaser.Actions.GetFirst(this.bodySegments, {
          x: this.head.x,
          y: this.head.y
        }, 1);
        if (hitBody && this.onGod == false) {
          console.log('dead');
          this.alive = false;
          this.deadSound.play();
          return false;
        } else {
          this.moveTime = time + this.speed;
          this.alive = true;
          return true;
        }
      }
    }
  }, {
    key: "grow",
    value: function grow() {
      var _this5 = this;
      this.bodySegments[1].setSize(30, 30, true);
      this.tail.setTexture("body_".concat(mainMenu.texturePack));
      this.tail.setDisplaySize(30, 30);
      this.tail.alpha = 0;
      this.tail = this.scene.add.sprite(this.head.x, this.head.y, "tail_".concat(mainMenu.texturePack));
      this.tail.rotation = this.bodySegments[this.bodySegments.length - 1].rotation;
      this.tail.alpha = 0;
      this.body.add(this.tail);
      this.tail.setOrigin(0.5);
      this.tail.setDisplaySize(40, 40);
      this.bodySegments.forEach(function (element) {
        element.setDisplaySize(30, 30);
        element.setSize(30, 30, true);
        element.alpha = 0;
        _this5.head.alpha = 1;
        _this5.head.setScale(0.4);
      });
      // this.head.setTexture(`head_${mainMenu.texturePack}`)
    }
  }, {
    key: "godMode",
    value: function godMode() {
      var _this6 = this;
      this.onGod = true;
      this.head.stop("liking_".concat(mainMenu.texturePack));
      this.head.play("onGodeAnimation_".concat(mainMenu.texturePack));
      setTimeout(function () {
        _this6.onGod = false;
        _this6.head.play("liking_".concat(mainMenu.texturePack));
      }, 15000);
    }
  }, {
    key: "speedUp",
    value: function speedUp() {
      var _this7 = this;
      this.speed -= 50;
      setTimeout(function () {
        _this7.speed += 50;
      }, 15000);
    }
  }, {
    key: "collideWithBonus",
    value: function collideWithBonus(bonus) {
      if (this.scene.bonus.body != undefined && this.head.x === bonus.body.x && this.head.y === bonus.body.y) {
        bonus.index !== 1 ? this.speedUp() : this.godMode();
        bonus.bonusSound.play();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "collideWithFood",
    value: function collideWithFood(food) {
      if (this.head.x === food.body.x && this.head.y === food.body.y) {
        this.grow();
        food.eat();
        this.biteSound.play();
        if (this.speed < 150 && food.total % 5 === 0) {
          this.speed += 5;
        }
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "updateGrid",
    value: function updateGrid(grid) {
      var _iterator = _createForOfIteratorHelper(this.body.getChildren()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var segment = _step.value;
          var y = segment.y / CELL;
          var x = segment.x / CELL;

          // grid[y] = {};
          grid[x][y] = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return grid;
    }
  }]);
  return Snake;
}(Entity);
var SnakeGame = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(SnakeGame, _Phaser$Scene);
  var _super5 = _createSuper(SnakeGame);
  function SnakeGame() {
    _classCallCheck(this, SnakeGame);
    return _super5.call(this, {
      key: 'snakegame'
    });
  }
  _createClass(SnakeGame, [{
    key: "create",
    value: function create() {
      var _this8 = this;
      game_session.action.startGame = new Date().getTime();
      console.log(game_session.action.startGame);
      gameState.onGame = true;
      this.texturePack = mainMenu.texturePack;
      this.backGround = this.add.image(game.config.width / 2, game.config.height / 2, "background_".concat(this.texturePack)).setOrigin(0.5);
      this.backGround.setDisplaySize(game.config.width, game.config.height + 16);
      this.bgmusic = this.sound.add('background-music', {
        loop: false,
        volume: 0.5
      });
      this.marker = 0;
      this.bgmusic.play();
      this.scoreText = this.add.text(game.config.width / 2 - 100, 55, "".concat(gameState.score), {
        fontFamily: 'Nunito',
        fontStyle: 'bold',
        fontSize: '40px',
        fill: 'white',
        textAlign: 'start'
      }).setOrigin(0.5);
      this.scoreIcon = this.add.image(this.scoreText.x - 90, this.scoreText.y, 'scoreIcon').setOrigin(0.5).setDisplaySize(60, 66);
      this.gameInfo = this.add.image(265, 60, 'info').setScale(0.43).setOrigin(0.5);
      this.food = food = new Food(snacegame, 30, 20, 'food');
      this.snake = snake = new Snake(snacegame, 20, 20, 'body_0');
      this.snake.grow();
      this.snake.grow();
      document.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196) {
          _this8.pause();
        }
      });
      this.loadScore();
      console.log(this.snake);
      this.snake.bodySegments[1].setSize(30, 30, true);
      this.snake.bodySegments[1].depth = this.food.body.depth;
      this.physics.add.collider(this.snake.bodySegments[1], this.food.body, function () {
        _this8.snake.grow();
        _this8.repositionFood();
        _this8.snake.biteSound.play();
        gameState.score += 1;
      }, null, this);
      this.stopSound = setInterval(function () {
        _this8.soundOff();
        _this8.marker >= 5 ? clearInterval(_this8.stopSound) && _this8.bgmusic.stop() : null;
      }, 1000);
      this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, "".concat(game_version), {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '30px',
        fill: '#fff'
      }).setOrigin(0.5);
      this.getField();
    }
  }, {
    key: "soundOff",
    value: function soundOff() {
      if (this.bgmusic.volume > 0) {
        this.bgmusic.volume -= 0.1;
        this.marker++;
      }
    }
  }, {
    key: "loadScore",
    value: function loadScore() {
      if (localStorage.getItem('heighScore_snake')) {
        console.log(localStorage.getItem('heighScore_snake'));
        this.hieghScoreText = this.add.text(this.scoreText.x + 260, this.scoreText.y, "".concat(JSON.parse(localStorage.getItem('heighScore_snake'))), {
          fontFamily: 'Nunito',
          fontStyle: 'bold',
          fontSize: '40px',
          fill: 'white',
          textAlign: 'start'
        }).setOrigin(0.5);
        this.hieghScoreIcon = this.add.image(this.hieghScoreText.x - 90, this.hieghScoreText.y, 'bestIcon').setDisplaySize(72, 66).setOrigin(0.5);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      gameState.onGame = false;
      this.scene.pause(snacegame);
      this.scene.launch(scenePause);
    }
  }, {
    key: "addBonus",
    value: function addBonus(x, y, i) {
      var _this9 = this;
      if (gameState.score > 0 && gameState.score % 10 === 0) {
        this.bonus = new Bonus(this, x, y, "bonus_".concat(i), i);
        console.log(i);
        console.log(this.bonus);
        this.physics.add.collider(this.snake.bodySegments[1], this.bonus.body, function () {
          _this9.bonus.bonusSound.play();
          if (_this9.bonus.index == 0) {
            _this9.snake.speedUp();
          }
          ;
          if (_this9.bonus.index == 1) {
            _this9.snake.godMode();
          }
          ;
          _this9.bonus.destroy();
        }, null, this);
        setTimeout(function () {
          _this9.bonus.destroy();
        }, 12000);
      }
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.marker >= 5 ? clearInterval(this.stopSound) && this.bgmusic.stop() : null;
      this.scoreText.setText("".concat(gameState.score));
      game_session.score = gameState.score;
      if (snake.update(time)) {
        if (this.bonus != undefined && snake.collideWithBonus(this.bonus)) {
          this.bonus.destroy();
        }

        // else if (snake.collideWithFood(food)){
        //     this.repositionFood();
        //     gameState.score+=1;
        // }
      }

      if (!snake.alive) {
        this.snake.destroy();
        this.scene.start('gameOver');
      }
    }
  }, {
    key: "repositionFood",
    value: function repositionFood() {
      var ocupate = [];
      var _iterator2 = _createForOfIteratorHelper(this.snake.bodySegments),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var segment = _step2.value;
          ocupate.push({
            x: segment.x,
            y: segment.y
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      console.log(ocupate);
      if (validLocationsX.length > 0) {
        var pos = {
          x: this.getPositionX(),
          y: this.getPositionY()
        };
        var newpos = {
          x: this.getPositionX(),
          y: this.getPositionY()
        };
        var _iterator3 = _createForOfIteratorHelper(ocupate),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var point = _step3.value;
            if (pos.x == Math.floor(point.x / CELL) && pos.y == Math.floor(point.y / CELL)) {
              pos = {
                x: this.getPositionX(),
                y: this.getPositionY()
              };
              console.log(pos.x, pos.y);
            } else if (newpos.x == Math.floor(point.x / CELL) && newpos.y == Math.floor(point.y / CELL)) {
              newpos = {
                x: this.getPositionX(),
                y: this.getPositionY()
              };
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        food.body.setPosition(pos.x * CELL, pos.y * CELL);
        this.addBonus(newpos.x, newpos.y, Math.floor(Math.random() * 2));
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "getPositionX",
    value: function getPositionX() {
      var x = Phaser.Math.RND.pick(validLocationsX);
      return x;
    }
  }, {
    key: "getPositionY",
    value: function getPositionY() {
      var y = Phaser.Math.RND.pick(validLocationsY);
      return y;
    }
  }, {
    key: "getField",
    value: function getField() {
      for (var y = 6; y < game.config.height / CELL - 2; y++) {
        validLocationsY.push(Math.floor(y));
      }
      for (var x = 3; x < game.config.width / CELL - 3; x++) {
        validLocationsX.push(Math.floor(x));
      }
    }
  }]);
  return SnakeGame;
}(Phaser.Scene);
var validLocationsY = [];
var validLocationsX = [];
var snacegame = new SnakeGame();
var GameOver = /*#__PURE__*/function (_Phaser$Scene2) {
  _inherits(GameOver, _Phaser$Scene2);
  var _super6 = _createSuper(GameOver);
  function GameOver() {
    _classCallCheck(this, GameOver);
    return _super6.call(this, {
      key: 'gameOver'
    });
  }
  _createClass(GameOver, [{
    key: "create",
    value: function create() {
      var _this10 = this;
      game_session.action.gameOver = new Date().getTime();
      console.log(game_session.action.gameOver);
      snacegame.bgmusic.stop();
      gameState.onGame = false;
      gameState.isOver = true;
      this.menuBG = this.add.image(game.config.width / 2, game.config.height / 2, "mainBG_".concat(mainMenu.texturePack)).setOrigin(0.5);
      this.menuBG.setDisplaySize(game.config.width, game.config.height);
      this.gameOverImg = this.add.image(game.config.width / 2, game.config.height / 2, 'menuGameOver').setOrigin(0.5);
      this.gameOverImg.setDisplaySize(game.config.width, game.config.height);
      this.scoreText = this.add.text(game.config.width / 2, game.config.height - 150, "\u0421\u0427\u0401\u0422: ".concat(gameState.score), {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '32px',
        fill: '#2E3D66'
      }).setOrigin(0.5);
      this.scoreText.setOrigin(0.5);
      this.btnRestart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button');
      this.btnRestart.setOrigin(0.5);
      this.btnRestart.setScale(0.5);
      this.btnClose = this.add.sprite(this.btnRestart.x, this.btnRestart.y + 120, 'button').setScale(0.5);
      this.btnClose.setOrigin(0.5);
      this.selector = this.add.sprite(this.btnRestart.x, this.btnRestart.y, 'selector');
      this.selector.setOrigin(0.5);
      this.selector.setScale(0.44);
      this.btnRestart.setInteractive();
      this.btnClose.setInteractive();
      this.btnRestartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "ЗАНОВО", {
        fontFamily: 'Nunito',
        fontSize: '60px',
        fontStyle: 'bold',
        align: 'center',
        color: 'black'
      });
      this.btnRestartText.setOrigin(0.5);
      this.btnCloseText = this.add.text(this.btnClose.x, this.btnClose.y, "ВЫЙТИ", {
        fontFamily: 'Nunito',
        fontSize: '60px',
        fontStyle: 'bold',
        align: 'center',
        color: 'black'
      });
      this.btnCloseText.setOrigin(0.5);
      this.btnRestart.on('pointerdown', this.startGame, this);
      this.btnClose.on('pointerdown', this.exit, this);
      this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);
      document.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196) {
          _this10.onPressExit();
        }
      });

      // this.input.keyboard.on('keydown-BACKSPACE', ()=>{this.exit()}, this)

      this.saveScore();
      this.loadScore();
      game_session.score = gameState.score;
      this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, "".concat(game_version), {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '30px',
        fill: '#fff'
      }).setOrigin(0.5);
    }
  }, {
    key: "selectorDown",
    value: function selectorDown() {
      if (gameState.isOver == true) {
        if (this.selector.y != this.btnClose.y) {
          this.selector.y = this.btnClose.y;
          this.btnCloseText.setColor('white');
          this.clickSound.play();
        }
      }
    }
  }, {
    key: "selectorUp",
    value: function selectorUp() {
      if (gameState.isOver == true) {
        if (this.selector.y != this.btnRestart.y) {
          this.selector.y = this.btnRestart.y;
          mainMenu.clickSound.play();
        }
      }
    }
  }, {
    key: "gameToggle",
    value: function gameToggle() {
      if (gameState.isOver == true) {
        if (this.selector.y == this.btnRestart.y) {
          mainMenu.clickSound.play();
          this.startGame();
        } else if (this.selector.y == this.btnClose.y) {
          mainMenu.clickSound.play();
          this.exit();
        }
      }
    }
  }, {
    key: "startGame",
    value: function startGame() {
      gameState.isOver = false;
      gameState.score = 0;
      mainMenu.texturePack = getTexturePack();
      this.scene.start('snakegame');
    }
  }, {
    key: "exit",
    value: function exit() {
      var _window;
      game_session.onClose = true;
      (_window = window) === null || _window === void 0 || _window.parent.postMessage('GameExit', '*');
      game_session.action.closeGameSession = new Date().getTime();
      // this.sys.game.destroy(true);
    }
  }, {
    key: "onPressExit",
    value: function onPressExit() {
      if (gameState.onGame == false) {
        this.exit();
      }
    }
  }, {
    key: "saveScore",
    value: function saveScore() {
      this.heighScore = gameState.score;
      game_session.highscore = JSON.parse(localStorage.getItem('heighScore_snake'));
      this.oldScore = JSON.parse(localStorage.getItem('heighScore_snake'));
      this.heighScore > this.oldScore ? localStorage.setItem('heighScore_snake', JSON.stringify(this.heighScore)) : this.heighScore = this.oldScore;
    }
  }, {
    key: "loadScore",
    value: function loadScore() {
      if (localStorage.getItem('heighScore_snake')) {
        console.log(localStorage.getItem('heighScore_snake'));
        this.hieghScoreText = this.add.text(game.config.width / 2, game.config.height - 100, "\u0420\u0415\u041A\u041E\u0420\u0414: ".concat(JSON.parse(localStorage.getItem('heighScore_snake'))), {
          fontFamily: 'Nunito-black',
          fontStyle: 'bold',
          fontSize: '40px',
          fill: '#2E3D66'
        }).setOrigin(0.5);
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white') : this.btnCloseText.setColor('#F0516B');
      this.selector.y === this.btnRestart.y ? this.btnRestartText.setColor('white') : this.btnRestartText.setColor('#F0516B');
    }
  }]);
  return GameOver;
}(Phaser.Scene);
var gameOver = new GameOver();
var MainMenu = /*#__PURE__*/function (_Phaser$Scene3) {
  _inherits(MainMenu, _Phaser$Scene3);
  var _super7 = _createSuper(MainMenu);
  function MainMenu() {
    _classCallCheck(this, MainMenu);
    return _super7.call(this, {
      key: 'mainMenu'
    });
  }
  _createClass(MainMenu, [{
    key: "create",
    value: function create() {
      var _this11 = this;
      game_session.action.startGameSession = new Date().getTime();
      console.log(game_session.action.startGameSession);
      this.texturePack = getTexturePack();
      gameState.onMenu = true;
      this.menuBG = this.add.image(game.config.width / 2, game.config.height / 2, "mainBG_".concat(this.texturePack)).setOrigin(0.5);
      this.menuBG.setDisplaySize(game.config.width, game.config.height);
      this.mainbg = this.add.image(game.config.width / 2, game.config.height / 2, 'menuStart').setOrigin(0.5);
      this.mainbg.setDisplaySize(game.config.width, game.config.height);
      this.controlsInfo = this.add.image(game.config.width - 310, 70, 'controlsInfo').setOrigin(0.5);
      this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button').setScale(0.5);
      this.btnStart.setOrigin(0.5);
      this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 120, 'button').setScale(0.5);
      this.btnClose.setOrigin(0.5);
      this.selector = this.add.image(this.btnStart.x, this.btnStart.y, "selector").setScale(0.44);
      this.selector.setOrigin(0.5);
      this.btnStartText = this.add.text(this.btnStart.x, this.btnStart.y, 'НАЧАТЬ ИГРУ', {
        fontFamily: 'Nunito',
        fontSize: '60px',
        color: 'black',
        fontStyle: 'bold',
        align: 'center'
      });
      this.btnStartText.setOrigin(0.5);
      this.btnCloseText = this.add.text(this.btnClose.x, this.btnClose.y, 'ВЫЙТИ', {
        fontFamily: 'Nunito',
        fontSize: '60px',
        color: 'black',
        fontStyle: 'bold',
        align: 'center'
      });
      this.btnCloseText.setOrigin(0.5);

      // this.btnStart.setInteractive()
      // this.btnClose.setInteractive()
      // this.btnClose.on('pointerdown', this.exit, this)
      // this.btnStart.on('pointerdown', this.startGame, this)

      this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);

      // this.input.keyboard.on('keydown-BACKSPACE', ()=>{gameOver.exit();}, this)

      document.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196) {
          _this11.onPressExit();
        }
      });
      this.clickSound = this.sound.add('click', {
        loop: false
      });
      this.loadScore();
      this.anims.create({
        key: 'food-animation',
        frames: [{
          key: 'food_small',
          duration: 500
        }, {
          key: 'food',
          duration: 500
        }, {
          key: 'food_big',
          duration: 500
        }],
        frameRate: 6,
        repeat: -1
      });
      this.bonus = new Bonus(this, -1, -1, "bonus_".concat(1), 1);
      this.bonus.alpha = 0;
      this.anims.create({
        key: 'liking_0',
        frames: [{
          key: "head_0"
        }, {
          key: "head_lick_0",
          duration: 1000
        }],
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'liking_1',
        frames: [{
          key: "head_1"
        }, {
          key: "head_lick_1",
          duration: 1000
        }],
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'liking_2',
        frames: [{
          key: "head_2"
        }, {
          key: "head_lick_2",
          duration: 1000
        }],
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'onGodeAnimation_0',
        frames: [{
          key: "head_helmet_0"
        }, {
          key: "head_helmet_nolick_0",
          duration: 1000
        }],
        frameRate: 4,
        repeat: -1
      });
      this.anims.create({
        key: 'onGodeAnimation_1',
        frames: [{
          key: "head_helmet_1"
        }, {
          key: "head_helmet_nolick_1",
          duration: 1000
        }],
        frameRate: 4,
        repeat: -1
      });
      this.anims.create({
        key: 'onGodeAnimation_2',
        frames: [{
          key: "head_helmet_2"
        }, {
          key: "head_helmet_nolick_2",
          duration: 1000
        }],
        frameRate: 4,
        repeat: -1
      });
      this.versionText = this.add.text(game.config.width - 60, game.config.height - 40, "".concat(game_version), {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '30px',
        fill: '#fff'
      }).setOrigin(0.5);
    }
  }, {
    key: "checkPosX",
    value: function checkPosX(e, posX) {
      console.log("\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B \u043A\u043B\u0438\u043A\u0430:".concat(e.offsetX, ", ").concat(e.offsetY));
      var set = false;
      posX.forEach(function (pos) {
        if (pos === e.offsetX) {
          set = true;
        }
      });
      return set;
    }
  }, {
    key: "checkPosY",
    value: function checkPosY(e, posY) {
      var set = false;
      posY.forEach(function (pos) {
        if (Math.floor(pos) === e.offsetY) {
          set = true;
        }
      });
      return set;
    }
  }, {
    key: "loadScore",
    value: function loadScore() {
      if (localStorage.getItem('heighScore_snake')) {
        game_session.highscore = JSON.parse(localStorage.getItem('heighScore_snake'));
        this.hieghScoreText = this.add.text(game.config.width / 2, game.config.height - 100, "\u0420\u0415\u041A\u041E\u0420\u0414  ".concat(JSON.parse(localStorage.getItem('heighScore_snake'))), {
          fontFamily: 'Nunito-black',
          fontStyle: 'bold',
          fontSize: '65px',
          fill: '#2E3D66'
        }).setOrigin(0.5);
      } else {
        this.hieghScoreText = this.add.text(game.config.width / 2, game.config.height - 100, "\u0420\u0415\u041A\u041E\u0420\u0414 0", {
          fontFamily: 'Nunito',
          fontStyle: 'bold',
          fontSize: '65px',
          fill: '#2E3D66'
        }).setOrigin(0.5);
      }
    }
  }, {
    key: "selectorDown",
    value: function selectorDown() {
      if (gameState.onMenu == true) {
        if (this.selector.y != this.btnClose.y) {
          this.selector.y = this.btnClose.y;
          this.btnCloseText.setColor('white');
          this.clickSound.play();
        }
      }
    }
  }, {
    key: "selectorUp",
    value: function selectorUp() {
      if (gameState.onMenu == true) {
        if (this.selector.y != this.btnStart.y) {
          this.selector.y = this.btnStart.y;
          this.clickSound.play();
        }
      }
    }
  }, {
    key: "gameToggle",
    value: function gameToggle() {
      if (gameState.onMenu == true) {
        if (this.selector.y == this.btnStart.y) {
          this.startGame();
          this.clickSound.play();
        } else if (this.selector.y == this.btnClose.y) {
          var _window2;
          this.clickSound.play();
          (_window2 = window) === null || _window2 === void 0 || _window2.parent.postMessage('GameExit', '*');
          this.exit();
        }
      }
    }
  }, {
    key: "startGame",
    value: function startGame() {
      gameState.onMenu = false;
      this.scene.start('snakegame');
    }
  }, {
    key: "exit",
    value: function exit() {
      game_session.action.closeGameSession = new Date().getTime();
      // this.sys.game.destroy(true);
    }
  }, {
    key: "onPressExit",
    value: function onPressExit() {
      if (gameState.onGame == false) {
        gameOver.exit();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white') : this.btnCloseText.setColor('#F0516B');
      this.selector.y === this.btnStart.y ? this.btnStartText.setColor('white') : this.btnStartText.setColor('#F0516B');
    }
  }]);
  return MainMenu;
}(Phaser.Scene);
var mainMenu = new MainMenu();
var game;
var snake;
var food;
var bonus;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var CELL = 32;
var game_version = 'v 0.1.7';
var game_session = {
  ts: 0,
  game_id: '',
  action: {
    startGameSession: 0,
    startGame: 0,
    levelUp: 0,
    gameOver: 0,
    closeGameSession: 0
  },
  score: null,
  highscore: null,
  level: null,
  onClose: false
};
function getTexturePack() {
  return Math.floor(Math.random() * 3);
}
var gameState = {
  onMenu: false,
  onPause: false,
  isOver: false,
  onGame: false,
  score: 0
};
window.onload = function () {
  var config = {
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    backgroundColor: '#000',
    parent: "phaser-example",
    scene: [preloader, mainMenu, snacegame, scenePause, gameOver],
    physics: {
      "default": 'arcade'
    },
    scale: {
      mode: Phaser.Scale.FIT
    },
    audio: {
      noAudio: true
    }
  };
  var canvas = document.getElementsByTagName('canvas');
  canvas.outline = 0;
  game = new Phaser.Game(config);
};
var ScenePause = /*#__PURE__*/function (_Phaser$Scene4) {
  _inherits(ScenePause, _Phaser$Scene4);
  var _super8 = _createSuper(ScenePause);
  function ScenePause() {
    _classCallCheck(this, ScenePause);
    return _super8.call(this, {
      key: 'scenePause'
    });
  }
  _createClass(ScenePause, [{
    key: "create",
    value: function create() {
      var _this12 = this;
      gameState.onPause = true;
      this.bgpauseImage = this.add.image(game.config.width / 2, game.config.height / 2, "mainBG_".concat(mainMenu.texturePack)).setOrigin(0.5);
      this.bgpauseImage.setDisplaySize(game.config.width, game.config.height);
      this.pauseScreen = this.add.image(game.config.width / 2, game.config.height / 2, 'pause').setOrigin(0.5).setDisplaySize(game.config.width, game.config.height);
      this.btnStart = this.add.sprite(game.config.width / 2, game.config.height / 2 + 100, 'button').setScale(0.5);
      this.btnStart.setOrigin(0.5);
      this.btnClose = this.add.sprite(this.btnStart.x, this.btnStart.y + 120, 'button').setScale(0.5);
      this.btnClose.setOrigin(0.5);
      this.selector = this.add.image(game.config.width / 2, game.config.height / 2 + 100, "selector");
      this.selector.setScale(0.44);
      this.selector.setOrigin(0.5);
      this.btnStartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'ПРОДОЛЖИТЬ', {
        fontFamily: 'Nunito',
        fontSize: '60px',
        color: 'black',
        fontStyle: 'bold',
        align: 'center'
      });
      this.btnStartText.setOrigin(0.5);
      this.btnCloseText = this.add.text(this.btnClose.x, this.btnClose.y, 'ВЫЙТИ', {
        fontFamily: 'Nunito',
        fontSize: '60px',
        color: 'black',
        fontStyle: 'bold',
        align: 'center'
      });
      this.btnCloseText.setOrigin(0.5);
      this.btnStart.setInteractive();
      this.btnClose.setInteractive();
      this.btnClose.on('pointerdown', this.exit, this);
      this.btnStart.on('pointerdown', this.resumeGame, this);
      document.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 || e.keyCode == 10009 || e.keyCode == 461 || e.keyCode == 166 || e.keyCode == 196) {
          _this12.onPressExit();
        }
      });
      this.input.keyboard.on('keydown-ENTER', this.gameToggle, this);
      this.scoreText = this.add.text(game.config.width / 2, game.config.height - 150, "\u0421\u0427\u0401\u0422: ".concat(gameState.score), {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '32px',
        fill: '#2E3D66'
      }).setOrigin(0.5);
      this.loadScore();
    }
  }, {
    key: "loadScore",
    value: function loadScore() {
      if (localStorage.getItem('heighScore_snake')) {
        console.log(localStorage.getItem('heighScore_snake'));
        this.hieghScoreText = this.add.text(game.config.width / 2, game.config.height - 100, "\u0420\u0415\u041A\u041E\u0420\u0414: ".concat(JSON.parse(localStorage.getItem('heighScore_snake'))), {
          fontFamily: 'Nunito-black',
          fontStyle: 'bold',
          fontSize: '40px',
          fill: '#2E3D66'
        }).setOrigin(0.5);
      }
    }
  }, {
    key: "selectorDown",
    value: function selectorDown() {
      if (gameState.onPause == true) {
        if (this.selector.y != this.btnClose.y) {
          this.selector.y = this.btnClose.y;
          mainMenu.clickSound.play();
        }
      }
    }
  }, {
    key: "selectorUp",
    value: function selectorUp() {
      if (gameState.onPause == true) {
        if (this.selector.y != this.btnStart.y) {
          this.selector.y = this.btnStart.y;
          mainMenu.clickSound.play();
        }
      }
    }
  }, {
    key: "gameToggle",
    value: function gameToggle() {
      if (gameState.onPause == true) {
        if (this.selector.y == this.btnStart.y) {
          this.resumeGame();
          mainMenu.clickSound.play();
        } else if (this.selector.y == this.btnClose.y) {
          var _window3;
          mainMenu.clickSound.play();
          (_window3 = window) === null || _window3 === void 0 || _window3.parent.postMessage('GameExit', '*');
          gameOver.exit();
        }
      }
    }
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      gameState.onPause = false;
      gameState.onGame = true;
      this.scene.resume(snacegame);
      this.scene.stop(scenePause);
    }
  }, {
    key: "exit",
    value: function exit() {
      game_session.action.closeGameSession = new Date().getTime();

      // this.sys.game.destroy(true);
      // window.close();
    }
  }, {
    key: "onPressExit",
    value: function onPressExit() {
      if (gameState.onPause == true) {
        gameOver.exit();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.selector.y === this.btnClose.y ? this.btnCloseText.setColor('white') : this.btnCloseText.setColor('#F0516B');
      this.selector.y === this.btnStart.y ? this.btnStartText.setColor('white') : this.btnStartText.setColor('#F0516B');
    }
  }]);
  return ScenePause;
}(Phaser.Scene);
var scenePause = new ScenePause();
var Preloader = /*#__PURE__*/function (_Phaser$Scene5) {
  _inherits(Preloader, _Phaser$Scene5);
  var _super9 = _createSuper(Preloader);
  function Preloader() {
    var _this13;
    _classCallCheck(this, Preloader);
    _this13 = _super9.call(this, {
      key: 'preloader'
    });
    _this13.loadText;
    return _this13;
  }
  _createClass(Preloader, [{
    key: "preload",
    value: function preload() {
      this.loadText = this.add.text(game.config.width / 2, game.config.height / 2, 'ЗАГРУЗКА...', {
        fontFamily: 'Nunito-black',
        fontStyle: 'bold',
        fontSize: '40px',
        fill: 'white'
      });
      this.loadText2 = this.add.text(game.config.width / 2, game.config.height / 2, 'ЗАГРУЗКА...', {
        fontFamily: 'Nunito',
        fontStyle: 'bold',
        fontSize: '40px',
        fill: 'white'
      });
      this.loadText2.visible = false;
      this.loadText.setOrigin(0.5);
      // this.loadText.setStroke('#203c5b', 6);
      // this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

      this.load.setPath('assets/');
      this.load.image('info', 'gameInfo.png');
      this.load.image('controlsInfo', 'controlsInfo.png');
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
      this.load.image('scoreIcon', 'ui/scoreIcon.png');
      this.load.image('bestIcon', 'ui/bestIcon.png');
      this.load.image('menuStart', 'ui/menuStart.png');
      this.load.image('menuGameOver', 'ui/menuGameOver.png');
      this.load.image('mainBG_0', 'ui/uibg_0.png');
      this.load.image('mainBG_1', 'ui/uibg_1.png');
      this.load.image('mainBG_2', 'ui/uibg_2.png');
      this.load.image('pause', 'ui/pause.png');
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
  }, {
    key: "create",
    value: function create() {
      this.scene.start(mainMenu);
    }
  }]);
  return Preloader;
}(Phaser.Scene);
var preloader = new Preloader();