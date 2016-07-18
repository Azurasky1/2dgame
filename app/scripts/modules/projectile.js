/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Projectile
 * Description:
*/
(function(modules) {
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

  Projectile.prototype = {
    createNew: function(anyPlayerOrEnemy, projectiles, color) {
      var projectile = new Projectile(anyPlayerOrEnemy);
      projectile.pos = {
        x: 0,
        y: 0
      };
    },

    adjustPosition: function(anyPlayerOrEnemy, projectile) {
      switch (anyPlayerOrEnemy.direction.facing) {
        case anyPlayerOrEnemy.direction.northWest: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x - 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y - 20;
          projectile.velocity.x = -20;
          projectile.velocity.y = -20;
          break;
        }

        case anyPlayerOrEnemy.direction.northEast: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x +
                             anyPlayerOrEnemy.frame.width + 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y - 20;
          projectile.velocity.x = 20;
          projectile.velocity.y = -20;
          break;
        }

        case anyPlayerOrEnemy.direction.southWest: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x - 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y +
                             anyPlayerOrEnemy.frame.height + 20;
          projectile.velocity.x = -20;
          projectile.velocity.y = 20;
          break;
        }

        case anyPlayerOrEnemy.direction.southEast: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x +
                             anyPlayerOrEnemy.frame.width + 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y +
                             anyPlayerOrEnemy.frame.height + 20;
          projectile.velocity.x = 20;
          projectile.velocity.y = 20;
          break;
        }

        case anyPlayerOrEnemy.direction.north: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x +
                             anyPlayerOrEnemy.frame.width / 2;
          projectile.pos.y = anyPlayerOrEnemy.pos.y - 20;
          projectile.velocity.x = 0;
          projectile.velocity.y = -20;
          break;
        }

        case anyPlayerOrEnemy.direction.south: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x +
                             anyPlayerOrEnemy.frame.width / 2;
          projectile.pos.y = anyPlayerOrEnemy.pos.y +
                             anyPlayerOrEnemy.frame.width + 20;
          projectile.velocity.x = 0;
          projectile.velocity.y = 20;
          break;
        }

        case anyPlayerOrEnemy.direction.west: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x - 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y +
                             anyPlayerOrEnemy.frame.width / 2;
          projectile.velocity.x = -20;
          projectile.velocity.y = 0;
          break;
        }

        case anyPlayerOrEnemy.direction.east: {
          projectile.pos.x = anyPlayerOrEnemy.pos.x +
                             anyPlayerOrEnemy.frame.width + 20;
          projectile.pos.y = anyPlayerOrEnemy.pos.y +
                             anyPlayerOrEnemy.frame.height / 2;
          projectile.velocity.x = 20;
          projectile.velocity.y = 0;
          break;
        }
      }
    },

    // projectile.color = color;

    // projectiles.push(projectile);

    update: function(projectiles) {
      for (var i = 0; i < projectiles.length; i++) {
        projectiles[i].pos.x += projectiles[i].velocity.x;
        projectiles[i].pos.y += projectiles[i].velocity.y;
      }
    }
  };

  modules.Projectile = new Projectile();
  window.$modules = modules;
})(window.$modules || {});
