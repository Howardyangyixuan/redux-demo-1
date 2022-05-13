import React, {useState, useContext} from "react"

const appContext = React.createContext(null)
const store = {
  state: {
    user: {name: "howard", age: 23}
  },
  setState(newValue) {
    store.state = newValue
  }
}
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
  return (
    <appContext.Provider value={store}>
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
  const {state} = useContext(appContext)
  return <div>User:{state.user.name}</div>

}

const connect = (Component) => {
  //返回一个对Component进行了包装的新函数组件
  return () => {
    //使用一个setState，在dispatch变更数据时，进行渲染
    const [_, update] = useState({})
    const {state, setState} = useContext(appContext)
    const dispatch = (action) => {
      setState(reducer(state, action))
      update({})
    }
    return <Component dispatch={dispatch} appState={state}/>
  }
}
const UserModifier = connect((props) => {
  const {dispatch, appState} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
})
