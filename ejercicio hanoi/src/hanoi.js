// Función para resolver la torre de Hanoi y obtener las secuencias de movimientos.

const getHanoiSolutions = (nDiscs) => {
    const solutions = []
  
    // Función recursiva para mover la torre de discos desde el origen hasta el destino usando aux como clavija auxiliar.
    const hanoi = (n, origin, destiny, aux) => {
      if (n == 1) {
        // Caso base: si solo hay un disco, muévelo directamente al destino
        solutions.push({ disc: n, origin, destiny })
        return;
      }
  
      // Mueve n - 1 discos desde el origen al auxiliar, usando el destino como clavija auxiliar
      hanoi(n - 1, origin, aux, destiny)
  
      // Mueve el disco mas grande desde el origen hasta el destino
      solutions.push({ disc: n, origin, destiny })
  
      // Mueva n - 1 discos desde aux hasta destino, usando el origen como clavija auxiliar
      hanoi(n - 1, aux, destiny, origin)
    }
  
    // Inicie el proceso recursivo con la llamada inicial a la función hanoi
    hanoi(nDiscs, 0, 1, 2)
  
    return solutions;
  }
  
  export {
    getHanoiSolutions
  }