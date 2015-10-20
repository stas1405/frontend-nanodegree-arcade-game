var enemy_pos_y = [74, 157, 240];
var enemySpeed = [100, 130, 160, 200, 250, 300, 400];
var gem_pos_x = [0, 101, 202, 303, 404, 505, 606, 707, 808];
var gemImages = ['images/Gem Orange.png', 'images/Gem Blue.png', 'images/Gem Green.png'];
var playerImages = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
     //this.sprite = 'images/enemy-bug.png';
     this.sprite = 'images/robot1.png';
     this.x = -100;
     this.y = enemy_pos_y[Math.floor(Math.random() * 3)];
     this.speed = enemySpeed[Math.floor(Math.random() * 7)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 960) {
    this.x = -100;
    this.y = this.y + 83;
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
    if (this.y > 240) {
      this.y = 74;
    }
  }

  if (this.x > -50 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 101;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 202;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 303;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 404;
  } else if (this.x > 450 && this.x < 550) {
    this.tileX = 505;
  } else if (this.x > 550 && this.x < 650) {
    this.tileX = 606;
  } else if (this.x > 650 && this.x < 750) {
    this.tileX = 707;
  } else if (this.x > 750 && this.x < 850) {
    this.tileX = 808;
  } else if (this.x > 850) {
    this.tileX = 1;
  }

  if (player.x === this.tileX && player.y === this.y) {
    player.reset();
    playerLife.decrease();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/* Player class*/

var Player = function() {
 // this.playerImage = playerImages[Math.floor(Math.random() * 5)];
  this.playerImage = 'images/zombie.png';
  this.x = 404;
  this.y = 406;
};

/*Player movements */
Player.prototype.update = function() {
  if (this.ctlKey === 'left' && this.x !== 0) {
    this.x = this.x - 101;
  } else if (this.ctlKey === 'right' && this.x != 808) {
    this.x = this.x + 101;
  } else if (this.ctlKey === 'up') {
    this.y = this.y - 83;
  } else if (this.ctlKey === 'down' && this.y != 406) {
    this.y = this.y + 83;
  }
  this.ctlKey = null;

  if (this.y < 60) {
    this.reset();
    playerLife.decrease();
  }

};
/*Player apears on this position. */
 
Player.prototype.reset = function() {
  this.x = 404;
  this.y = 406;
};

/* Renders the player on the screen. */

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
};

/* Player control */

Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
};

/* Player collecting gems */

var Gem = function() {
  //this.gemImg = gemImages[Math.floor(Math.random() * 3)];
  this.gemImg = 'images/Heart.png';
  this.x = gem_pos_x[Math.floor(Math.random() * 9)];
  this.y = enemy_pos_y[Math.floor(Math.random() * 3)];
};

/* When player collecting game, gems apear on the canvas randomly */

Gem.prototype.update = function() {
  if (player.x === this.x && player.y === this.y) {
    //this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.gemImg = 'images/Heart.png';
    this.x = gem_pos_x[Math.floor(Math.random() * 9)];
    this.y = enemy_pos_y[Math.floor(Math.random() * 3)];
    if (allEnemies.length < 8) {
      allEnemies.push(new Enemy());
    }
  }
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};

var Life = function() {
  this.lifeImg = 'images/star1.png';
  this.life = 3;
}
/**
 * Renders the life on the screen.
 */
Life.prototype.render = function() {
  var x = 0;
  for (var i = 0; i < this.life; i++) {
    ctx.drawImage(Resources.get(this.lifeImg), x, 590);
    x = x + 50;
  }
  if (this.life === 0) {
    // ctx.drawImage(Resources.get('images/gameover.png'), 0, 50);
     ctx.font = '30px Arial';
     ctx.fillStyle = 'white';
    ctx.fillText("You've collected gems",300,420);
  }
}
/**
 * Decrease number of lives.
 */
Life.prototype.decrease = function() {
  if (this.life > 0) {
    this.life = this.life - 1;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();
var gem = new Gem();
var playerLife = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
