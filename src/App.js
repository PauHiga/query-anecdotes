import { useQuery, useQueryClient, useMutation } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, changeAnecdote } from './requests'
import { useAnecdotesDispatch } from './CreateContext'

const App = () => {
  const messageDispatch = useAnecdotesDispatch()

  const queryClient = useQueryClient()

  const changedAnecdoteMutation = useMutation(changeAnecdote, {
    onSuccess: (changedAnecdote)=> {
      const allAnecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', allAnecdotes.map(item=> item.id === changedAnecdote.id ? changedAnecdote : item))
      messageDispatch({type: 'message', message:`You voted "${changedAnecdote.content}"`})
      setTimeout(()=>{messageDispatch({type: 'remove'})}, 5000)
    }
  })

  const result = useQuery(
    'anecdotes',
    getAnecdotes, 
    { retry: 1 }
  )

  console.log(result);

  if(result.isLoading){
    return <div>loading . . .</div>
  }

  if(result.isError){
    return <div>Error: {result.error.message}</div>
  }

  const handleVote = (anecdote) => {
    changedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
