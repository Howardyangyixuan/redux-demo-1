import React, {useState, useContext} from "react"

const appContext = React.createContext(null)
const reducer = (state, action) => {
  const {type, payload} = action
  if (type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: "howard", age: 23}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <Child1/>
      <Child2/>
      <Child3/>
    </appContext.Provider>
  )
}
const Child1 = () => <section>Child1<User/></section>
const Child2 = () => <section>Child2<Wrapper/></section>
const Child3 = () => <section>Child3</section>
const User = () => {
  const {appState} = useContext(appContext)
  return <div>User:{appState.user.name}</div>

}
const Wrapper = () => {
  const {appState, setAppState} = useContext(appContext)
  const dispatch = (action) => {
    setAppState(reducer(appState, action))
  }
  return <UserModifier dispatch={dispatch} appState={appState}/>
}
const UserModifier = (props) => {
  const {dispatch, appState} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
}
