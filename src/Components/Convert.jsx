import React from 'react'
import StoreContext from '../store/StoreContext'
import modulee from '../ComponentsCSS/Home.module.css'
const axios = require('axios')

const Convert = () => {
    const store = React.useContext(StoreContext)
    return (
        <div>
    <h1>I*m converter</h1>
            <ul>
              {store.cryptoData.map(item=>(<li key={item.id}>{item.id} price: {item.current_price}<img class={modulee.img} src={item.image}/></li>))}
            </ul>
        </div>
    )
}

export default Convert
