let token = localStorage.getItem("TOKEN");

const auth = {
  isAuthenticated: token ? true : false,
  authenticate(data) {
    if (data) {
      this.isAuthenticated = true;
    }
  },
  logout() {
    this.isAuthenticated = false;
  }
};

export default auth;
