function fastestRunners(runners) {
    // Calcular el ritmo promedio general
    const totalPaces = runners.flatMap(runner => runner.paces.map(pace => {
      const [minutes, seconds] = pace.split(':').map(Number);
      return minutes * 60 + seconds;
    })).reduce((sum, pace) => sum + pace, 0);
    const averagePaceOverall = totalPaces / (runners.length * 7); // 7 km de carrera
  
    // Filtrar y formatear corredores más rápidos
    return runners
      .map(runner => {
        const totalPace = runner.paces.reduce((sum, pace) => {
          const [minutes, seconds] = pace.split(':').map(Number);
          return sum + minutes * 60 + seconds;
        }, 0);
        const averagePace = Math.round(totalPace / runner.paces.length);
        const fastestPace = Math.min(...runner.paces.map(pace => {
          const [minutes, seconds] = pace.split(':').map(Number);
          return minutes * 60 + seconds;
        }));
        return {
          name: runner.name,
          averagePace: `${Math.floor(averagePace / 60)}:${averagePace % 60}`,
          fastestPace: runner.paces.sort()[0]
        };
      })
      .filter(runner => runner.averagePace < averagePaceOverall)
      .sort((a, b) => a.averagePace - b.averagePace);
  }
  
  
  
  const runnersData = datos.json
  
  const fastest = fastestRunners(runnersData);
  document.write(fastest);
  