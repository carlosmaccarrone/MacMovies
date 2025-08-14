export async function fetchUser(username) {
  try {
    const PUBLIC_PATH = process.env.GH_PAGES ? '/MacMovies/' : '';
    const response = await fetch(`${PUBLIC_PATH}users.json`, { cache: 'no-store' });
    console.log('response', response);
    if (!response.ok) throw new Error('Error fetching users');
    const users = await response.json();
    console.log('users', users);
    return users.find((u) => u.username === username);
  } catch (err) {
    console.error('Fetch users failed:', err);
    throw err;
  }
}