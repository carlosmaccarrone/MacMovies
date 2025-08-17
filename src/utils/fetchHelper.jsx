const BASE_PATH = window.location.hostname.includes('github.io') ? 'https://carlosmaccarrone.github.io/MacMovies' : '';

export async function fetchJSON(path, options = {}) {
  const response = await fetch(`${BASE_PATH}${path}`, options);
  if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
  return response.json();
}