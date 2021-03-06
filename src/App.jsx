import React from "react"
import {connect, createStore, Provider,} from "./redux"

const initState = {user: {name: "howard", age: 23}, group: {name: "FE"}}
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
  } else if (type === "updateGroup") {
    return {
      ...state,
      group: {
        ...state.group,
        ...payload
      }
    }
  } else {
    return state
  }
}
const store = createStore(reducer, initState)
export const App = () => {
  return (
    <Provider store={store}>
      <Child1/>
      <Child2/>
      <Child3/>
    </Provider>
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
