(function () {

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

})
