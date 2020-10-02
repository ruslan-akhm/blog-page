export default {
  register: ()=>{
    return fetch('/api')
        .then(res =>res.json())
        .then(data=>data)
  },
}