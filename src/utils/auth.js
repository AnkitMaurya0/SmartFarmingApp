// LocalStorage-based auth (no backend needed for now)
const STORAGE_KEY = 'smartfarm_users';
const SESSION_KEY = 'smartfarm_session';

export const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
};

export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};

export const signup = ({ name, phone, state, lang }) => {
  const users = getUsers();
  const exists = users.find((u) => u.phone === phone);
  if (exists) return { success: false, error: 'phone_exists' };
  const user = { id: Date.now().toString(), name, phone, state, lang, createdAt: new Date().toISOString() };
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const login = ({ phone }) => {
  const users = getUsers();
  const user = users.find((u) => u.phone === phone);
  if (!user) return { success: false, error: 'not_found' };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};
