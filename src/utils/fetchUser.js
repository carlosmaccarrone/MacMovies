export async function fetchUser(username) {
  try {
    const PUBLIC_PATH = process.env.GH_PAGES ? '/MacMovies/' : '';
    const response = await fetch(`${PUBLIC_PATH}users.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Error fetching users');
    const users = await response.json();
    return users.find((u) => u.username === username);
  } catch (err) {
    console.error('Fetch users failed:', err);
    throw err;
  }
}