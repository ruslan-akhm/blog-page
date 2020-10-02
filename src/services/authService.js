export default {
  register: ()=>{
    return fetch("/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body:""
        })
        .then(res =>res.json())
        .then(data=>data)
  }
}