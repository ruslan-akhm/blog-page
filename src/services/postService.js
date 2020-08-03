export default {
  getData: ()=>{
    return fetch('/api')
        .then(res =>res.json())
        .then(data=>data)
  },
  removePost: (id)=>{
    return fetch("/api/delete", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({id:id})
          })
          .then(res =>res.json())
          .then(data=>data)
  }
}