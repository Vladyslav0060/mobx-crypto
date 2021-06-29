import StoreContext from "../store/StoreContext";
import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import modulee from "../ComponentsCSS/Exchange.module.css";
const axios = require("axios");

const Exchange = () => {
  const store = React.useContext(StoreContext);
  let handler = (e) => {
    store.cryptoData.map((item) => {
      if (item.id === e.target.value) {
        setFromPrice(item.current_price);
        setFromName(e.target.value);
      }
    });
  };
  let handler2 = (e) => {
    store.cryptoData.map((item) => {
      if (item.id === e.target.value) {
        setToPrice(item.current_price);
        setToName(e.target.value);
      }
    });
  };
  let amountHandler = (e) => {
    setAmount(e.target.value);
  };

  useEffect(async () => {
    let result = "";
    if (store.cryptoData.length == 0) {
      result = await axios(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      console.log("result", result.data);
      store.addcryptoData(result.data);
    }
    setFromName(store.cryptoData[0].id);
    setToName(store.cryptoData[1].id);
    setToPrice(store.cryptoData[1].current_price);
    setFromPrice(store.cryptoData[0].current_price);
  }, []);
  let [fromName, setFromName] = useState();
  let [toName, setToName] = useState();
  let [toPrice, setToPrice] = useState();
  let [fromPrice, setFromPrice] = useState();
  // let [fromName,setFromName] = useState(store.cryptoData[0].id)
  // let [toName, setToName] = useState(store.cryptoData[1].id)
  // let [toPrice,setToPrice] = useState(store.cryptoData[1].current_price)
  // let [fromPrice,setFromPrice] = useState(store.cryptoData[0].current_price)
  let [amount, setAmount] = useState(1);
  return useObserver(() => (
    <div>
      <div className={modulee.container}>
        <input className={modulee.inputNumber} type="number" value={amount} onChange={amountHandler} placeholder="Amount"/>
        <select value={fromName} onChange={handler}>
          {store.cryptoData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
        </select>
        <select value={toName} onChange={handler2}>
          {store.cryptoData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
        </select>
        <p>1 {fromName} = {fromPrice} usd</p>
        <p>1 {toName} = {toPrice} usd</p>
        <p>{(amount * fromPrice) / toPrice}</p>
      </div>
    </div>
  ));
};

export default Exchange;
