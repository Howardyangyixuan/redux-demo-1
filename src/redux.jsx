import React, {useContext, useEffect, useState} from "react"

export const appContext = React.createContext(null)
export const store = {
  state: {
    user: {name: "howard", age: 23},
    group: {name: "FE"}
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
//所有用到store数据的组件都应该用connect包裹
export const connect = (Component) => {
  //返回一个对Component进行了包装的新函数组件
  return (props) => {
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
    return <Component {...props} dispatch={dispatch} state={state}/>
  }
}
