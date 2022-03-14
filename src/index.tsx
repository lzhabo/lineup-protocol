import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import { loadState, saveState } from "@src/utils/localStorage";
import { autorun } from "mobx";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const initState = loadState();

const mobxStore = new RootStore(initState);

autorun(
  () => {
    console.dir(mobxStore);
    saveState(mobxStore.serialize());
  },
  { delay: 1000 }
);

function getLibrary(provider: any) {
  const e = new Web3(provider);
  console.log(e);
  return e;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <storesContext.Provider value={mobxStore}>
        <Router>
          <App />
        </Router>
      </storesContext.Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
