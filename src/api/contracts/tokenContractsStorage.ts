import { Contract, Signer } from "../../react-app-env";
import ERC20ContractBuilder from "../contracts/erc20ContractBuilder";
import Token from "../token";
import TokenNotDeployedError from "./tokenNotDeployedError";

export default class TokenContractsStorage {
    private contracts : {[tokenSymbol: string] : Contract};
    private signer : Signer;

    constructor(signer : Signer) {
        this.contracts = {};
        this.signer = signer;
    }

    public async getContractFor(token : Token) : Promise<Contract> {
        if(token.contractAddress === "") throw new Error("Contract address not defined for currency " + token.symbol);

        if(token.symbol in this.contracts) return this.contracts[token.symbol];

        let contract = ERC20ContractBuilder(token.contractAddress, this.signer);

        if(!(await this.isContractDeployed(contract)))
            throw new TokenNotDeployedError(token);

        this.contracts[token.symbol] = contract;

        return contract;
    }

    private async isContractDeployed(contract : Contract) : Promise<boolean> {
        let code = await contract.provider.getCode(contract.address);

        return code !== "0x";
    }
}