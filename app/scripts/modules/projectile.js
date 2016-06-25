(function(global) {
  'use strict';

  /**
   * [Projectile description]
   *
   * @param {Object} anyPlayerOrEnemy [description]
   */
  function Projectile(anyPlayerOrEnemy) {
    this.velocity = {
      x: 20,
      y: 0
    };

    this.height = 10;
    this.width = 10;
    this.color = 'black';
  }

  Projectile.prototype.draw = function(projectiles, csv) {
    for (var i = 0; i < projectiles.length; i++) {
      var thisProjectile = projectiles[i];
      csv.clearRect(projectiles[i].pos.x, projectiles[i].pos.y,
      projectiles[i].width, projectiles[i].height);
      csv.fillStyle = thisProjectile.color;
      csv.fillRect(thisProjectile.pos.x, thisProjectile.pos.y,
      thisProjectile.width, thisProjectile.height);
    }
  };

  // makes new projectile
  Projectile.prototype.createNew = function(anyPlayerOrEnemy, projectiles, color) {
    var projectile = new Projectile(anyPlayerOrEnemy);
    projectile.pos = {
      x: 0,
      y: 0,
    },
    function adjustPosition (anyPlayerOrEnemy) {
    switch (anyPlayerOrEnemy.direction.facing) {

      case anyPlayerOrEnemy.direction.northWest: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x - 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y - 10;
        projectile.velocity.x = -20;
        projectile.velocity.y = -20;
      }
      break;

      case anyPlayerOrEnemy.direction.northEast: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width + 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y - 10;
        projectile.velocity.x = 20;
        projectile.velocity.y = -20;
      }
      break;

      case anyPlayerOrEnemy.direction.southWest: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x - 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.height + 10;
        projectile.velocity.x = -20;
        projectile.velocity.y = 20;
      }
      break;

      case anyPlayerOrEnemy.direction.southEast: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width + 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.height + 10;
        projectile.velocity.x = 20;
        projectile.velocity.y = 20;
      }
      break;

      case anyPlayerOrEnemy.direction.north: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width / 2;
        projectile.pos.y = anyPlayerOrEnemy.pos.y - 10;
        projectile.velocity.x = 0;
        projectile.velocity.y = -20;
      }
      break;

      case anyPlayerOrEnemy.direction.south: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width / 2;
        projectile.pos.y = anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.width + 10;
        projectile.velocity.x = 0;
        projectile.velocity.y = 20;
      }
      break;

      case anyPlayerOrEnemy.direction.west: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x - 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.width / 2;
        projectile.velocity.x = -20;
        projectile.velocity.y = 0;
      }
      break;

      case anyPlayerOrEnemy.direction.east: {
        projectile.pos.x = anyPlayerOrEnemy.pos.x + anyPlayerOrEnemy.frame.width + 10;
        projectile.pos.y = anyPlayerOrEnemy.pos.y + anyPlayerOrEnemy.frame.height / 2;
        projectile.velocity.x = 20;
        projectile.velocity.y = 0;
      }
      break;

}
}(anyPlayerOrEnemy, projectile);
    projectile.color = color;

    projectiles.push(projectile);
  };

  Projectile.prototype.update = function(projectiles) {
    for (var i = 0; i < projectiles.length; i++) {
      projectiles[i].pos.x += projectiles[i].velocity.x;
      projectiles[i].pos.y += projectiles[i].velocity.y;
    }
  };

  global.$PROJECTILE = new Projectile();
})(typeof window === 'undefined' ? global : window);
