import React, { useState, useContext } from "react"

const A4HiredContext = React.createContext()

export function useA4Hired() {
  return useContext(A4HiredContext)
}

export function A4HProvider({ children }) {
  const { user } = children.props.children.props.children.props.children.props
  // isActive == false, si no quiere ser contratado
  const [isActive, setActive] = useState(user.av4hire)

  return (
    <A4HiredContext.Provider value={[isActive, setActive]}>
      {children}
    </A4HiredContext.Provider>
  )
}
