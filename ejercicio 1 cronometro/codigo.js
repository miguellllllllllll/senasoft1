let intervalo;
let tiempoPausado;

        function iniciar() {
            const horasInput = document.getElementById('horas');
            const minutosInput = document.getElementById('minutos');
            const segundosInput = document.getElementById('segundos');   

            const contador = document.getElementById('contador');

            const horas = parseInt(horasInput.value);
            const minutos = parseInt(minutosInput.value);
            const segundos = parseInt(segundosInput.value);   


            let tiempoTotal = horas * 3600 + minutos * 60 + segundos;

            intervalo = setInterval(() => {
                const horas = Math.floor(tiempoTotal / 3600).toString().padStart(2, '0');
                const minutos = Math.floor((tiempoTotal % 3600) / 60).toString().padStart(2, '0');
                const segundos = (tiempoTotal % 60).toString().padStart(2, '0');

                contador.textContent = `${horas}:${minutos}:${segundos}`;

                tiempoTotal--;

                if (tiempoTotal < 0) {
                    clearInterval(intervalo);
                    contador.textContent = '¡Tiempo agotado!';
                }
            }, 1000);
        }
        