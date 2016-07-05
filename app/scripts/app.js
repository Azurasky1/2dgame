/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
(function() {
  'use strict';

  var app;
  var fpsInterval;
  var now;
  var then;
  var elapsed;
  var fps = 9;

  function updateEverythingThenDraw() {
    app.modules.Board.drawGrid();
    app.modules.Player.draw();
    app.modules.Player.nextFrame();
  }

  function animate() {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      updateEverythingThenDraw();
    }
  }

  // app core function
  function App() {
    var self = this;

    self.modules = window.$modules || {};
    self.game = {};

    self.el = {
      overlays: document.querySelector('.overlays'),
      canvas: document.querySelector('.canvas')
    };

    self.el.overlays
        .addEventListener('start', self.startGame, false);
    document
      .addEventListener('board_ready', self.boardReady, false);
    document
      .addEventListener('player_ready', self.setGameLoop.bind(this), false);

    _log('App ready!');
  }

  App.prototype.setGameLoop = function() {
    _log('Board ready. Starting the game loop');

    app.modules.Keyboard.init(app.game);

    fpsInterval = 1000 / fps;
    then = Date.now();

    animate();
  };

  App.prototype.startGame = function() {
    _log('Preparing the board...');

    app.modules.Board.init(app.game, app.el.canvas);
  };

  App.prototype.boardReady = function() {
    _log('Preparing the player...');

    app.modules.Player.init(app.game,
      '/images/players/player_001.png', {
        frames: 4,
        width: 128,
        height: 208
      });
  };

  function ready() {
    // Create an instance of the app
    app = new App();

    // Make sure the game Object is empty before starting a new game
    app.game = {};

    // Initialize modules
    app.modules.Overlays.init(app.el.overlays, app.game);

    // Start the welcome screen once the app is loaded
    app.modules.Overlays.startWelcome();
  }

  window.addEventListener('load', ready, false);
})();
