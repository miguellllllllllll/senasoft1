const lights = document.querySelectorAll('.light');

function randomBlink() {
  lights.forEach(light => {
    light.style.animationDelay = Math.random() * 2 + 's'; // Retraso aleatorio entre 0 y 2 segundos
  });
}

randomBlink(); // Iniciar el parpadeo aleatorio
