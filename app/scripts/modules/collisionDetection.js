(function (){
var $collisionDetection = {};
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

  $collisionDetection.collisionDetection = collisionDetection;
  $collisionDetection.isNotColliding = isNotColliding;
  $collisionDetection.updateBodies = updateBodies;

  global.$collisionDetection = $collisionDetection;


})();
