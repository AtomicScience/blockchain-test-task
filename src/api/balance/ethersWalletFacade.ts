import { BigNumber, ethers } from "ethers";
import { Web3Provider } from "../../react-app-env";
import Token from "../token";
import TokenBalance from "./tokenBalance";
import tokens from "../tokensListManager"
import TokenContractsStorage from "../contracts/tokenContractsStorage";
import TokenError from "../tokenError";

export default class EthersWalletFacade {
    private ethereum : any;
    private connected = false;
    private accounts : string[] = [];
    private selectedAddress : string = "";
    private status : string = "Never connected";
    private web3Provider : Web3Provider;
    private contractStorage : TokenContractsStorage

    constructor(ethereum : any) {
        if(ethereum === undefined) throw new Error("Metamask is not present on client")

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

    public getTokensBalance() : Promise<TokenBalance>[] {
        let tokenBalances = tokens.map(this.getBalanceForToken, this);

        return tokenBalances;
    }

    private async getBalanceForToken(token : Token) : Promise<TokenBalance> {
        let tokenBalance;
        try {
            tokenBalance = await this.getTokenBalance(token);
        } catch(error) {
            if(error instanceof TokenError) {
                throw error;    
            } else {
                // If the 'plain' error was caught, we should wrap it into token error
                throw new TokenError(String(error), token);
            }
        }

        return {
            token: token,
            balance: tokenBalance,
        }
    }

    public async getTokenBalance(token : Token) : Promise<BigNumber> {
        if(token.symbol === "ETH") {
            return this.getEthereumBalance();
        } else {
            return this.getERC20TokenBalance(token);
        }
    }

    private async getEthereumBalance() : Promise<BigNumber> {
        return this.web3Provider.getBalance(this.selectedAddress);
    }

    private async getERC20TokenBalance(token : Token) : Promise<BigNumber> {
        let contract = await this.contractStorage.getContractFor(token);

        return contract.balanceOf(this.selectedAddress);
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