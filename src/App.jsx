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
const Group = connect(state => {
  return {group: state.group}
})((props) => {
  console.log("Group")
  const {group, dispatch} = props
  const onChange = (e) => {
    dispatch({type: "updateGroup", payload: {name: e.target.value}})
  }
  return (<div>
    Group:{group.name}
    <input value={group.name}
           onChange={onChange}/>
  </div>)
})
const userDispatchers = (dispatch) => {
  return {
    updateUser: (payload) => dispatch({type: "updateUser", payload: payload})
  }
}
const User = connect()((props) => {
  console.log("User")
  const {state} = props
  return <div>User:{state.user.name}</div>
})
const UserModifier = connect(state => {
  return {user: state.user}
}, userDispatchers)((props) => {
  console.log("UserModifier")
  const {updateUser, user, children} = props
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return <div>
    <input value={user.name}
           onChange={onChange}/>
    {children}
  </div>
})
