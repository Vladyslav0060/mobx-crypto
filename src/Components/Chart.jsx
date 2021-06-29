import StoreContext from '../store/StoreContext'
import React, { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import { useObserver } from 'mobx-react-lite';
const axios = require('axios')

const Chart = (props) => {
    const store = React.useContext(StoreContext)
    const [chartData,setChartData] = useState({})
    // let [currency,setCurrency] = useState('btc')
    let currency = 'btc'
    // const [points, setPoints] = useState([])
    let points = []
    let dates = []
    const handler = async (e) => {
        console.log('ee',e.target.value)
        // setCurrency(e.target.value)
        store.cryptoData.map(item=>{
            if(item.symbol===e.target.value){
                currency = e.target.value
            }
        })
        console.log('currency',currency)
        console.log('entered handler')
        let result = await axios.get(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${currency}&market=USD&interval=60min&apikey=AY2DD1FQYOZTTLQ5`)
        points = []
        dates = []
        console.log('re-result',result.data)
        var map1 = await new Map(Object.entries(result.data['Time Series Crypto (60min)']));
        for (let entry of map1) {
            // console.log(entry['0']);
            // setPoints(points=>[...points, entry['1']['4. close']])
            points.push(entry['1']['4. close'])
            dates.push(entry['0'])
          }
          console.log('handler points', points)
          await chartBuilder()
    }
    const chartBuilder = () => {
        console.log('entered ChartBuilder with data', points.reverse())
        setChartData({
            // labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            labels:dates.reverse(),
            datasets: [
                {
                    fill: "start",
                    label: `${currency} price`,
                    // data: [32,34,213,123,3,22,122],
                    data: points.reverse(),
                    backgroundColor: [
                        'rgba(90, 213, 124,0.7)'
                    ],
                    pointBackgroundColor: "#55bae7",
                    borderColor: "rgba(110, 178, 155, 0.6)",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                    borderWidth: 2 
                }
            ],
        })
    }
    useEffect(async ()=>{
        console.log('worked')
        let test = ''
        if(store.cryptoData.length==0){ test = await axios(
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        );
        console.log('test', test.data.map(item=>item.symbol))
        store.addcryptoData(test.data)  
        }
        let result = await axios.get(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${currency}&market=USD&interval=60min&apikey=AY2DD1FQYOZTTLQ5`)
        console.log('entered UseEffect')
        console.log(result.data)
        var map1 = new Map(Object.entries(result.data['Time Series Crypto (60min)']));
        for (let entry of map1) {
            // console.log(entry['0']);
            // setPoints(points=>[...points, entry['1']['4. close']])
            points.push(entry['1']['4. close'])
            dates.push(entry['0'])
          }
          console.log(currency)
        chartBuilder()
    },[])
    return useObserver( () => (
        <div 
        // style={{height:'500px',width:'500px'}}
        >
            {/* <canvas id="myChart"></canvas> */}
            <select value={currency} onChange={handler}>
            {store.cryptoData.map(option=>(<option key={option.symbol} value={option.symbol}>{option.symbol}</option>))}
        </select>
            <div style={{padding:'100px',paddingBottom:'40px'}}>

            <Line  data={chartData} options={{
                responsive: true,
                title: {text: 'Changes for 5 days', display:true},
                scales:{
                    yAxes:[{
                        ticks:{
                            autoSkip:true,
                            maxTicksLimit:10,
                            beginAtZero:true
                        }
                    }]
                }
            }}/>
            </div>
        </div>
    )
    )
}

export default Chart