export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const setCurrentUser = user => {
  return localStorage.setItem('user', JSON.stringify(user));
};
