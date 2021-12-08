import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const mobxStore = new RootStore();

function getLibrary(provider: any) {
  const e = new Web3(provider);
  console.log(e);
  return e;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <storesContext.Provider value={mobxStore}>
        <Router
          navigator={mobxStore.routerStore.history}
          location={mobxStore.routerStore.history.location}
        >
          <App />
        </Router>
      </storesContext.Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
