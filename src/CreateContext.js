import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'message':
      return action.message;
    case 'remove':
      return '';
    default:
      return state;
  }
}

const AnecdotesContext = createContext()

export const AnecdotesContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')

  return (
    <AnecdotesContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </AnecdotesContext.Provider>
  )
}

export const useAnecdotesMessage = () => {
  const anecdotesMessageAndDispatch = useContext(AnecdotesContext)
  return anecdotesMessageAndDispatch[0]
}

export const useAnecdotesDispatch = () => {
  const anecdotesMessageAndDispatch = useContext(AnecdotesContext)
  return anecdotesMessageAndDispatch[1]
}

export default AnecdotesContext