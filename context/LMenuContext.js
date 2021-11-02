import React, { useState, useContext } from "react"

const LMenuContext = React.createContext()

export function useLMenu() {
  return useContext(LMenuContext)
}

export function LMenuProvider({ children }) {
  // isActive == i, si el menu esta en el tab i
  const [isActive, setActive] = useState(1)

  return (
    <LMenuContext.Provider value={[isActive, setActive]}>
      {children}
    </LMenuContext.Provider>
  )
}
