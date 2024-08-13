const torres = document.querySelectorAll('.torre');
let discosEnMovimiento = null;

// Función para iniciar el arrastre
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
  discosEnMovimiento = event.target;
}

// Función para permitir soltar el disco
function allowDrop(event) {
  event.preventDefault();
}

// Función para soltar el disco
function drop(event) {
  event.preventDefault();
  const disco = document.getElementById(event.dataTransfer.getData('text'));
  const target = event.target;

  // Verificar si el destino es una torre y si el disco puede colocarse encima
  if (target.classList.contains('torre') && puedeColocarDisco(disco, target)) {
    target.appendChild(disco);
    discosEnMovimiento = null;
  }
}

// Función para verificar si un disco puede colocarse en una torre
function puedeColocarDisco(disco, torre) {
  // Obtener el último disco de la torre de destino
  const ultimoDisco = torre.lastElementChild;
  if (!ultimoDisco) {
    return true; // Si la torre está vacía, se puede colocar cualquier disco
  }
  // Obtener el tamaño de los discos (basado en la clase)
  const tamañoDisco = disco.classList[1].split('disco')[1];
  const tamañoUltimoDisco = ultimoDisco.classList[1].split('disco')[1];
  return tamañoDisco < tamañoUltimoDisco;
}

// Agregar eventos a los discos y torres
const discos = document.querySelectorAll('.disco');
discos.forEach(disco => {
  disco.addEventListener('dragstart', dragStart);
});

torres.forEach(torre => {
  torre.addEventListener('dragover', allowDrop);
  torre.addEventListener('drop', drop);
});
