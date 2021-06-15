/**
 * @deprecated
 */
export default class ProviderWalletFacade {
    private ethereum : any;
    private connected = false;
    private accounts : string[] = [];
    private status : string = "Never connected";

    constructor(ethereum : any) {
        // TODO: check if the object is present
        this.ethereum = ethereum;
    }

    get isConnected() {
        return this.connected;
    }

    get ethereumObject() {
        return this.ethereum;
    }

    get getStatus() {
        return this.status;
    }

    public async connectToWallet() : Promise<void> {
        await this.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged.bind(this))
            .catch(this.handleConnectionError.bind(this))
    }
    
    private handleAccountsChanged(accounts : string[]) {
        this.connected = true;
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