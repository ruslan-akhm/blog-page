export default {
  getData: ()=>{
    return fetch('/api')
        .then(res =>res.json())
        .then(data=>data)
  }
}