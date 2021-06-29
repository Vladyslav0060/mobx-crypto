import React from 'react'
import StoreContext from '../store/StoreContext'
import {Route,Redirect} from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'


const GuardRoute = (props) => {
    const store = React.useContext(StoreContext)
    return useObserver(()=>(
        <Route path={props.path} render={
            data=>store.authentication.getLogInStatus()?(
            <props.component {...data}></props.component>) : 
            (<Redirect to={{pathname:'/login'}}></Redirect>)}>
                {/* {alert('You need to log in')} */}
                </Route>
    ))
}

export default GuardRoute
