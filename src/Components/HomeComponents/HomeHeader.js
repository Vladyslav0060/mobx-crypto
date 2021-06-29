import React from "react";
import "../../ComponentsCSS/Coin.css";

const HomeHeader = () => {
  return (
    <div className="coin-row">
      <div className="coin">
        <p className="name">Name</p>
        <p className="coin-price">Symbol</p>
      </div>
      <div className="coin-data">
        <p className="coin-price">Price</p>
        <p className="coin-volume">Volume</p>
        <p className="coin-percent ">24h</p>
        <p className="coin-marketcap">MarketCap</p>
      </div>
    </div>
  );
};

export default HomeHeader;
