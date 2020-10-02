export default {
  register: (user)=>{
    return fetch("/api/auth/register", {
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(user),
        })
        .then(res =>res.json())
        .then(data=>data)
  }
}