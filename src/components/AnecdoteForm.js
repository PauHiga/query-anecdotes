import { addAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useAnecdotesDispatch } from '../CreateContext'

const AnecdoteForm = () => {
  const messageDispatch = useAnecdotesDispatch()

  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation(addAnecdote, {onSuccess: (newAnecdote)=> {
      const allAnecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', allAnecdotes.concat(newAnecdote))
      messageDispatch({type:'message', message:`"${newAnecdote.content}" was added to the list`})
      setTimeout(()=>{messageDispatch({type:'remove'})}, 5000)
    }, 
    onError: () => {
      messageDispatch({type:'message', message:`This anecdote is too short! Must have at least 5 characters long`})
      setTimeout(()=>{messageDispatch({type:'remove'})}, 5000)
    }
  })  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate( {content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
