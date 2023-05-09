
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

      if (playerTop > originalPlayerTop - 200) {
        player.style.top = (playerTop - 10) + 'px';
      }

      if (playerTop <= originalPlayerTop - 200) {
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

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * 75) + '%'; // générer une position aléatoire pour l'obstacle
  board.appendChild(obstacle);
}

obstacles.forEach(obstacle => {
  // Génération aléatoire de la position de départ
  const minStartPos = -200; // position minimale de départ
  const maxStartPos = -50; // position maximale de départ
  const randomStartPos = Math.floor(Math.random() * (maxStartPos - minStartPos + 1)) + minStartPos;

  obstacle.style.top = randomStartPos + 'px'; // positionner l'obstacle avec la position de départ aléatoire

  const duration = 3000;
  const containerHeight = document.documentElement.clientHeight;
  const obstacleHeight = obstacle.offsetHeight;
  const distance = containerHeight + obstacleHeight;
  const speed = distance / duration;
  let startPosition = obstacle.offsetTop;
  let startTime = performance.now();  

  function animateObstacle(currentTime) {
    const elapsed = currentTime - startTime;
  
    if (elapsed < duration && gamerunning) { // Vérifier si le jeu est en cours
      const position = startPosition + speed * elapsed;
      obstacle.style.top = position + 'px';
      requestAnimationFrame(animateObstacle);
  } else {
      obstacle.style.top = randomStartPos + 'px'; // redéfinir la position de départ aléatoire
      startTime = performance.now();
      startPosition = obstacle.offsetTop;
      requestAnimationFrame(animateObstacle);
  }
}
  
  requestAnimationFrame(animateObstacle);
});

function randomPosition() {
  const containerHeight = document.documentElement.clientHeight;
  const obstacleHeight = 80; // hauteur des obstacles, vous pouvez la changer selon vos besoins
  return -obstacleHeight - Math.floor(Math.random() * (containerHeight - obstacleHeight));
}


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
      gameOver.textContent = 'VOICI VOTRE SCORE :';
      gameOver.style.textAlign = 'center';
      gameOver.style.fontSize = '25px';
      gameOver.style.fontFamily = 'Arial';
      gameOver.style.position = 'fixed';
      gameOver.style.top = '50%';
      gameOver.style.left = '50%';
      gameOver.style.transform = 'translate(-50%, -50%)';
      gameOver.style.backgroundColor = 'rgba(0, 0, 0, .25)';
      gameOver.style.color = 'white';
      gameOver.style.padding = '20px';
      gameOver.style.width = '550px';
      gameOver.style.height = '400px';
      gameOver.style.borderRadius = '15px';
      gameOver.style.borderColor = 'black'
      document.body.appendChild(gameOver);

      const score = document.createElement('input');
      score.style.width = '290px';
      score.style.height = '40px';
      score.backgroundColor = 'white';
      score.style.position = 'fixed';
      score.style.top = '40%';
      score.style.left = '25%';
      score.style.borderRadius = '5px';
      gameOver.appendChild(score);

      // Ajouter un bouton "Restart"
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Recommencez';
      restartButton.style.marginTop = '20px';
      restartButton.style.padding = '15px';
      restartButton.style.borderRadius = '5px';
      restartButton.style.position = 'fixed';
      restartButton.style.cursor = 'pointer';
      restartButton.style.top = '75%';
      restartButton.style.left = '40%';
      restartButton.addEventListener('click', function() {
        location.reload();
      });
      gameOver.appendChild(restartButton);

      // Arrêter le jeu
      gamerunning = false;
      cancelAnimationFrame(animationId);
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


