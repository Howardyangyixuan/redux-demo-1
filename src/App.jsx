import React, {useState, useContext} from "react"

const appContext = React.createContext(null)
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
    appState.user.name = e.target.value
    setAppState({...appState})
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
}
