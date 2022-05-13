import React from "react"
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
const Child1 = () => {
  console.log("Child1")
  return (<section>Child1<User/></section>)
}
const Child2 = () => {
  console.log("Child2")
  return <section>Child2 <UserModifier>Other Props</UserModifier></section>
}
const Child3 = () => {
  console.log("Child3")
  return <section>Child3 <Group/></section>
}
const Group = connect((props) => {
  console.log("Group")
  const {state} = props
  return (<div>Group:{state.group.name}</div>)
})
const User = connect((props) => {
  console.log("User")
  const {state} = props
  return <div>User:{state.user.name}</div>
})
const UserModifier = connect((props) => {
  console.log("UserModifier")
  const {dispatch, state, children} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div>
    <input value={state.user.name}
           onChange={onChange}/>
    {children}
  </div>
})
