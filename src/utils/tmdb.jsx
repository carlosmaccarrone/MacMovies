import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config';

export async function fetchFromTMDb(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);
  
  // add the API key to all requests
  url.searchParams.set('api_key', TMDB_API_KEY);

  // add other optional params
  Object.keys(params).forEach(key => url.searchParams.set(key, params[key]));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDb API request failed: ${response.status}`);
  }
  return response.json();
}