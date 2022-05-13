import React, {useState, useContext, useEffect} from "react"

const appContext = React.createContext(null)
const store = {
  state: {
    user: {name: "howard", age: 23}
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const idx = store.listeners.indexOf(fn)
      this.listeners.splice(idx, 1)
    }
  },
  update() {
    store.listeners.map(fn => fn({}))
  },
  setState(newValue) {
    store.state = newValue
    store.update()
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

//所有用到store数据的组件都应该用connect包裹
const connect = (Component) => {
  //返回一个对Component进行了包装的新函数组件
  return () => {
    //使用一个setState，在dispatch变更数据时，进行渲染
    const [, update] = useState({})
    const {state, setState} = useContext(appContext)
    //每个依赖state的组件订阅数据变动
    useEffect(() => {
      store.subscribe(update)
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
      update({})
    }
    return <Component dispatch={dispatch} appState={state}/>
  }
}
const User = connect(() => {
  const {state} = useContext(appContext)
  return <div>User:{state.user.name}</div>
})
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
