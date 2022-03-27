export const CalculateRouteCost = (route) => {
  const graph = {
    AB: 1,
    AC: 4,
    AD: 10,
    BE: 3,
    CD: 4,
    CF: 2,
    DE: 1,
    EB: 3,
    EA: 2,
    FD: 1,
  };
  return new Promise((resolve) => {
    const cities = SplitCities(route);
    let firstCity = true;
    let total = 0;
    let path;
    cities.map((city) => {
      if (firstCity) {
        path = city;
        firstCity = false;
      } else {
        path += city;
        if (graph[path] !== null) {
          total += graph[path];
          path = path.charAt(1);
        }
      }
    });
    resolve(total ? { route, cost: total } : "No Such Route");
  });
};

export const FindAllPaths = (route, maxStop = null) => {
  const cities = {
    A: ["B", "C", "D"],
    B: ["E"],
    C: ["D", "F"],
    D: ["E"],
    E: ["A", "B"],
    F: ["D"],
  };
  return new Promise((resolve) => {
    const routeCities = SplitCities(route);
    if (routeCities.length < 3) {
      const source = routeCities[0];
      const destination = routeCities[1];
      let routes = 0;
      const neighbours = cities[source];

      neighbours.map((neighbor) => {
        const queue = [neighbor];
        let stops = 0;
        while (queue.length > 0 && stops <= maxStop) {
          const current = queue.shift();
          const nNeighbours = cities[current];
          if (current == destination) {
            routes++;
            stops++;
          }
          nNeighbours.map((nNeighbour) => queue.push(nNeighbour));
        }
      });
      resolve({ route, totalPaths: routes });
    } else {
      resolve("Please only choose origin and destinations cities.");
    }
  });
};

const SplitCities = (route) => route.split("-");
