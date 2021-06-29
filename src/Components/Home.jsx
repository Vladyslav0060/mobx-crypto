import StoreContext from '../store/StoreContext'
import React from 'react'
import {useState,useEffect} from 'react'
// import modulee from '../ComponentsCSS/Home.module.css'
import Coin from './HomeComponents/Coin'
import HomeHeader from './HomeComponents/HomeHeader'
import '../ComponentsCSS/Home.css';
import {useObserver} from 'mobx-react'
const axios = require('axios')

function Home() {
  let firstName='bitcoin',secondName='ethereum'
  let firstPrice=0, secondPrice=0
    const store = React.useContext(StoreContext)
    const [search,setSearch] = useState('')
    useEffect(async () => {
        const result = await axios(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
        );
        console.log('result', result.data)
        result.data.map(item=>{
          if(item.id===firstName)firstPrice=item.current_price
          else if(item.id===secondName) secondPrice=item.current_price
        })
        if(firstPrice!=0&&secondPrice!=0)console.log('Result of converting: ',firstPrice/secondPrice)
        store.addcryptoData(result.data)
        let data =  store.cryptoData;
    }, []);
    const handleChange = e =>{
      setSearch(e.target.value)
    }

    return useObserver(()=>{
      const filteredCoins = store.cryptoData.filter(coin=> coin.name.toLowerCase().includes(search.toLowerCase())) 
      return (
      <div className='coin-app'>
      <div className='coin-search'>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      <HomeHeader/>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
    )}
    );
  }

  export default Home