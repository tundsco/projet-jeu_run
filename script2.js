const player = document.getElementsByClassName('caractere1')[0];
const board = document.getElementById('game');

let isJumping = false;
let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
let originalPlayerTop = playerTop;

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
  const duration = 4500;
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
      obstacle.style.top = '20px';
      startTime = performance.now();
      startPosition = obstacle.offsetTop;
      requestAnimationFrame(animateObstacle);
    }
  }

  requestAnimationFrame(animateObstacle);
});


let gamerunning = true

// Animation loop
function animate() {
  if (gamerunning) {
    // ...
    requestAnimationFrame(animate);
  }
}


animate();