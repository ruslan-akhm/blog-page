export default {
  getData: (user) => {
    return fetch(`/api/users/${user}`)
      .then(res => res.json())
      .then(data => data);
  },
  getAllUsers: () =>{
    return fetch("/api")
      .then(res => res.json())
      .then(data => data);
  },
  removePost: id => {
    console.log(id)
    return fetch("/api/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
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
  addPost: fd => {
    console.log(fd)
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
