export const Logout = () => {
  localStorage.removeItem("token");
  document.location = "/";
};
