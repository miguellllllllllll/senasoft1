function startCountdown() {
  const skill = document.getElementById("skill").value;
  const module = document.getElementById("module").value;
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

//   document.getElementById("formContainer").classList.add("hidden");
//   document.getElementById("countdownContainer").classList.remove("hidden");

  const countdown = document.getElementById("countdown");
  const hoursDisplay = document.getElementById("hoursDisplay");
  const minutesDisplay = document.getElementById("minutesDisplay");
  const secondsDisplay = document.getElementById("secondsDisplay");

  countdown.classList.remove("disabled");

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const interval = setInterval(() => {
    hoursDisplay.textContent = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    minutesDisplay.textContent = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    secondsDisplay.textContent = (totalSeconds % 60)
      .toString()
      .padStart(2, "0");

    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(interval);
      alert("¡Tiempo agotado!");
    }
  }, 1000);
}
