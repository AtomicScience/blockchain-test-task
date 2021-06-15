import { BigNumber, ethers } from "ethers";
import Token from "./token";
import TokenBalance from "./tokenBalance";
import TokenList from "./tokensList";

export default class EthersWalletFacade {
    private ethereum : any;
    private connected = false;
    private accounts : string[] = [];
    private selectedAddress : string = "";
    private status : string = "Never connected";
    private web3Provider : Web3Provider;
    private tokensList : Token[]

    constructor(ethereum : any) {
        // TODO: check if the object is present
        this.ethereum = ethereum;
        this.web3Provider = new ethers.providers.Web3Provider(ethereum);
        this.tokensList = TokenList;
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

    get getTokensList() {
        return this.tokensList.slice();
    }

    get getStatus() {
        return this.status;
    }

    public async getTokensBalance() : Promise<TokenBalance[]> {
        let tokenBalances = await Promise.all(this.tokensList.map(this.getBalanceForToken, this));

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
        if(token.contract === undefined) throw "Error accessing contract for token " + token.name;

        return token.contract.balanceOf(this.selectedAddress);
    }

    public async connectToWallet() : Promise<void> {
        await this.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged.bind(this))
            .catch(this.handleConnectionError.bind(this));
    }
    
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