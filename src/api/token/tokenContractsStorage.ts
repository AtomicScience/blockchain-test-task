import { Contract, Signer } from "../../react-app-env";
import ERC20ContractBuilder from "../balance/erc20ContractBuilder";
import Token from "./token";

export default class TokenContractsStorage {
    private contracts : {[tokenSymbol: string] : Contract};
    private signer : Signer;

    constructor(signer : Signer) {
        this.contracts = {};
        this.signer = signer;
    }

    public getContractFor(token : Token) {
        if(token.contractAddress === "") throw new Error("Contract address not defined for currency " + token.symbol);

        if(token.symbol in this.contracts) return this.contracts[token.symbol];
        let contract = ERC20ContractBuilder(token.contractAddress, this.signer);
        this.contracts[token.symbol] = contract;

        return contract;
    }
}