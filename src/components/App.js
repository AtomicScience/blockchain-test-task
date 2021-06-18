import React from 'react';
import '../assets/App.css';
import ConnectButton from './connectButton';
import InfoScreen from './infoScreen';
import EthersWalletFacade from '../api/balance/ethersWalletFacade';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.wallet = new EthersWalletFacade(props.ethereum);
  }

  render() {
    if(this.wallet.isConnected) {
      return (<InfoScreen wallet={this.wallet}></InfoScreen>)
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