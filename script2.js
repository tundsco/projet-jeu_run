const player = document.getElementsByClassName('caractere1')[0];
const board = document.getElementById('game');

let isJumping = false;
let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
let originalPlayerTop = playerTop;


// Cette fontion permet au joueur de sauter et de revenir automatiquement à sa position de départ
function jump() {
  if (!isJumping) {
    isJumping = true;
    let jumpInterval = setInterval(function() {
      playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
      const boardTop = parseInt(window.getComputedStyle(board).getPropertyValue('top'));

      if (playerTop > originalPlayerTop - 250) {
        player.style.top = (playerTop - 10) + 'px';
      }

      if (playerTop <= originalPlayerTop - 250) {
        clearInterval(jumpInterval);

        let fallInterval = setInterval(function() {
          playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

          if (playerTop < originalPlayerTop) {
            player.style.top = (playerTop + 10) + 'px';
          }

          if (playerTop >= originalPlayerTop) {
            clearInterval(fallInterval);
            isJumping = false;
            player.style.top = originalPlayerTop + 'px';
          }
        }, 20);
      }
    }, 20);
  }
}
window.addEventListener('keydown', function(event) {
  const boardWidth = board.offsetWidth;
  const playerWidth = player.offsetWidth;
  const playerLeft = player.offsetLeft;
  
  if (event.key === 'ArrowLeft' && playerLeft > 0) {
    player.style.left = playerLeft - 50 + 'px';
  } else if (event.key === 'ArrowRight' && playerLeft + playerWidth < boardWidth) {
    player.style.left = playerLeft + 50 + 'px';
  } else if (event.key === 'ArrowUp' && !isJumping) {
    jump();
  }
  
  // Empêcher la div "player" de sortir du périmètre côté gauche ou droit de la div parente
  
});

const obstacles = document.querySelectorAll('.obstacle');

obstacles.forEach((obstacle) => {
  const duration = 3000;
  const containerHeight = document.documentElement.clientHeight;
  const obstacleHeight = obstacle.offsetHeight;
  const distance = containerHeight + obstacleHeight;
  const speed = distance / duration;
  let startPosition = obstacle.offsetTop;
  let startTime = performance.now();  

  obstacle.style.top = startPosition + 'px';

  function animateObstacle(currentTime) {
    const elapsed = currentTime - startTime;

    if (elapsed < duration) {
      const position = startPosition + speed * elapsed;
      obstacle.style.top = position + 'px';
      requestAnimationFrame(animateObstacle);
    } else {
      obstacle.style.top = '0px';
      startTime = performance.now();
      startPosition = obstacle.offsetTop;
      requestAnimationFrame(animateObstacle);
    }
  }

  requestAnimationFrame(animateObstacle);
});


function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

// Fonction pour vérifier les collisions à chaque frame
function checkCollisions() {
  obstacles.forEach(obstacle => {
    if (checkCollision(player, obstacle)) {
      // Afficher le message "Game Over"
      const gameOver = document.createElement('div');
      gameOver.textContent = 'Game Over';
      gameOver.style.position = 'fixed';
      gameOver.style.top = '50%';
      gameOver.style.left = '50%';
      gameOver.style.transform = 'translate(-50%, -50%)';
      gameOver.style.backgroundColor = 'red';
      gameOver.style.color = 'white';
      gameOver.style.padding = '20px';
      document.body.appendChild(gameOver);
      
      // Arrêter le jeu
      stopAnimation();
    }
  });
}


let gamerunning = true;
let animationId;

function animate() {
  // continuer l'animation si le jeu est en cours
  // ...

  checkCollisions();

  // arrêter l'animation si le jeu est terminé
  if (!gamerunning) {
    return cancelAnimationFrame(animationId);
  }

  animationId = requestAnimationFrame(animate);
}

animate();



