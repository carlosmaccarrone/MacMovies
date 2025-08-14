export async function fetchUser(username) {
  try {
    const response = await fetch('/users.json', { cache: 'no-store' });
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