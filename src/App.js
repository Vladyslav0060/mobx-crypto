import Navbar from "./Components/Navbar";
import StoreProvider from "./store/store";
import React from "react";

const App = () => {
  return (
    <StoreProvider>
      <Navbar />
    </StoreProvider>
  );
};

export default App;
