(function(global) {
  'use strict';

  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var KEY_SPACE = 32;
  var c = document.getElementById('canvas');
  var csv = c.getContext('2d');
  var screenHeight = document.body.offsetHeight;
  var screenWidth = document.body.offsetWidth;
  var fpsInterval;
  var now;
  var then;
  var elapsed;
  var projectiles = [];
  var playerHealth;
  var dragonurl;
  var bodies = [];
  var action;
  var actionTimesTen;
  dragonurl = new Image();
  dragonurl.src = '/images/dragon.png';
  var counter = 0;

  action = Math.random();
  actionTimesTen = (action * 10);

  // keeps track of which keys are pressed
  var keyState = [];

  window.bodies = [];

  // set the canvas to the full page size
  c.width = screenWidth;
  c.height = screenHeight;

  window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
  }, true);

  window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
  }, true);

  /**
   * [notColliding description]
   *
   * @param  {Object} body1 [description]
   * @param  {Object} body2 [description]
   */

  /**
   * [drawHitBox description]
   *
   * @param  {String} color [description]
   */

  /**
   * [Player description]
   *
   * @param {Number} totalHealth   [description]
   * @param {Number} currentHealth [description]
   */
  function Player(totalHealth, currentHealth) {
    this.health = {
      total: totalHealth,
      current: currentHealth,
      percent: (currentHealth / totalHealth) * 100
    };

    this.animation = {
      x: 0,
      y: 0
    };

    this.direction = {
      facing: '',
      north: 0,
      south: 0,
      east: 0,
      west: 0,
      northEast: 0,
      northWest :0,
      southEast: 0,
      southWest: 0,
    };

    this.frame = {
      current: 0,
      total: 9,
      width: (500 / 9), // 55.555555555...6
      height: (519 / 8) // 57.6666666...7
    };

    this.pos = {
      x: screenWidth / 2 - ((500 / 9) / 2),
      y: screenHeight / 2 - ((519 / 8) / 2)
    };

    this.speed = 1;
    this.avatar = null;
  }

  function move (anyPlayerOrEnemy, elapsed) {
    switch(anyPlayerOrEnemy.direction.facing) {

    case anyPlayerOrEnemy.direction.northWest: {
      anyPlayerOrEnemy.pos.x -= anyPlayerOrEnemy.speed * elapsed;
      anyPlayerOrEnemy.pos.y -= anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.northEast: {
      anyPlayerOrEnemy.pos.x += anyPlayerOrEnemy.speed * elapsed;
      anyPlayerOrEnemy.pos.y -= anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.southWest: {
      anyPlayerOrEnemy.pos.x -= anyPlayerOrEnemy.speed * elapsed;
      anyPlayerOrEnemy.pos.y += anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.southEast: {
      anyPlayerOrEnemy.pos.x += anyPlayerOrEnemy.speed * elapsed;
      anyPlayerOrEnemy.pos.y += anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.north: {
      anyPlayerOrEnemy.pos.y -= anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.south: {
      anyPlayerOrEnemy.pos.y += anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case  anyPlayerOrEnemy.direction.west: {
      anyPlayerOrEnemy.pos.x -= anyPlayerOrEnemy.speed * elapsed;
    }
    break;

    case anyPlayerOrEnemy.direction.east: {
      anyPlayerOrEnemy.pos.x += anyPlayerOrEnemy.speed * elapsed;
    }
    break;

  }
  }
  
  Player.prototype.update = function(anyPlayerOrEnemyelapsed) {
    if (keyState[KEY_UP] && keyState[KEY_LEFT]) {
      this.pos.x -= this.speed * elapsed;
      this.pos.y -= this.speed * elapsed;
      console.log(this.direction.facing);
      this.direction.facing = this.direction.northWest;
      console.log(this.direction.facing);
      this.animation.y = this.direction.facing;
      console.log(this.animation.y);
      console.log(this);
      console.log(this);
      bodies[0] = this;
    } else if (keyState[KEY_UP] && keyState[KEY_RIGHT]) {
      this.direction.facing = this.direction.northEast;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_DOWN] && keyState[KEY_LEFT]) {
      this.direction.facing = this.direction.southWest;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_DOWN] && keyState[KEY_RIGHT]) {
      this.direction.facing = this.direction.southEast;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_UP]) {
      this.direction.facing = this.direction.north;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_DOWN]) {
      this.direction.facing = this.direction.south;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_LEFT]) {
      this.direction.facing = this.direction.west;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_RIGHT]) {
      this.direction.facing = this.direction.east;
      this.animation.y = this.direction.facing;
      move(this, elapsed);
      bodies[0] = this;
    } else if (keyState[KEY_SPACE]) {
      // pushes a new Projectile() object onto the projectiles array
      $PROJECTILE.createNew(this, projectiles, 'black');
    } else {
      // console.log('No keys being pressed right now');
    }
  };

  Player.prototype.isColliding = function(projectiles) {
    for (var i = 0; i < projectiles.length; i++) {
      if ($GAME.collisionDetection(this, projectiles[i]) === false) {
        player.health.percent -= 1;
        console.log("x: " + this.pos.x + ", y: " + this.pos.y + ", width: " + this.frame.width + ", height: " + this.frame.height);
        console.log("projectile x: " + projectiles[i].pos.x + ", y: " + projectiles[i].pos.y + ", width: " + projectiles[i].width + ", height: " + projectiles[i].height);
        drawHitBox(csv, bodies, 'red');
      }
    }
  };

  function Projectile(anyPlayerOrEnemy, color) {
    this.pos = {
      x: anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width + 10,
      y: anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.height / 2,
    };
    this.width = 10;
    this.height = 10;
    this.velocity = {
      x: 20,
      y: 0,
    };
    this.onHit = {
      passThrough: false,
      disappear: false,
      explode: false,
    }
    this.color = color || 'black';
  };

  function Enemy(totalHealth, currentHealth) {
    this.health = {
      total: totalHealth,
      current: currentHealth,
      percent: (currentHealth / totalHealth) * 100
    };

    this.animation = {
      x: 0,
      y: 0,
    };
    this.direction = {
      facing: '',
      north: 0,
      south: 0,
      east: 0,
      west: 0,
      northEast: 0,
      northWest :0,
      southEast: 0,
      southWest: 0,
    };

    this.pos = {
      x: screenWidth / 2 - ((500 / 9) / 2),
      y: screenHeight / 2 - ((519 / 8) / 2)
    };

    this.speed = .05;
    this.avatar = null;
  }

  function getDirectionPositions (anyPlayerOrEnemy, first, second, third, fourth, fifth, sixth, seventh, eigth) {
    anyPlayerOrEnemy.direction[first] = 0;
    anyPlayerOrEnemy.direction[second] = anyPlayerOrEnemy.frame.height;
    anyPlayerOrEnemy.direction[third] = anyPlayerOrEnemy.frame.height * 2;
    anyPlayerOrEnemy.direction[fourth] = anyPlayerOrEnemy.frame.height * 3;
    anyPlayerOrEnemy.direction[fifth] = anyPlayerOrEnemy.frame.height * 4;
    anyPlayerOrEnemy.direction[sixth] = anyPlayerOrEnemy.frame.height * 5;
    anyPlayerOrEnemy.direction[seventh] = anyPlayerOrEnemy.frame.height * 6;
    anyPlayerOrEnemy.direction[eigth] = anyPlayerOrEnemy.frame.height * 7;
  }

  window.spritesheet = function (url, spritesheetX, spritesheetY, framesPerLine, amountOfRows, frameWidth, frameHeight, start, current, next, end) {
     if (!(spritesheetX && spritesheetY)) {
       console.error("Error: .loadSpritesheet() requires at least parameters (spritesheetX, spritesheetY)");
     } else {
         url.spritesheet = {
         width: spritesheetX,
         height: spritesheetX,
       }

       url.animation = {
         x: 0,
         y: 0
       }

       url.frame = {
         total: framesPerLine,
         amountOfRows: amountOfRows,
         currentRow: 0,
         width: frameWidth || spritesheetX / framesPerLine,
         height: frameHeight || spritesheetY / amountOfRows,
         start: start || 0,
         current: current | 0,
         next: next || 1,
         end: end || framesPerLine,
       }

     }

   }

  Enemy.prototype.update = function (elapsed) {
    if (actionTimesTen > 0 && actionTimesTen < 1.25) {
      this.direction.facing = this.direction.northWest;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 1.25 && actionTimesTen < 2.50) {
      this.direction.facing = this.direction.northEast;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 2.50 && actionTimesTen < 3.75) {
      this.direction.facing = this.direction.southWest;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 3.75 && actionTimesTen < 5) {
      this.direction.facing = this.direction.southEast;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 5 && actionTimesTen < 6.250) {
      this.direction.facing = this.direction.north;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 6.250 && actionTimesTen < 7.500) {
      this.direction.facing = this.direction.south;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 7.500 && actionTimesTen < 8.750) {
      this.direction.facing = this.direction.west;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 8.750 && actionTimesTen < 9) {
      this.direction.facing = this.direction.east;
      this.animation.y = this.direction.facing;
      bodies[1] = this;
    } else if (actionTimesTen >= 9 && actionTimesTen <= 10) {
      // pushes a new Projectile() object onto the projectiles array
      $PROJECTILE.createNew(this, projectiles, 'red');
    } else {
      console.log('Dragon is stationary');
    }
  }

  Enemy.prototype.draw = function (url, canvas) {
    csv.drawImage(
      url,
      (this.frame.width) * this.frame.current,
      this.direction.facing,
      this.frame.width, this.frame.height,
      this.pos.x, this.pos.y,
      this.frame.width, this.frame.height
    );
  }

  Enemy.prototype.isColliding = function(projectiles) {
    for (var i = 0; i < projectiles.length; i++) {
      if ($GAME.collisionDetection(this, projectiles[i]) === false) {
        this.health.percent -= .25;
        console.log('collision!');
        drawHitBox(csv, bodies, 'red');
        console.log(player.health.percent);
      }
  }
  };

