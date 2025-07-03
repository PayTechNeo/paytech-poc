// Global type declarations for the transition period
declare module '*.jsx' {
  import { ReactElement } from 'react'
  const content: ReactElement
  export default content
}

declare module '*.js' {
  const content: unknown
  export default content
}

// Redux store types
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: unknown
  }
}

export {} 