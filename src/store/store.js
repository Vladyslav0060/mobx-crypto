import React from "react";
import { useLocalStore, useObserver } from "mobx-react";
import StoreContext from "./StoreContext";
const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    data: ["first", "second", "third"],
    addData: (el) => {
      store.data.push(el);
    },
    cryptoData: [],
    addcryptoData: (cryptoArr) => {
      store.cryptoData = Object.assign([], cryptoArr);
    },
    getData: () => {
      return store.cryptoData;
    },
    token: "",
    addToken: (token) => {
      store.token = token;
    },
    isLoggedIn: false,
    authentication: {
      onAuthentication: () => {
        store.isLoggedIn = true;
        console.log("onAuthentication worked", store.isLoggedIn);
      },
      getLogInStatus: () => {
        console.log("isLoggedIn: ", store.isLoggedIn);
        return store.isLoggedIn;
      },
    },
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
