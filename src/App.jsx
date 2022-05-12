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
const Child2 = () => <section>Child2<UserModifier/></section>
const Child3 = () => <section>Child3</section>
const User = () => {
  const {appState} = useContext(appContext)
  return <div>User:{appState.user.name}</div>

}
const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    setAppState(reducer(appState, {type: "updateUser", payload: {name: e.target.value}}))
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
}
