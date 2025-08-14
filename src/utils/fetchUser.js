export async function fetchUser(username) {
  const PUBLIC_PATH = process.env.GH_PAGES ? '/MacMovies/' : '';

  try {
    const response = await fetch(`${PUBLIC_PATH}users.json`);
    if (!response.ok) throw new Error('Error fetching users');
    const users = await response.json();
    const userFound = users.find((u) => u.username === username);
    return userFound;
  } catch (err) {
    console.error('Fetch users failed:', err);
    throw err;
  }
}