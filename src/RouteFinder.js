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

export const CalculateRouteCost = (route) => {
  const cities = route.split("-");
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

  return total ? { route, cost: total } : "No Such Route";
};
