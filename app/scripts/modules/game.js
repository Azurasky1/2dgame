(function(global) {
  'use strict';

  /**
   * [game description]
   */
  function Game() {
    var self = this;

    // private scope
    var _board = {
      background: '#FAFAFA'
    };

    var screenHeight = document.body.offsetHeight;
    var screenWidth = document.body.offsetWidth;

    // public scope

    /**
     * [drawPlayer description]
     *
     * @param  {Object} game  [description]
     */
    function drawPlayer(canvas, player) {
      // taken from (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
      canvas.drawImage(
        player.avatar,
        player.frame.width * player.frame.current,
        player.animation.y,
        player.frame.width, player.frame.height, // clip size -S
        player.pos.x, player.pos.y, // centered on canvass
        player.frame.width, player.frame.height // image size to draw
      );

    }

    /**
     * [nextFrame description]
     *
     * @param  {Object} el [description]
     */
    function nextFrame(el) {
      if (el.frame.current < el.frame.total - 1) {
        el.frame.current += 1;
      } else {
        el.frame.current = 0;
      }
    }

    /**
     * [drawBoard description]
     *
     * @param  {Object} game [description]
     */
    function drawBoard(canvas) {
      // added clearRect so that we don't keep drawing over the canvas
      canvas.clearRect(0, 0,
                        screenWidth,
                        screenHeight);
      canvas.fillStyle = _board.background;
      canvas.fillRect(0, 0,
                        screenWidth,
                        screenHeight);
    }

    function collisionDetection(body1, body2) {
      return ( (body1 === body2) ||
      (body1.pos.x + body1.frame.width < body2.pos.x) ||
      (body1.pos.x > body2.pos.x + body2.width) ||
      (body1.pos.y > body2.pos.y + body2.height) ||
      (body1.pos.y + body1.frame.height < body2.pos.y));
    };

    function isNotColliding(b1) {
        return this.bodies.filter(function (b2) {
        collisionDetection(b1, b2)
        }.length === 0);
    }

    function isColliding () {
     for (var i = 0; i < bodies.length; i++) {
       if (bodies[i] instanceof Projectile) {
       if (collisionDetection(player, bodies[i]) === false)  {
         player.health.percent -= 1;
         console.log('collision!');
         drawHitBox('red');
         console.log(player.health.percent);
         console.log(playerHealth.width);
       }
     }
     }
   }

  function updateBodies() {
    var newBodies = bodies.filter(this.isNotColliding);
    bodies = newBodies;
    for (var i = 0; i < bodies.length; i++) {
      bodies[i].update;
      }
    }

    self.drawPlayer = drawPlayer;
    self.drawBoard = drawBoard;
    self.nextFrame = nextFrame;
    self.updateBodies = updateBodies;
    self.collisionDetection = collisionDetection;
    self.isNotColliding = isNotColliding;
    self.isColliding = isColliding;
  }

  // expose $PLAYER on the global scope
  global.$GAME = new Game();
})(typeof window === 'undefined' ? global : window);
