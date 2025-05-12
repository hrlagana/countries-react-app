import Countries from './customComponents/Countries'

import './App.css'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster 
        toastOptions={{
          style: {
            color: 'red'
          },
        }}
      />
      <Countries />
    </>
  )
}

export default App
