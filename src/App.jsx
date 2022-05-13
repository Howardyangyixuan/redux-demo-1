import React, {useContext} from "react"
import {appContext, connect, store} from "./redux"

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <Child1/>
      <Child2/>
      <Child3/>
    </appContext.Provider>
  )
}
const Child1 = () => <section>Child1<User/></section>
const Child2 = () => <section>Child2 <UserModifier>Other Props</UserModifier></section>
const Child3 = () => <section>Child3</section>

const User = connect(() => {
  const {state} = useContext(appContext)
  return <div>User:{state.user.name}</div>
})
const UserModifier = connect((props) => {
  const {dispatch, appState, children} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
    {children}
  </div>
})
