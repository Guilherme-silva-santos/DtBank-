import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000', // a url base que vai ser feita a busca da api
})
