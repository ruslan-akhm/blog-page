export default {
  register: user => {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => data);
  },
  login: user => {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => data);
  },
  logout: () => {
    return fetch("/api/auth/logout")
      .then(res => res.json())
      .then(data => data);
  },
  isAuthenticated: () => {
    return fetch("/api/auth/authenticated")
      .then(res => res.json())
      .then(data => data);
  },
  getSettings: () => {
    return fetch("/api/auth/settings")
      .then(res => res.json())
      .then(data => data);
  },
  postSettings: newBio => {
    return fetch("/api/auth/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBio)
    })
      .then(res => res.json())
      .then(data => data);
  }
};
