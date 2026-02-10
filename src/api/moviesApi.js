export function fetchMovies(shouldFail = false, delayMs = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("No movies fetched"));
        return;
      }

      fetch("/movies.json")
        .then((response) => {
          if (!response.ok) {
            reject(new Error(`Movies API returned status ${response.status}`));
            return;
          }

          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    }, delayMs);
  });
}
