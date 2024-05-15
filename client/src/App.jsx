import { React, useState } from 'react'
import { Tracker, LogIn } from './components'

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [getAccountId, setAccountId] = useState('')


  return (
    <div>
        <div className='app_wrapper'>
            <h1>Payment Tracker</h1>
            {isLoggedIn ? 
            <Tracker
              getAccountId = {getAccountId}
              setAccountId = {setAccountId}
            /> : 
            <LogIn
            isLoggedIn = {isLoggedIn}
            setLoggedIn = {setLoggedIn}
            getAccountId = {getAccountId}
            setAccountId = {setAccountId}
            />}
        </div>
    </div>
  )
}

export default App