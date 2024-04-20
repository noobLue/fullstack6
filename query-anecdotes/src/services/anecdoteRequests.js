import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () => {
    return axios.get(url).then(res => res.data)
}


export const createAnecdote = (newAnecdote) => {
  return axios.post(url, newAnecdote).then(res => res.data)
}


export const putAnecdote = (newAnecdote) => {
  return axios.put(`${url}/${newAnecdote.id}`, newAnecdote).then(res => res.data)
}