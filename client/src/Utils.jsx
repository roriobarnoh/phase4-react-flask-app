export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
