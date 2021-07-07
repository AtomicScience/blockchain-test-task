import React from 'react';
import '../assets/App.css';
import '../assets/emoji.css'
import ConnectButton from './connectButton';
import InfoScreen from './infoScreen';
import EthersWalletFacade from '../api/balance/ethersWalletFacade';
import FatalError from "./fatalErrorScreen/fatalError"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    try {
      this.wallet = new EthersWalletFacade(props.ethereum);
    } catch(error) {
        this.error = error;
    }
  }

  render() {
    if(this.error) {
      return <FatalError error={this.error}/>
    }

    if(this.wallet.isConnected) {
      return (<InfoScreen wallet={this.wallet}/>)
    } else {
      return <ConnectButton handleClick={() => this.handleConnectButton()}/>
    }
  }

  handleConnectButton() {
    this.wallet.connectToWallet().then(() => this.forceUpdate());
  }

  getBalance(ethers) {
    console.log(ethers);
  }
}