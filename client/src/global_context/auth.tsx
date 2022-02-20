import { createContext, useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import { User } from '../types';

interface State{
  auth: boolean
  user: User | undefined
  loading: boolean
}

interface Action{
  type: String
  payload: any
}
const StateContext = createContext<State>({
  auth: false,
  user: null,
  loading: true
})

const DispatchContext = createContext(null) 

const reducer = (state: State, {type, payload}: Action) => {
  switch(type){
    case 'LOGIN':
      return {
        ...state,
        auth: true,
        user: payload
      }
    case 'LOGOUT':
      return {
        ...state,
        auth: false,
        user: null
      }
    case 'STOP_LOAD':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error(`Action unknown ${type}`)
  }
}

export const AuthProvide = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    auth: false,
    loading: true
  })

  const dispatch = (type: string, payload?: any) => defaultDispatch({type, payload});

  useEffect(() => {
    async function load(){
      try {
        const res = await Axios.get('/auth/me')
        dispatch('LOGIN', res.data)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch('STOP_LOAD')
      }
    }
    load();
  }, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);