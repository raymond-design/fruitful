import { createContext } from "react";

import { User } from '../types';

interface State{
  auth: boolean
  user: User | undefined
}

interface Action{
  type: String
  payload: any
}
const StateContext = createContext<State>({
  auth: false,
  user: null
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
    default:
      throw new Error(`Action unknown ${type}`)
  }
}