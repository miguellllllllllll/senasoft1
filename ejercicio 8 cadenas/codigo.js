function shiftedDiff(first, second) {
    const doubleFirst = first + first;
    const index = doubleFirst.indexOf(second);
    return index !== -1 ? index % first.length : -1;
  }
  
  
  const firstString = prompt("Ingrese la primera cadena:");
  const secondString = prompt("Ingrese la segunda cadena:");
  
  
  const rotations = shiftedDiff(firstString, secondString);
  
  
  if (rotations === -1) {
    alert("La segunda cadena no es una rotación de la primera.");
  } else {
    alert(`Se necesitan ${rotations} rotaciones para obtener la segunda cadena.`);
  }
  