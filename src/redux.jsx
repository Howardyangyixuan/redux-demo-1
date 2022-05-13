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

function hasChanged(data, newData) {
  let flag = false
  for (let key in data) {
    if (data[key] !== newData[key]) {
      flag = true
      break
    }
  }
  return flag
}

//所有用到store数据的组件都应该用connect包裹
//通过柯里化增加selector细化组件依赖的数据
export const connect = (MapStateToProps, MapDispatchToProps) => (Component) => {
  //返回一个对Component进行了包装的新函数组件
  return (props) => {
    //使用一个setState，在dispatch变更数据时，进行渲染
    const [, update] = useState({})
    const {state, setState} = useContext(appContext)
    //每个依赖state的组件订阅数据变动
    //每次产生新数据时（包括第一次生成），connect都会记下数据，监听器发布时，数据已经变化，对比store的数据和记录的数据即可，然后connect会重新执行，记下新的数据。
    const data = MapStateToProps ? MapStateToProps(state) : {state}
    useEffect(() => {
      //subscribe的返回值是取消该订阅的函数，在下次调用useEffect时执行
      return store.subscribe(() => {
        //更新订阅中调用的函数，如果依赖的数据变化了，再更新。
        const newData = MapStateToProps ? MapStateToProps(store.state) : {state:store.state}
        if (hasChanged(data, newData)) {
          update({})
        }
      })
    }, [MapStateToProps])
    const dispatch = (action) => {
      setState(reducer(state, action))
      update({})
    }
    const dispatchers = MapDispatchToProps ? MapDispatchToProps(dispatch) : {dispatch}
    return <Component {...props} {...dispatchers} {...data}/>
  }
}
