import StoreContext from '../store/StoreContext'
import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite';



const Logout = () => {
    const store = React.useContext(StoreContext)
    let handleEvent = () => {
        store.token = ''
        store.isLoggedIn = false
    }
    return useObserver( ()=>(
            <div>
            <button onClick={handleEvent}>Logout</button>
            </div>
        )
    )
}

export default Logout
