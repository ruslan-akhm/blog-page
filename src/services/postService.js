export default {
  getData: () => {
    return fetch("/api")
      .then(res => res.json())
      .then(data => data);
  },
  removePost: id => {
    return fetch("/api/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
      .then(res => res.json())
      .then(data => data);
  },
  default: () => {
    return fetch("/api/default")
      .then(res => res.json())
      .then(data => data);
  },
  updateHeader: fd => {
    return fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: fd
    })
      .then(res => res.json())
      .then(data => data);
  },
  updateAvatar: fd => {
    return fetch("/api/avatar", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: fd
    })
      .then(res => res.json())
      .then(data => data);
  },
  updateBio: bio => {
    return fetch("/api/bio", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ bio })
    })
      .then(res => res.json())
      .then(data => data);
  },
  addPost: fd => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: fd
    })
      .then(res => res.json())
      .then(data => data);
  },
  
};