var player = new Player(100, 100);
var dragon = new Enemy(100, 100);
window.spritesheet(dragon, 750, 560, 10, 8);
window.spritesheet(player, 500, 519, 9, 8);
getDirectionPositions(dragon, ['east'], ['southEast'], ['south'], ['southWest'], ['west'], ['northWest'], ['north'], ['northEast']);
getDirectionPositions(player, ['northWest'], ['north'], ['northEast'], ['east'], ['west'], ['southWest'], ['south'], ['southEast'])

  /**
   * healthbar varructor
   * creates healthbar and sets position 20px above the passed in object
   * for now, all healthbars will be 200px in width, or
   * twice the health percentage of any given object
   * hex is just a color, can be hexadecimal or a string
   * anyPlayerOrEnemy is an object of the Player() class, will add more soon
   *
   * @param {Number} width            [description]
   * @param {Number} height           [description]
   * @param {String} hex              [description]
   * @param {Object} anyPlayerOrEnemy [description]
   */
  function Healthbar(width, height, hex, anyPlayerOrEnemy) {
    this.width = width;
    this.height = height;
    this.color = hex;
    this.pos = {
      x: anyPlayerOrEnemy.pos.x,
      y: anyPlayerOrEnemy.pos.y - 20
    };
  }

  /**
   * all health bars will need their own draw and update functions
   * here they are in the prototype
   *
   * @param  {Object} anyPlayerOrEnemy [description]
   */
  Healthbar.prototype.drawBar = function(anyPlayerOrEnemy) {
    if (anyPlayerOrEnemy.health.percent) {
      csv.fillStyle = this.color;
      csv.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    } else {
      console.log('In order to determine the length of this ' +
        'health bar, please input a player' +
        ' or enemy object with a valid .health.percent property.');
    }
  };

  Healthbar.prototype.update = function(anyPlayerOrEnemy) {
    this.pos.x = anyPlayerOrEnemy.pos.x - anyPlayerOrEnemy.frame.width;
    this.pos.y = anyPlayerOrEnemy.pos.y - 20;
    this.width = anyPlayerOrEnemy.health.percent * 2;
  };

  var playerHealth = new Healthbar(200, 10, 'green', player);
  var projectile = new Projectile(player);

  bodies[0] = player;
  bodies[1] = dragon;

  function drawHitBox(canvas, bodies, color) {
      csv.strokeStyle = color;
      csv.fillStyle = 'blue';
      csv.font = '30px Cambria';
      csv.fillText('Defeat the dragon using projectiles (space bar)!', 10, 30);
      // for the key on the top-left
      for (var i = 0; i < bodies.length; i++) {
        // for players, since they have .frame
        // in the future, remove player.frame.width, just use player.width
        if (bodies[i] instanceof Player) {
          csv.strokeRect(bodies[i].pos.x, bodies[i].pos.y, bodies[i].frame.width, bodies[i].frame.height);
        } else if (bodies[i].width) {

          // for projectiles, since they don't have .frame
          // csv.strokeRect(bodies[i].pos.x - 5, bodies[i].pos.y - 5, bodies[i].width + 10, bodies[i].height + 10);
        } else if (bodies[i] instanceof Enemy) {
          csv.strokeRect(bodies[i].pos.x, bodies[i].pos.y, bodies[i].frame.width, bodies[i].frame.height);
        } else {
          console.error("Can't draw " + bodies[i] + ", check for a width and a height");
        }
      }
    };

  /**
   * [updateEverythingThenDraw description]
   *
   * @param  {Number} elapsed [description]
   */
  function updateEverythingThenDraw(elapsed) {
    $GAME.drawBoard(csv);
    $GAME.drawPlayer(csv, player);
    drawHitBox(csv, bodies, 'black');
    player.update(elapsed);
    player.isColliding(projectiles);
    dragon.isColliding(projectiles);
    $GAME.nextFrame(player);
    playerHealth.update(player);
    playerHealth.drawBar(player);
    dragonHealth.drawBar(dragon);
    dragonHealth.update(dragon);
    $PROJECTILE.draw(projectiles, csv);
    $PROJECTILE.update(projectiles);
    dragon.draw(dragonurl);
    $GAME.nextFrame(dragon);
    move(dragon, elapsed);
  }

  /**
   * [tick description]
   */
  function tick() {
    if (player.health.percent <= 0) {
      console.log('You ran out of health! You lose!');
      return;
    } else if (dragon.health.percent <= 0) {
      console.log('You have defeated the dragon! You win!');
    } else {
      requestAnimationFrame(tick);
      now = Date.now();
      elapsed = now - then;
      counter++;
      if (counter === 60) {
        dragon.update();
        console.log("changing direction!");
        counter = 0;
      }
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        updateEverythingThenDraw(elapsed);
        action = Math.random();
        actionTimesTen = (action * 10);
      }
    }
  }

  /**
   * [startGame description]
   *
   * @param  {Number} fps [description]
   */
  function startGame(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    dragon.update();
    console.log(dragon.direction);
    move(dragon, 4);
    tick();
  }

  playerHealth = new Healthbar(200, 10, 'green', player);
  var dragonHealth = new Healthbar(200, 10, 'green', dragon);
  player.avatar = new Image();
  // projectile = new Projectile(player);

  player.avatar.onload = function() {
      startGame(30);
  };

  player.avatar.onerror = function() {
    console.error('Cannot load spritesheet');
  };

  player.avatar.src = '/images/players/001.png';
})(typeof window === 'undefined' ? global : window);
