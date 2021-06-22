import { BigNumber, ethers } from "ethers";
import { Web3Provider } from "../../react-app-env";
import Token from "../token";
import TokenBalance from "./tokenBalance";
import tokensList from "../../config/tokens.json";
import TokenContractsStorage from "./tokenContractsStorage";

export default class EthersWalletFacade {
    private ethereum : any;
    private connected = false;
    private accounts : string[] = [];
    private selectedAddress : string = "";
    private status : string = "Never connected";
    private web3Provider : Web3Provider;
    private contractStorage : TokenContractsStorage

    constructor(ethereum : any) {
        // TODO: check if the object is present
        this.ethereum = ethereum;
        this.web3Provider = new ethers.providers.Web3Provider(ethereum);
        this.contractStorage = new TokenContractsStorage(this.web3Provider.getSigner());
    }

    get isConnected() {
        return this.connected;
    }

    get getSelectedAddress() {
        return this.selectedAddress;
    }

    get ethereumObject() {
        return this.ethereum;
    }

    get getStatus() {
        return this.status;
    }

    // TODO: Handle each token individually
    public async getTokensBalance() : Promise<TokenBalance[]> {
        let tokenBalances = await Promise.all(tokensList.map(this.getBalanceForToken, this));

        return tokenBalances;
    }

    private async getBalanceForToken(token : Token) : Promise<TokenBalance> {
        return {
            token: token,
            balance: (await this.getTokenBalance(token)),
        }
    }

    public async getTokenBalance(token : Token) : Promise<BigNumber> {
        if(token.symbol === "ETH") {
            return this.getEthereumBalance();
        } else {
            return this.getCustomTokenBalance(token);
        }
    }

    private async getEthereumBalance() : Promise<BigNumber> {
        return this.web3Provider.getBalance(this.selectedAddress);
    }

    private async getCustomTokenBalance(token : Token) : Promise<BigNumber> {
        return this.contractStorage.getContractFor(token).balanceOf(this.selectedAddress);
    }

    public async connectToWallet() : Promise<void> {
        await this.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged.bind(this))
            .catch(this.handleConnectionError.bind(this));
    }
    
    // TODO: implement listening to account and net swaps
    private handleAccountsChanged(accounts : string[]) {
        this.connected = true;

        this.selectedAddress = this.ethereum.selectedAddress;
        this.accounts = accounts;
    }

    private handleConnectionError(error : any) {
        this.connected = false;
        
        if(error.code === 4001) {
            this.status = "User rejected connection";
        } else {
            this.status = "Unknown error:\n" + error;
        }
    }
}