import { React, useState } from 'react'
import { Tracker, LogIn } from './components'

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [getAccountId, setAccountId] = useState('')

  const handleLogOut = () => {
    setAccountId('')
    setLoggedIn(false)
}

  return (
    <div>
        <div className='app_wrapper'>
            <h1 className='appHeader'>Payment Tracker
              {isLoggedIn && 
                <div className='logOutButton' onClick={handleLogOut}>
                  Log Out
                </div> 
              }
            </h1>
            {isLoggedIn ? 
            <Tracker
              getAccountId = {getAccountId}
              setAccountId = {setAccountId}
              setLoggedIn = {setLoggedIn}
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